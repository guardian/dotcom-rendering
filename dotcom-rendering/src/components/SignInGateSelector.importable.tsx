import { getCookie, isUndefined } from '@guardian/libs';
import { useEffect, useState } from 'react';
import {
	hasCmpConsentForBrowserId,
	shouldHideSupportMessaging,
} from '../lib/contributions';
import { getDailyArticleCount, getToday } from '../lib/dailyArticleCount';
import type { EditionId } from '../lib/edition';
import { getLocaleCode } from '../lib/getCountryCode';
import { isUserLoggedIn } from '../lib/identity';
import { parseCheckoutCompleteCookieData } from '../lib/parser/parseCheckoutOutCookieData';
import { constructQuery } from '../lib/querystring';
import { useAB } from '../lib/useAB';
import { useAuthStatus } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { useOnce } from '../lib/useOnce';
import { usePageViewId } from '../lib/usePageViewId';
import { useSignInGateSelector } from '../lib/useSignInGateSelector';
import type { Switches } from '../types/config';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import type { ComponentEventParams } from './SignInGate/componentEventTracking';
import {
	submitComponentEventTracking,
	submitViewEventTracking,
	withComponentId,
} from './SignInGate/componentEventTracking';
import {
	incrementUserDismissedGateCount,
	retrieveDismissedCount,
	setUserDismissedGate,
} from './SignInGate/dismissGate';
import { pageIdIsAllowedForGating } from './SignInGate/displayRules';
import { SignInGateAuxia } from './SignInGate/gateDesigns/SignInGateAuxia';
import { signInGateTestIdToComponentId } from './SignInGate/signInGateMappings';
import type {
	AuxiaAPIResponseDataUserTreatment,
	AuxiaGateDisplayData,
	AuxiaGateReaderPersonalData,
	AuxiaInteractionActionName,
	AuxiaInteractionInteractionType,
	AuxiaProxyGetTreatmentsPayload,
	AuxiaProxyGetTreatmentsResponse,
	AuxiaProxyLogTreatmentInteractionPayload,
	CheckoutCompleteCookieData,
	CurrentSignInGateABTest,
	SignInGateComponent,
} from './SignInGate/types';

// ------------------------------------------------------------------------------------------
// Default (pre Auxia Integration Experiment) types, SignInGateSelector and ShowSignInGate //
// ------------------------------------------------------------------------------------------

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
	contributionsServiceUrl: string;
	editionId: EditionId;
};

