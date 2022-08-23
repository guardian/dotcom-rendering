import { ArticleDesign, getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { constructQuery } from '../../lib/querystring';
import { useOnce } from '../lib/useOnce';
import { useSignInGateSelector } from '../lib/useSignInGateSelector';
import type { ComponentEventParams } from './SignInGate/componentEventTracking';
import {
	submitViewEventTracking,
	withComponentId,
} from './SignInGate/componentEventTracking';
import {
	incrementUserDismissedGateCount,
	setUserDismissedGate,
} from './SignInGate/dismissGate';
import { signInGateTestIdToComponentId } from './SignInGate/signInGate';
import type {
	CurrentSignInGateABTest,
	SignInGateComponent,
} from './SignInGate/types';

type Props = {
	format: ArticleFormat;
	contentType: string;
	sectionName?: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview: boolean;
	host?: string;
	pageId: string;
	idUrl?: string;
};

// interface for the component which shows the sign in gate
interface ShowSignInGateProps {
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>;
	abTest: CurrentSignInGateABTest;
	format: ArticleFormat;
	signInUrl: string;
	gateVariant: SignInGateComponent;
	host: string;
}

const dismissGate = (
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>,
	currentAbTestValue: CurrentSignInGateABTest,
) => {
	setShowGate(false);
	setUserDismissedGate(currentAbTestValue.variant, currentAbTestValue.name);
	incrementUserDismissedGateCount(
		currentAbTestValue.variant,
		currentAbTestValue.name,
	);
};

// function to generate the profile.theguardian.com url with tracking params
// and the return url (link to current article page)
const generateSignInUrl = ({
	pageId,
	pageViewId,
	idUrl,
	host,
	currentTest,
}: {
	pageId: string;
	pageViewId: string;
	idUrl: string;
	host: string;
	currentTest: CurrentSignInGateABTest;
}) => {
	// url of the article, return user here after sign in/registration
	const returnUrl = `${host}/${pageId}`;

	// set the component event params to be included in the query
	const queryParams: ComponentEventParams = {
		componentType: 'signingate',
		componentId: signInGateTestIdToComponentId[currentTest.id],
		abTestName: currentTest.name,
		abTestVariant: currentTest.variant,
		browserId:
			getCookie({ name: 'bwid', shouldMemoize: true }) || undefined,
		visitId: getCookie({ name: 'vsid' }) || undefined,
		viewId: pageViewId,
	};

	return `${idUrl}/signin?returnUrl=${returnUrl}&componentEventParams=${encodeURIComponent(
		constructQuery(queryParams),
	)}`;
};

// component which shows the sign in gate
// fires a VIEW ophan component event
// and show the gate component if it exists
const ShowSignInGate = ({
	format,
	abTest,
	setShowGate,
	signInUrl,
	gateVariant,
	host,
}: ShowSignInGateProps) => {
	// use effect hook to fire view event tracking only on initial render
	useEffect(() => {
		submitViewEventTracking({
			component: withComponentId(
				signInGateTestIdToComponentId[abTest.id] ?? 'unknown',
			),
			abTest,
		});
	}, [abTest]);

	// some sign in gate ab test variants may not need to show a gate
	// therefore the gate is optional
	// this is because we want a section of the audience to never see the gate
	// but still fire a view event if they are eligible to see the gate
	if (gateVariant.gate) {
		return gateVariant.gate({
			guUrl: host,
			signInUrl,
			dismissGate: () => {
				dismissGate(setShowGate, abTest);
			},
			abTest,
			ophanComponentId:
				signInGateTestIdToComponentId[abTest.id] ?? 'unknown',
			isComment:
				format.design === ArticleDesign.Comment ||
				format.design === ArticleDesign.Editorial,
		});
	}
	// return nothing if no gate needs to be shown
	return <></>;
};

// component with conditional logic which determines if a sign in gate
// should be shown on the current page
export const SignInGateSelector = ({
	format,
	contentType,
	sectionName = '',
	tags,
	isPaidContent,
	isPreview,
	host = 'https://theguardian.com/',
	pageId,
	idUrl = 'https://profile.theguardian.com',
}: Props) => {
	const isSignedIn = !!getCookie({ name: 'GU_U', shouldMemoize: true });
	const [isGateDismissed, setIsGateDismissed] = useState<boolean | undefined>(
		undefined,
	);
	const [gateVariant, setGateVariant] = useState<
		SignInGateComponent | undefined
	>(undefined);
	const [currentTest, setCurrentTest] = useState<
		CurrentSignInGateABTest | undefined
	>(undefined);
	const [canShowGate, setCanShowGate] = useState(false);
	const gateSelector = useSignInGateSelector();

	const { pageViewId } = window.guardian.config.ophan;

	useOnce(() => {
		// this hook will fire when the sign in gate is dismissed
		// which will happen when the showGate state is set to false
		// this only happens within the dismissGate method
		if (isGateDismissed) {
			document.dispatchEvent(
				new CustomEvent('article:sign-in-gate-dismissed'),
			);
		}
	}, [isGateDismissed]);

	useOnce(() => {
		const [gateSelectorVariant, gateSelectorTest] = gateSelector as [
			SignInGateComponent | null,
			CurrentSignInGateABTest | null,
		];
		if (gateSelectorVariant && gateSelectorTest) {
			setGateVariant(gateSelectorVariant);
			setCurrentTest(gateSelectorTest);
		}
	}, [gateSelector]);

	useEffect(() => {
		if (gateVariant && currentTest) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			gateVariant
				.canShow({
					isSignedIn: !!isSignedIn,
					currentTest,
					contentType,
					sectionName,
					tags,
					isPaidContent,
					isPreview,
				})
				.then(setCanShowGate);
		}
	}, [
		currentTest,
		gateVariant,
		isSignedIn,
		contentType,
		sectionName,
		tags,
		isPaidContent,
		isPreview,
	]);

	if (!currentTest || !gateVariant) {
		return null;
	}

	const signInUrl = generateSignInUrl({
		pageId,
		host,
		pageViewId,
		idUrl,
		currentTest,
	});

	return (
		<>
			{/* Sign In Gate Display Logic */}
			{!isGateDismissed && canShowGate && (
				<ShowSignInGate
					format={format}
					abTest={currentTest}
					setShowGate={(show) => setIsGateDismissed(!show)}
					signInUrl={signInUrl}
					gateVariant={gateVariant}
					host={host}
				/>
			)}
		</>
	);
};
