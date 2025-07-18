import { getCookie, isUndefined } from '@guardian/libs';
import { useState } from 'react';
import {
	hasCmpConsentForBrowserId,
	shouldHideSupportMessaging,
} from '../lib/contributions';
import { getDailyArticleCount, getToday } from '../lib/dailyArticleCount';
import type { EditionId } from '../lib/edition';
import { getLocaleCode } from '../lib/getCountryCode';
import { isUserLoggedIn } from '../lib/identity';
import { constructQuery } from '../lib/querystring';
import { useAB } from '../lib/useAB';
import { useOnce } from '../lib/useOnce';
import { usePageViewId } from '../lib/usePageViewId';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagType } from '../types/tag';
import { useConfig } from './ConfigContext';
import type { ComponentEventParams } from './SignInGate/componentEventTracking';
import { submitComponentEventTracking } from './SignInGate/componentEventTracking';
import { retrieveDismissedCount } from './SignInGate/dismissGate';
import { pageIdIsAllowedForGating } from './SignInGate/displayRules';
import { SignInGateAuxia } from './SignInGate/gateDesigns/SignInGateAuxia';
import { signInGateComponent as gateLegacyComponent } from './SignInGate/gates/main-control';
import type {
	AuxiaAPIResponseDataUserTreatment,
	AuxiaGateDisplayData,
	AuxiaGateReaderPersonalData,
	AuxiaInteractionActionName,
	AuxiaInteractionInteractionType,
	AuxiaProxyGetTreatmentsPayload,
	AuxiaProxyGetTreatmentsResponse,
	AuxiaProxyLogTreatmentInteractionPayload,
	CanShowGateProps,
	CurrentSignInGateABTest,
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
	contributionsServiceUrl: string;
	editionId: EditionId;
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

// -------------------------------
// Auxia Integration Experiment //
// -------------------------------

const decideShouldShowLegacyGate = async (
	contentType: string,
	sectionId: string,
	tags: TagType[],
	isPaidContent: boolean,
	isPreview: boolean,
): Promise<boolean> => {
	/*
		Date: 14th May
		Author: Pascal

		As part of moving the control of gate display from the client side to SDC (support dotcom components)
		We introduce this function that is going to compute the value of `should_show_legacy_gate_tmp`, which is
		then passed to SDC.

		It basically needs to reproduce all the logic in the existing SignInGateSelectorDefault, which has a
		convoluted set of hooks controlling display, but that the logic of can be reversed engineered.
	*/

	const isSignedIn: boolean = await isUserLoggedIn();
	const currentTest: CurrentSignInGateABTest = {
		name: 'SignInGateMainControl',
		variant: 'main-control-5',
		id: 'SignInGateMainControl',
	};
	const countryCode = (await getLocaleCode()) ?? undefined;

	const input: CanShowGateProps = {
		isSignedIn,
		currentTest,
		contentType,
		sectionId,
		tags,
		isPaidContent,
		isPreview,
		currentLocaleCode: countryCode,
	};
	return gateLegacyComponent.canShow(input);
};

export const SignInGateSelector = ({
	contentType,
	sectionId = '',
	tags,
	isPaidContent,
	isPreview,
	host = 'https://theguardian.com/',
	pageId, // pageId is the path without starting slash
	idUrl = 'https://profile.theguardian.com',
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
			isAuxiaAudience={userIsInAuxiaExperiment}
		/>
	);
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
	isAuxiaAudience: boolean; // [1]
};

// [1] If true, it indicates that we are using the component for the regular Auxia share of the Audience
// otherwise, if false, it means that we are using the component to display the legacy gate.

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
		const hasConsented = await hasCmpConsentForBrowserId();
		const isSupporter = decideIsSupporter();
		const countryCode = (await getLocaleCode()) ?? ''; // default to empty string
		const mvtId_str: string =
			getCookie({ name: 'GU_mvt_id', shouldMemoize: true }) ?? '0';
		const mvtId: number = parseInt(mvtId_str);
		const data = {
			browserId,
			dailyArticleCount,
			isSupporter,
			countryCode,
			mvtId,
			hasConsented,
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
	mvtId: number,
	should_show_legacy_gate_tmp: boolean,
	hasConsented: boolean,
	shouldNotServeMandatory: boolean,
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
		mvtId,
		should_show_legacy_gate_tmp,
		hasConsented,
		shouldNotServeMandatory,
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

const decideShouldNotServeMandatory = (): boolean => {
	// Return a boolean indicating whether or not we accept mandatory gates for this call.
	// If the answer is `false` this doesn't decide whether the gate should be displayed or not,
	// it only means that if a gate is returned, then it must be mandatory.

	// Now the question is how do we decide the answer ?
	// We return false if the following query parameter is present in the url:
	// utm_source=newsshowcase

	// This may be extended in the future.

	// const params = new URLSearchParams(window.location.search);
	// const value: string | null = params.get('utm_source');
	// return value === 'newsshowcase';

	return false;
};

const buildAuxiaGateDisplayData = async (
	contributionsServiceUrl: string,
	pageId: string,
	editionId: EditionId,
	contentType: string,
	sectionId: string,
	tags: TagType[],
	gateDismissCount: number,
	isAuxiaAudience: boolean, // [1]
): Promise<AuxiaGateDisplayData | undefined> => {
	// [1] If true, it indicates that we are using the component for the regular Auxia share of the Audience
	// otherwise, if false, it means that we are using the component to display the legacy gate.

	const readerPersonalData = await decideAuxiaProxyReaderPersonalData();
	const tagIds = tags.map((tag) => tag.id);

	let should_show_legacy_gate_tmp;

	if (isAuxiaAudience) {
		should_show_legacy_gate_tmp = false;
		// The actual value is irrelevant in this case, but we have the convention to set it to false here
	} else {
		// The two times the function `buildAuxiaGateDisplayData` is called
		// it's behind a
		// (!isSignedIn && !isPreview && !isPaidContent)
		// guard. So we don't need to pass `isPreview` and `isPaidContent` to it, we know
		// they are both false.

		should_show_legacy_gate_tmp = await decideShouldShowLegacyGate(
			contentType,
			sectionId,
			tags,
			false,
			false,
		);
	}

	const shouldNotServeMandatory = decideShouldNotServeMandatory();

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
		readerPersonalData.mvtId,
		should_show_legacy_gate_tmp,
		readerPersonalData.hasConsented,
		shouldNotServeMandatory,
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
	// We have two types of gates: the standard Auxia gate and the
	// gu default gate that is being served from SDC
	// They are indistinguishable in terms of their structure, but the SDC
	// gate comes with treatmentId: 'default-treatment-id'
	// In this case, we should not run LogTreatmentInteraction

	if (userTreatment.treatmentId === 'default-treatment-id') {
		return;
	}

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

	try {
		const response = await fetch(url, params);
		if (!response.ok) {
			const error = new Error(
				`Failed to log treatment interaction: ${response.status}`,
			);
			window.guardian.modules.sentry.reportError(error, 'sign-in-gate');
		}
	} catch (error) {
		const errorReport = new Error(`Error logging treatment interaction`, {
			cause: error,
		});
		window.guardian.modules.sentry.reportError(errorReport, 'sign-in-gate');
	}
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
	isAuxiaAudience,
}: PropsAuxia) => {
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
					isAuxiaAudience,
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
							).catch((error) => {
								const errorReport = new Error(
									`Failed to log treatment interaction`,
									{
										cause: error,
									},
								);
								window.guardian.modules.sentry.reportError(
									errorReport,
									'sign-in-gate',
								);
							});
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
			const errorReport = new Error(
				`Failed to log treatment interaction`,
				{
					cause: error,
				},
			);
			window.guardian.modules.sentry.reportError(
				errorReport,
				'sign-in-gate',
			);
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