type PropsDefault = {
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
}: PropsDefault) => {
	const authStatus = useAuthStatus();
	const isSignedIn = authStatus.kind === 'SignedIn';
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

// -------------------------------
// Auxia Integration Experiment //
// -------------------------------

export const SignInGateSelector = ({
	contentType,
	sectionId = '',
	tags,
	isPaidContent,
	isPreview,
	host = 'https://theguardian.com/',
	pageId, // pageId is the path without starting slash
	idUrl = 'https://profile.theguardian.com',
	switches,
	contributionsServiceUrl,
	editionId,
}: Props) => {
	const abTestAPI = useAB()?.api;
	const userIsInAuxiaExperiment = !!abTestAPI?.isUserInVariant(
		'AuxiaSignInGate',
		'auxia-signin-gate',
	);

	if (!pageIdIsAllowedForGating(pageId)) {
		return <></>;
	}

	if (!userIsInAuxiaExperiment) {
		return (
			<SignInGateSelectorDefault
				contentType={contentType}
				sectionId={sectionId}
				tags={tags}
				isPaidContent={isPaidContent}
				isPreview={isPreview}
				host={host}
				pageId={pageId}
				idUrl={idUrl}
				switches={switches}
			/>
		);
	} else {
		return (
			<SignInGateSelectorAuxia
				host={host}
				pageId={pageId}
				idUrl={idUrl}
				contributionsServiceUrl={contributionsServiceUrl}
				editionId={editionId}
				isPreview={isPreview}
				isPaidContent={isPaidContent}
				contentType={contentType}
				sectionId={sectionId}
				tags={tags}
			/>
		);
	}
};

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

type PropsAuxia = {
	host?: string;
	pageId: string;
	idUrl: string;
	contributionsServiceUrl: string;
	editionId: EditionId;
	isPreview: boolean;
	isPaidContent: boolean;
	contentType: string;
	sectionId: string;
	tags: TagType[];
};

interface ShowSignInGateAuxiaProps {
	host: string;
	signInUrl: string;
	setShowGate: React.Dispatch<React.SetStateAction<boolean>>;
	abTest: CurrentSignInGateABTest;
	userTreatment: AuxiaAPIResponseDataUserTreatment;
	contributionsServiceUrl: string;
	browserId: string | undefined;
	treatmentId: string;
	renderingTarget: RenderingTarget;
	logTreatmentInteractionCall: (
		interactionType: AuxiaInteractionInteractionType,
		actionName: AuxiaInteractionActionName,
	) => Promise<void>;
}

const decideIsSupporter = (): boolean => {
	// nb: We will not be calling the Auxia API if the user is signed in, so we can set isSignedIn to false.
	const isSignedIn = false;
	const isSupporter = shouldHideSupportMessaging(isSignedIn);
	if (isSupporter === 'Pending') {
		return true;
	}
	return isSupporter;
};

const decideDailyArticleCount = (): number => {
	const value = getDailyArticleCount();
	if (value === undefined) {
		return 0;
	}
	const today = getToday(); // number of days since unix epoch for today date
	for (const daily of value) {
		if (daily.day === today) {
			return daily.count;
		}
	}
	return 0;
};

const decideAuxiaProxyReaderPersonalData =
	async (): Promise<AuxiaGateReaderPersonalData> => {
		const browserId =
			getCookie({ name: 'bwid', shouldMemoize: true }) ?? undefined;
		const dailyArticleCount = decideDailyArticleCount();
		const hasConsent = await hasCmpConsentForBrowserId();
		const isSupporter = decideIsSupporter();
		const countryCode = (await getLocaleCode()) ?? ''; // default to empty string
		const gumvtid_str: string =
			getCookie({ name: 'GU_mvt_id', shouldMemoize: true }) ?? '0';
		const gumvtid_num: number = parseInt(gumvtid_str);
		const data = {
			browserId: hasConsent ? browserId : undefined,
			dailyArticleCount,
			isSupporter,
			countryCode,
			gumvtid: gumvtid_num,
		};
		return Promise.resolve(data);
	};

const fetchProxyGetTreatments = async (
	contributionsServiceUrl: string,
	pageId: string,
	browserId: string | undefined,
	isSupporter: boolean,
	dailyArticleCount: number,
	editionId: EditionId,
	contentType: string,
	sectionId: string,
	tagIds: string[],
	gateDismissCount: number,
	countryCode: string,
): Promise<AuxiaProxyGetTreatmentsResponse> => {
	// pageId example: 'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
	const articleIdentifier = `www.theguardian.com/${pageId}`;
	// articleIdentifier example: 'www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'
	const url = `${contributionsServiceUrl}/auxia/get-treatments`;
	const headers = {
		'Content-Type': 'application/json',
	};
	const payload: AuxiaProxyGetTreatmentsPayload = {
		browserId,
		isSupporter,
		dailyArticleCount,
		articleIdentifier,
		editionId,
		contentType,
		sectionId,
		tagIds,
		gateDismissCount,
		countryCode,
	};
	const params = {
		method: 'POST',
		headers,
		body: JSON.stringify(payload),
	};

	const response_raw = await fetch(url, params);
	const response =
		(await response_raw.json()) as AuxiaProxyGetTreatmentsResponse;

	return Promise.resolve(response);
};

const buildAuxiaGateDisplayData = async (
	contributionsServiceUrl: string,
	pageId: string,
	editionId: EditionId,
	contentType: string,
	sectionId: string,
	tags: TagType[],
	gateDismissCount: number,
): Promise<AuxiaGateDisplayData | undefined> => {
	const readerPersonalData = await decideAuxiaProxyReaderPersonalData();
	const tagIds = tags.map((tag) => tag.id);
	const response = await fetchProxyGetTreatments(
		contributionsServiceUrl,
		pageId,
		readerPersonalData.browserId,
		readerPersonalData.isSupporter,
		readerPersonalData.dailyArticleCount,
		editionId,
		contentType,
		sectionId,
		tagIds,
		gateDismissCount,
		readerPersonalData.countryCode,
	);
	if (response.status && response.data) {
		const answer = {
			browserId: readerPersonalData.browserId,
			auxiaData: response.data,
		};
		return Promise.resolve(answer);
	}

	return Promise.resolve(undefined);
};

const auxiaLogTreatmentInteraction = async (
	contributionsServiceUrl: string,
	userTreatment: AuxiaAPIResponseDataUserTreatment,
	interactionType: AuxiaInteractionInteractionType,
	actionName: AuxiaInteractionActionName,
	browserId: string | undefined,
): Promise<void> => {
	const url = `${contributionsServiceUrl}/auxia/log-treatment-interaction`;
	const headers = {
		'Content-Type': 'application/json',
	};
	const microTime = Date.now() * 1000;

	const payload: AuxiaProxyLogTreatmentInteractionPayload = {
		browserId,
		treatmentTrackingId: userTreatment.treatmentTrackingId,
		treatmentId: userTreatment.treatmentId,
		surface: userTreatment.surface,
		interactionType,
		interactionTimeMicros: microTime,
		actionName,
	};
	const params = {
		method: 'POST',
		headers,
		body: JSON.stringify(payload),
	};

	await fetch(url, params);
};

const buildAbTestTrackingAuxiaVariant = (
	treatmentId: string,
): {
	name: string;
	variant: string;
	id: string;
} => {
	return {
		name: 'AuxiaSignInGate',
		variant: treatmentId,
		id: treatmentId,
	};
};

const SignInGateSelectorAuxia = ({
	host = 'https://theguardian.com/',
	pageId,
	idUrl,
	contributionsServiceUrl,
	editionId,
	isPreview,
	isPaidContent,
	contentType,
	sectionId,
	tags,
}: PropsAuxia) => {
	/*
		comment group: auxia-prototype-e55a86ef
		This function if the Auxia prototype for the SignInGateSelector component.
	*/

	const [isGateDismissed, setIsGateDismissed] = useState<boolean | undefined>(
		undefined,
	);

	const [auxiaGateDisplayData, setAuxiaGateDisplayData] = useState<
		AuxiaGateDisplayData | undefined
	>(undefined);

	// We are using CurrentSignInGateABTest, with the details of the Auxia experiment,
	// to allow Ophan tracking
	const abTest: CurrentSignInGateABTest = {
		name: 'AuxiaSignInGate', // value of dataLinkNames
		variant: 'auxia-signin-gate', // variant id
		id: 'AuxiaSignInGate', // test id
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
			// Only make a request to Auxia if user is signed out. This means signed-in users will never receive an Auxia treatment, and therefore never see a sign-in gate
			const isSignedIn = await isUserLoggedIn();

			// Although the component is returning null if we are in preview or it's a paid content
			// We need to guard against the API possibly being called before the component returns.
			// That is because it would count as a content delivery for them, above all if they return a treatment
			//  without the subsequent Log Treatment notification, which would cause confusion.
			if (!isSignedIn && !isPreview && !isPaidContent) {
				const data = await buildAuxiaGateDisplayData(
					contributionsServiceUrl,
					pageId,
					editionId,
					contentType,
					sectionId,
					tags,
					retrieveDismissedCount(abTest.variant, abTest.name),
				);
				if (data !== undefined) {
					setAuxiaGateDisplayData(data);

					const treatmentId =
						data.auxiaData.userTreatment?.treatmentId;
					if (treatmentId) {
						// Record the fact that Auxia has returned a treatment. This is not a VIEW event, so we use the RETURN action here
						void submitComponentEventTracking(
							{
								component: {
									componentType: 'SIGN_IN_GATE',
									id: treatmentId,
								},
								action: 'RETURN',
								abTest: buildAbTestTrackingAuxiaVariant(
									treatmentId,
								),
							},
							renderingTarget,
						);
					}
				}
			}
		})().catch((error) => {
			console.error('Error fetching Auxia display data:', error);
		});
	}, [abTest, isPaidContent, isPreview]);

	// We are not showing the gate if we are in preview, it's a paid contents
	// or the user is signed in or if for some reasons we could not determine the
	// pageViewId

	// According to the reacts rules we can only put this check after all the hooks.

	if (isPreview || isPaidContent || isUndefined(pageViewId)) {
		return null;
	}

	const ctaUrlParams = {
		pageId,
		host,
		pageViewId,
		idUrl,
		currentTest: abTest,
		componentId: abTest.id,
	} satisfies Parameters<typeof generateGatewayUrl>[1];

	const signInUrl = generateGatewayUrl('signin', ctaUrlParams);

	return (
		<>
			{!isGateDismissed &&
				auxiaGateDisplayData?.auxiaData.userTreatment !== undefined && (
					<ShowSignInGateAuxia
						host={host}
						signInUrl={signInUrl}
						// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- Odd react types, should review
						setShowGate={(show) => setIsGateDismissed(!show)}
						abTest={buildAbTestTrackingAuxiaVariant(
							auxiaGateDisplayData.auxiaData.userTreatment
								.treatmentId,
						)}
						userTreatment={
							auxiaGateDisplayData.auxiaData.userTreatment
						}
						contributionsServiceUrl={contributionsServiceUrl}
						browserId={auxiaGateDisplayData.browserId}
						treatmentId={
							auxiaGateDisplayData.auxiaData.userTreatment
								.treatmentId
						}
						renderingTarget={renderingTarget}
						logTreatmentInteractionCall={async (
							interactionType: AuxiaInteractionInteractionType,
							actionName: AuxiaInteractionActionName,
						) => {
							await auxiaLogTreatmentInteraction(
								contributionsServiceUrl,
								auxiaGateDisplayData.auxiaData.userTreatment!,
								interactionType,
								actionName,
								auxiaGateDisplayData.browserId,
							);
						}}
					/>
				)}
		</>
	);
};

