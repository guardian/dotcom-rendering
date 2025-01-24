import { getCookie, isUndefined } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { parseCheckoutCompleteCookieData } from '../lib/parser/parseCheckoutOutCookieData';
import { constructQuery } from '../lib/querystring';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
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
import { signInGateComponent as gateMainVariant } from './SignInGate/gates/main-variant';
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

type PropsAuxia = {
	host?: string;
	pageId: string;
	idUrl?: string;
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

/*
	comment group: auxia-prototype-e55a86ef
	Signature for the ShowSignInGateAuxia component.
*/
interface ShowSignInGateAuxiaProps {
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>;
	signInUrl: string;
	registerUrl: string;
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

/*
	comment group: auxia-prototype-e55a86ef
	Auxia version of the dismissGate function.
*/
const dismissGateAuxia = (
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	setShowGate(false);
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
	/*
		Date: January 2025
		comment group: auxia-prototype-e55a86ef
		Author: Pascal

		We are currently starting to evaluate a new approach for the decision to display the sign gate or not: an
		external API, that will be returning that decision. The company offering that API is called Auxia and
		can be found here: https://www.auxia.io

		At this aim I have move the existing legacy version of the SignInGateSelector to SignInGateSelectorDefault,
		and I am introducing SignInGateSelectorAuxia, which is the new component that will be using the Auxia API.

		This work, until further notice is the implementation and evaluation of a prototype.

		All comments related to this prototype comes under the same comment group: auxia-prototype-e55a86ef
		(follow it if one day you want to decommission the entire prototype).

		PRs for ab test definition:
		  - https://github.com/guardian/frontend/pull/27743
		  - https://github.com/guardian/frontend/pull/27744
		  - https://github.com/guardian/dotcom-rendering/pull/13197
	*/

	// TODO: replace this conditional by an AB test
	const useDefault = false;

	if (useDefault) {
		return SignInGateSelectorDefault({
			contentType,
			sectionId,
			tags,
			isPaidContent,
			isPreview,
			host,
			pageId,
			idUrl,
			switches,
		});
	} else {
		return SignInGateSelectorAuxia({
			host,
			pageId,
			idUrl,
		});
	}
};

const SignInGateSelectorDefault = ({
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

	const countryCode = useCountryCode('sign-in-gate-selector');

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
		} else {
			setPersonaliseSwitch(false);
		}
	}, [personaliseSignInGateAfterCheckout]);

	useEffect(() => {
		if (gateVariant && currentTest) {
			void gateVariant
				.canShow({
					isSignedIn: !!isSignedIn,
					currentTest,
					contentType,
					sectionId,
					tags,
					isPaidContent,
					isPreview,
					currentLocaleCode: countryCode,
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
		countryCode,
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

const fetchAuxiaDisplayDataFromProxy = async (): Promise<boolean> => {
	return Promise.resolve(true);
};

const SignInGateSelectorAuxia = ({
	host = 'https://theguardian.com/',
	pageId,
	idUrl = 'https://profile.theguardian.com',
}: PropsAuxia) => {
	/*
		comment group: auxia-prototype-e55a86ef
		This function if the Auxia prototype for the SignInGateSelector component.
	*/
	const [isGateDismissed, setIsGateDismissed] = useState<boolean | undefined>(
		undefined,
	);

	const [
		shouldShowSignInGateUsingAuxiaAnswer,
		setShouldShowSignInGateUsingAuxiaAnswer,
	] = useState<boolean>(false);

	const gateVariant = gateMainVariant;

	const currentTest = {
		name: 'SignInGateMain',
		variant: 'main-variant-5',
		id: 'SignInGateMainVariant',
	};

	const { renderingTarget } = useConfig();

	const pageViewId = usePageViewId(renderingTarget);

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
		void (async () => {
			const data = await fetchAuxiaDisplayDataFromProxy();
			setShouldShowSignInGateUsingAuxiaAnswer(data);
		})().catch((error) => {
			console.error('Error fetching Auxia display data:', error);
		});
	}, [shouldShowSignInGateUsingAuxiaAnswer]);

	if (isUndefined(pageViewId)) {
		return null;
	}

	const componentId = 'main_variant_5';

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
			{!isGateDismissed && shouldShowSignInGateUsingAuxiaAnswer && (
				<ShowSignInGateAuxia
					// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- Odd react types, should review
					setShowGate={(show) => setIsGateDismissed(!show)}
					signInUrl={generateGatewayUrl('signin', ctaUrlParams)}
					registerUrl={generateGatewayUrl('register', ctaUrlParams)}
					gateVariant={gateVariant}
					host={host}
				/>
			)}
		</>
	);
};

const ShowSignInGateAuxia = ({
	setShowGate,
	signInUrl,
	registerUrl,
	gateVariant,
	host,
}: ShowSignInGateAuxiaProps) => {
	/*
		comment group: auxia-prototype-e55a86ef
		This function if the Auxia prototype for the ShowSignInGate component.
	*/

	const componentId = 'main_variant_5';
	const abTest = undefined;
	const checkoutCompleteCookieData = undefined;
	const personaliseSignInGateAfterCheckoutSwitch = undefined;

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
				dismissGateAuxia(setShowGate);
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
