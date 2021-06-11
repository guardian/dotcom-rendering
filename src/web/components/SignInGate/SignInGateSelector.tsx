import { useState, useEffect } from 'react';
import { constructQuery } from '@root/src/lib/querystring';

import {
	incrementUserDismissedGateCount,
	setUserDismissedGate,
} from '@frontend/web/components/SignInGate/dismissGate';
import { getCookie } from '@frontend/web/browser/cookie';
import { useSignInGateSelector } from '@frontend/web/lib/useSignInGateSelector';

import { useOnce } from '@frontend/web/lib/useOnce';
import {
	ComponentEventParams,
	submitViewEventTracking,
	withComponentId,
} from './componentEventTracking';
import { signInGateTestIdToComponentId } from './signInGate';
import {
	CurrentSignInGateABTest,
	SignInGateComponent,
	SignInGateSelectorProps,
} from './types';

// interface for the component which shows the sign in gate
interface ShowSignInGateProps {
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>;
	abTest: CurrentSignInGateABTest;
	CAPI: CAPIBrowserType;
	signInUrl: string;
	gateVariant: SignInGateComponent;
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
const generateSignInUrl = (
	CAPI: CAPIBrowserType,
	currentTest: CurrentSignInGateABTest,
) => {
	// url of the article, return user here after sign in/registration
	const returnUrl = `${CAPI.config.host}/${CAPI.pageId}`;

	// set the component event params to be included in the query
	const queryParams: ComponentEventParams = {
		componentType: 'signingate',
		componentId: signInGateTestIdToComponentId[currentTest.id],
		abTestName: currentTest.name,
		abTestVariant: currentTest.variant,
		viewId: window.guardian.ophan.viewId,
		browserId: getCookie('bwid') || undefined,
		visitId: getCookie('vsid') || undefined,
	};

	return `${
		CAPI.config.idUrl
	}/signin?returnUrl=${returnUrl}&componentEventParams=${encodeURIComponent(
		constructQuery(queryParams),
	)}`;
};

// component which shows the sign in gate
// fires a VIEW ophan component event
// and show the gate component if it exists
const ShowSignInGate = ({
	CAPI,
	abTest,
	setShowGate,
	signInUrl,
	gateVariant,
}: ShowSignInGateProps) => {
	// use effect hook to fire view event tracking only on initial render
	useEffect(() => {
		submitViewEventTracking({
			component: withComponentId(
				signInGateTestIdToComponentId[abTest.id],
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
			guUrl: CAPI.config.host || 'https://theguardian.com/',
			signInUrl,
			dismissGate: () => {
				dismissGate(setShowGate, abTest);
			},
			abTest,
			ophanComponentId: signInGateTestIdToComponentId[abTest.id],
			isComment:
				CAPI.format.design === 'CommentDesign' ||
				CAPI.format.design === 'EditorialDesign',
		});
	}
	// return nothing if no gate needs to be shown
	return <></>;
};

// component with conditional logic which determines if a sign in gate
// should be shown on the current page
export const SignInGateSelector = ({
	isSignedIn,
	CAPI,
}: SignInGateSelectorProps) => {
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

	useOnce(() => {
		// this hook will fire when the sign in gate is dismissed
		// which will happen when the showGate state is set to false
		// this only happens within the dismissGate method
		if (isGateDismissed) {
			document.dispatchEvent(
				new CustomEvent('dcr:page:article:redisplayed'),
			);
		}
	}, [isGateDismissed]);

	useOnce(() => {
		const [gateSelectorVariant, gateSelectorTest] = gateSelector;
		if (gateSelectorVariant && gateSelectorTest) {
			setGateVariant(gateSelectorVariant);
			setCurrentTest(gateSelectorTest);
		}
	}, [gateSelector]);

	useEffect(() => {
		if (gateVariant && currentTest) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			gateVariant
				?.canShow(CAPI, !!isSignedIn, currentTest)
				.then(setCanShowGate);
		}
	}, [currentTest, gateVariant, CAPI, isSignedIn]);

	if (!currentTest || !gateVariant) {
		return null;
	}

	const signInUrl = generateSignInUrl(CAPI, currentTest);

	return (
		<>
			{/* Sign In Gate Display Logic */}
			{!isGateDismissed && canShowGate && (
				<ShowSignInGate
					CAPI={CAPI}
					abTest={currentTest}
					setShowGate={(show) => setIsGateDismissed(!show)}
					signInUrl={signInUrl}
					gateVariant={gateVariant}
				/>
			)}
		</>
	);
};