const ShowSignInGateAuxia = ({
	host,
	signInUrl,
	setShowGate,
	abTest,
	userTreatment,
	contributionsServiceUrl,
	browserId,
	treatmentId,
	renderingTarget,
	logTreatmentInteractionCall,
}: ShowSignInGateAuxiaProps) => {
	const componentId = 'main_variant_5';
	const checkoutCompleteCookieData = undefined;
	const personaliseSignInGateAfterCheckoutSwitch = undefined;

	useOnce(() => {
		void auxiaLogTreatmentInteraction(
			contributionsServiceUrl,
			userTreatment,
			'VIEWED',
			'',
			browserId,
		).catch((error) => {
			console.error('Failed to log treatment interaction:', error);
		});

		void submitComponentEventTracking(
			{
				component: {
					componentType: 'SIGN_IN_GATE',
					id: treatmentId,
				},
				action: 'VIEW',
				abTest: buildAbTestTrackingAuxiaVariant(treatmentId),
			},
			renderingTarget,
		);
	}, [componentId]);

	return (
		<SignInGateAuxia
			guUrl={host}
			signInUrl={signInUrl}
			dismissGate={() => {
				setShowGate(false);
			}}
			abTest={abTest}
			ophanComponentId={componentId}
			checkoutCompleteCookieData={checkoutCompleteCookieData}
			personaliseSignInGateAfterCheckoutSwitch={
				personaliseSignInGateAfterCheckoutSwitch
			}
			userTreatment={userTreatment}
			logTreatmentInteractionCall={logTreatmentInteractionCall}
		/>
	);
};
