import { getCookie, isUndefined } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { parseCheckoutCompleteCookieData } from '../lib/parser/parseCheckoutOutCookieData';
import { constructQuery } from '../lib/querystring';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useOnce } from '../lib/useOnce';
import { usePageViewId } from '../lib/usePageViewId';
import { useSignInGateSelector } from '../lib/useSignInGateSelector';
import type { Switches } from '../types/config';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
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
	CheckoutCompleteCookieData,
	CurrentSignInGateABTest,
	SignInGateComponent,
} from './SignInGate/types';

type Props = {
	contentType: string;
	sectionId?: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview: boolean;
	host?: string;
	pageId: string;
	idUrl?: string;
	switches: Switches;
};

// interface for the component which shows the sign in gate
interface ShowSignInGateProps {
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>;
	abTest: CurrentSignInGateABTest;
	componentId: string;
	signInUrl: string;
	registerUrl: string;
	gateVariant: SignInGateComponent;
	host: string;
	checkoutCompleteCookieData?: CheckoutCompleteCookieData;
	personaliseSignInGateAfterCheckoutSwitch?: boolean;
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
const generateGatewayUrl = (
	tab: 'register' | 'signin',
	{
		pageId,
		pageViewId,
		idUrl,
		host,
		currentTest,
		componentId,
	}: {
		pageId: string;
		pageViewId: string;
		idUrl: string;
		host: string;
		currentTest: CurrentSignInGateABTest;
		componentId?: string;
	},
) => {
	// url of the article, return user here after sign in/registration
	const returnUrl = `${host}/${pageId}`;

	// set the component event params to be included in the query
	const queryParams: ComponentEventParams = {
		componentType: 'signingate',
		componentId,
		abTestName: currentTest.name,
		abTestVariant: currentTest.variant,
		browserId:
			getCookie({ name: 'bwid', shouldMemoize: true }) ?? undefined,
		viewId: pageViewId,
	};

	return `${idUrl}/${tab}?returnUrl=${returnUrl}&componentEventParams=${encodeURIComponent(
		constructQuery(queryParams),
	)}`;
};

// component which shows the sign in gate
// fires a VIEW ophan component event
// and show the gate component if it exists
const ShowSignInGate = ({
	abTest,
	componentId,
	setShowGate,
	signInUrl,
	registerUrl,
	gateVariant,
	host,
	checkoutCompleteCookieData,
	personaliseSignInGateAfterCheckoutSwitch,
}: ShowSignInGateProps) => {
	const { renderingTarget } = useConfig();

	// use effect hook to fire view event tracking only on initial render
	useEffect(() => {
		submitViewEventTracking(
			{
				component: withComponentId(componentId),
				abTest,
			},
			renderingTarget,
		);
	}, [abTest, componentId, renderingTarget]);

	// some sign in gate ab test variants may not need to show a gate
	// therefore the gate is optional
	// this is because we want a section of the audience to never see the gate
	// but still fire a view event if they are eligible to see the gate
	if (gateVariant.gate) {
		return gateVariant.gate({
			guUrl: host,
			signInUrl,
			registerUrl,
			dismissGate: () => {
				dismissGate(setShowGate, abTest);
			},
			abTest,
			ophanComponentId: componentId,
			checkoutCompleteCookieData,
			personaliseSignInGateAfterCheckoutSwitch,
		});
	}
	// return nothing if no gate needs to be shown
	return <></>;
};

const useCheckoutCompleteCookieData = () => {
	const [data, setData] = useState<CheckoutCompleteCookieData>();

	useEffect(() => {
		const rawCookie = getCookie({
			name: 'GU_CO_COMPLETE',
			shouldMemoize: true,
		});

		if (rawCookie === null) return;

		const parsedCookieData = parseCheckoutCompleteCookieData(rawCookie);

		if (parsedCookieData) setData(parsedCookieData);
	}, []);

	return data;
};

/**
 * Component with conditional logic which determines if a sign in gate
 * should be shown on the current page.
 *
 * ## Why does this need to be an Island?
 *
 * The sign-in gate logic is entirely client-side
 *
 * ---
 *
 * (No visual story exists)
 */
export const SignInGateSelector = ({
	contentType,
	sectionId = '',
	tags,
	isPaidContent,
	isPreview,
	host = 'https://theguardian.com/',
	pageId,
	idUrl = 'https://profile.theguardian.com',
	switches,
}: Props) => {
	const authStatus = useAuthStatus();
	const isSignedIn =
		authStatus.kind === 'SignedInWithOkta' ||
		authStatus.kind === 'SignedInWithCookies';
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

	const { renderingTarget } = useConfig();
	const gateSelector = useSignInGateSelector();
	const pageViewId = usePageViewId(renderingTarget);

	// START: Checkout Complete Personalisation
	const [personaliseSwitch, setPersonaliseSwitch] = useState(false);
	const checkoutCompleteCookieData = useCheckoutCompleteCookieData();

	const personaliseComponentId = (
		currentComponentId: string | undefined,
	): string | undefined => {
		if (!currentComponentId) return undefined;
		if (!checkoutCompleteCookieData) return currentComponentId;
		const { userType, product } = checkoutCompleteCookieData;
		return `${currentComponentId}_personalised_${userType}_${product}`;
	};
	const shouldPersonaliseComponentId = (): boolean => {
		return personaliseSwitch && !!checkoutCompleteCookieData;
	};
	const { personaliseSignInGateAfterCheckout } = switches;
	// END: Checkout Complete Personalisation

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
		if (personaliseSignInGateAfterCheckout) {
			setPersonaliseSwitch(personaliseSignInGateAfterCheckout);
		} else setPersonaliseSwitch(false);
	}, [personaliseSignInGateAfterCheckout]);

	useEffect(() => {
		if (gateVariant && currentTest) {
			const timeOfPageView = new Date();
			void gateVariant
				.canShow({
					isSignedIn: !!isSignedIn,
					currentTest,
					contentType,
					sectionId,
					tags,
					isPaidContent,
					isPreview,
					timeOfPageView,
				})
				.then(setCanShowGate);
		}
	}, [
		currentTest,
		gateVariant,
		isSignedIn,
		contentType,
		sectionId,
		tags,
		isPaidContent,
		isPreview,
	]);

	if (!currentTest || !gateVariant || isUndefined(pageViewId)) {
		return null;
	}
	const signInGateComponentId = signInGateTestIdToComponentId[currentTest.id];

	const componentId = shouldPersonaliseComponentId()
		? personaliseComponentId(signInGateComponentId)
		: signInGateComponentId;

	const ctaUrlParams = {
		pageId,
		host,
		pageViewId,
		idUrl,
		currentTest,
		componentId,
	} satisfies Parameters<typeof generateGatewayUrl>[1];

	return (
		<>
			{/* Sign In Gate Display Logic */}
			{!isGateDismissed && canShowGate && !!componentId && (
				<ShowSignInGate
					abTest={currentTest}
					componentId={componentId}
					// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- Odd react types, should review
					setShowGate={(show) => setIsGateDismissed(!show)}
					signInUrl={generateGatewayUrl('signin', ctaUrlParams)}
					registerUrl={generateGatewayUrl('register', ctaUrlParams)}
					gateVariant={gateVariant}
					host={host}
					checkoutCompleteCookieData={checkoutCompleteCookieData}
					personaliseSignInGateAfterCheckoutSwitch={personaliseSwitch}
				/>
			)}
		</>
	);
};
