import { getCookie, isUndefined, storage } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { constructQuery } from '../lib/querystring';
import { useIsInView } from '../lib/useIsInView';
import { useOnce } from '../lib/useOnce';
import { usePageViewId } from '../lib/usePageViewId';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';
import type { ComponentEventParams } from './SignInGate/componentEventTracking';
import { submitComponentEventTracking } from './SignInGate/componentEventTracking';
import { pageIdIsAllowedForGating } from './SignInGate/displayRules';
import { SignInGateAuxiaV1 } from './SignInGate/gateDesigns/SignInGateAuxiaV1';
import { SignInGateAuxiaV2 } from './SignInGate/gateDesigns/SignInGateAuxiaV2';
import type {
	AuxiaAPIResponseDataUserTreatment,
	AuxiaGateDisplayData,
	AuxiaGateVersion,
	AuxiaInteractionActionName,
	AuxiaInteractionInteractionType,
	AuxiaProxyLogTreatmentInteractionPayload,
	CurrentSignInGateABTest,
} from './SignInGate/types';

// ------------------------------------------------------------------------------------------
// Default (pre Auxia Integration Experiment) types, SignInGateSelector and ShowSignInGate //
// ------------------------------------------------------------------------------------------

type Props = {
	isPaidContent: boolean;
	isPreview: boolean;
	host?: string;
	pageId: string;
	idUrl?: string;
	contributionsServiceUrl: string;
	auxiaGateDisplayData?: AuxiaGateDisplayData | undefined;
	signInGateVersion?: AuxiaGateVersion;
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

export const SignInGateSelector = ({
	isPaidContent,
	isPreview,
	host = 'https://theguardian.com/',
	pageId, // pageId is the path without starting slash
	idUrl = 'https://profile.theguardian.com',
	contributionsServiceUrl,
	auxiaGateDisplayData,
	signInGateVersion,
}: Props) => {
	if (!pageIdIsAllowedForGating(pageId)) {
		return <></>;
	}

	return (
		<SignInGateSelectorAuxia
			host={host}
			pageId={pageId}
			idUrl={idUrl}
			contributionsServiceUrl={contributionsServiceUrl}
			isPreview={isPreview}
			isPaidContent={isPaidContent}
			auxiaGateDisplayData={auxiaGateDisplayData}
			signInGateVersion={signInGateVersion}
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
	isPreview: boolean;
	isPaidContent: boolean;
	auxiaGateDisplayData?: AuxiaGateDisplayData;
	signInGateVersion?: AuxiaGateVersion;
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
	signInGateVersion?: AuxiaGateVersion;
}

const incrementGateDisplayCount = () => {
	const count = parseInt(
		storage.local.getRaw('gate_display_count') ?? '0',
		10,
	);
	const newCount = count + 1;
	storage.local.setRaw('gate_display_count', newCount.toString());
};

// The Auxia builder and reader helpers have been moved to `src/lib/auxia.ts`.
// The Auxia selector expects `auxiaGateDisplayData` to be provided by the caller
// (StickyBottomBanner) via the message picker's meta. Ensure the prop is in scope.

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
		keepalive: true,
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

export const getAuxiaGateVersion = (
	signInGateVersion?: AuxiaGateVersion,
	userTreatment?: AuxiaAPIResponseDataUserTreatment,
): AuxiaGateVersion => {
	if (signInGateVersion) {
		return signInGateVersion;
	}

	const params = new URLSearchParams(window.location.search);
	const version = params.get('auxia_gate_version');

	if (
		String(version).toLowerCase().endsWith('v2') ||
		String(userTreatment?.treatmentType)
			.toLowerCase()
			.includes('v2')
	) {
		return 'v2';
	}

	return 'v1'; // Default to v1
};

const SignInGateSelectorAuxia = ({
	host = 'https://theguardian.com/',
	pageId,
	idUrl,
	contributionsServiceUrl,
	isPreview,
	isPaidContent,
	auxiaGateDisplayData,
	signInGateVersion,
}: PropsAuxia) => {
	const [isGateDismissed, setIsGateDismissed] = useState<boolean | undefined>(
		undefined,
	);

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

	// auxiaGateDisplayData is expected to be provided by the caller (StickyBottomBanner)

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
						signInGateVersion={signInGateVersion}
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
	signInGateVersion,
}: ShowSignInGateAuxiaProps) => {
	const componentId = 'main_variant_5';
	const checkoutCompleteCookieData = undefined;
	const personaliseSignInGateAfterCheckoutSwitch = undefined;

	// Get the gate version configuration
	const gateVersion = getAuxiaGateVersion(signInGateVersion, userTreatment);

	const [signInGatePlaceholder, setSignInGatePlaceholder] =
		useState<HTMLElement | null>(null);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		const signInGate = document.getElementById('sign-in-gate');
		if (signInGate) {
			setSignInGatePlaceholder(signInGate);
			setNode(signInGate);
		}
	}, [setNode, setSignInGatePlaceholder]);

	useEffect(() => {
		if (hasBeenSeen) {
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
						id: `${treatmentId}_${gateVersion}`, // Include version in tracking
					},
					action: 'VIEW',
					abTest: buildAbTestTrackingAuxiaVariant(treatmentId),
				},
				renderingTarget,
			);

			// Once the gate is being displayed we need to update
			// the tracking of the number of times the gate has been displayed
			incrementGateDisplayCount();
		}
	}, [
		componentId,
		hasBeenSeen,
		browserId,
		contributionsServiceUrl,
		renderingTarget,
		treatmentId,
		userTreatment,
		gateVersion,
	]);

	const commonProps = {
		guUrl: host,
		signInUrl,
		dismissGate: () => {
			setShowGate(false);
		},
		abTest,
		ophanComponentId: componentId,
		checkoutCompleteCookieData,
		personaliseSignInGateAfterCheckoutSwitch,
		userTreatment,
		logTreatmentInteractionCall,
	};

	const [hasScroll, setHasScroll] = useState(false);
	useEffect(() => {
		const bodyHeight = document.body.scrollHeight;
		const documentHeight = document.documentElement.offsetHeight;
		setHasScroll(bodyHeight > documentHeight);
	}, []);

	const shouldShowV2Gate = hasBeenSeen ?? !hasScroll;

	return (
		<>
			<div
				ref={signInGatePlaceholder ? undefined : setNode}
				data-testid="sign-in-gate-sentinel"
				aria-hidden="true"
				style={{ height: 1, marginTop: -1 }}
			/>
			{gateVersion === 'v2' ? (
				shouldShowV2Gate && <SignInGateAuxiaV2 {...commonProps} />
			) : (
				<SignInGateAuxiaV1 {...commonProps} />
			)}
		</>
	);
};
