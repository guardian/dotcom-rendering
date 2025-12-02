import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { buildAuxiaGateDisplayData } from '../../lib/auxia';
import type { EditionId } from '../../lib/edition';
import type { CanShowResult } from '../../lib/messagePicker';
import { useAuthStatus } from '../../lib/useAuthStatus';
import type { TagType } from '../../types/tag';
import { Island } from '../Island';
import { retrieveLastGateDismissedCount } from '../SignInGate/dismissGate';
import { pageIdIsAllowedForGating } from '../SignInGate/displayRules';
import type { AuxiaGateDisplayData } from '../SignInGate/types';
import {
	getAuxiaGateVersion,
	SignInGateSelector,
} from '../SignInGateSelector.importable';

/**
 * SignInGatePortal - Portal wrapper for SignInGateSelector
 *
 * This component wraps the existing SignInGateSelector in a portal
 * so it can be controlled by the StickyBottomBanner message picker
 * while maintaining all the existing Auxia logic.
 */
export const SignInGatePortal = ({
	host = 'https://theguardian.com/',
	isPaidContent,
	isPreview,
	pageId,
	contributionsServiceUrl,
	auxiaGateDisplayData,
}: {
	host?: string;
	isPaidContent: boolean;
	isPreview: boolean;
	pageId: string;
	contributionsServiceUrl: string;
	auxiaGateDisplayData: AuxiaGateDisplayData;
}) => {
	const [shouldShowGate, setShouldShowGate] = useState<boolean>(false);
	const [targetElement, setTargetElement] = useState<HTMLElement | null>(
		null,
	);

	const authStatus = useAuthStatus();
	const isSignedOut = useMemo(
		() => authStatus.kind === 'SignedOut',
		[authStatus.kind],
	);

	// Memoize page ID check to prevent recalculation
	const pageIdAllowed = useMemo(() => {
		return pageIdIsAllowedForGating(pageId);
	}, [pageId]);

	// Stable event handler using useCallback
	const handleGateDismissed = useCallback(() => {
		setShouldShowGate(false);
	}, []);

	useEffect(() => {
		const element = document.getElementById('sign-in-gate');
		const gateVersion = getAuxiaGateVersion(
			auxiaGateDisplayData.auxiaData.userTreatment,
		);

		/**
		 * - The target mount element is chosen with special handling for Auxia gate v2:
		 *   when getAuxiaGateVersion(...)= 'v2' the component uses document.body as the portal
		 *   target instead of the local '#sign-in-gate' element. This is intentional to avoid
		 *   stacking context and clipping issues that break the expected modal behavior.
		 *
		 *   Stacking context rationale for using document.body:
		 *   - Modern CSS creates local stacking contexts on positioned elements, elements
		 *     with transforms, or elements with certain CSS properties (e.g. will-change, opacity).
		 *   - If the portal is mounted inside an ancestor that establishes a stacking context,
		 *     a fixed-positioned or absolutely positioned modal/overlay inside the gate can be
		 *     constrained (clipped, hidden behind other content, or assigned an unexpected z-index)
		 *     relative to outside elements.
		 *   - Mounting the gate into document.body places it at the top-level of the DOM,
		 *     ensuring the gate's overlay and z-index are not affected by intermediate stacking
		 *     contexts or overflow/clip rules, and that fixed positioning behaves consistently
		 *     across browsers. This prevents the v2 modal from appearing behind headers, being
		 *     clipped by parent containers, or having incorrect stacking relative to other site UI.
		 */
		setTargetElement(gateVersion === 'v2' ? document.body : element);

		// Check all the conditions that would prevent the gate from showing
		const shouldShow = !!(
			element &&
			pageIdAllowed &&
			!isPreview &&
			!isPaidContent &&
			isSignedOut
		);

		setShouldShowGate(shouldShow);

		// Listen for gate dismissal events using our stable handler
		document.addEventListener(
			'article:sign-in-gate-dismissed',
			handleGateDismissed,
		);

		return () => {
			document.removeEventListener(
				'article:sign-in-gate-dismissed',
				handleGateDismissed,
			);
		};
	}, [
		pageIdAllowed,
		isPreview,
		isPaidContent,
		isSignedOut,
		handleGateDismissed,
		auxiaGateDisplayData,
	]);

	if (!(shouldShowGate && targetElement)) {
		return null;
	}

	return createPortal(
		<Island priority="feature" defer={{ until: 'visible' }}>
			<SignInGateSelector
				isPaidContent={isPaidContent}
				isPreview={isPreview}
				host={host}
				pageId={pageId}
				contributionsServiceUrl={contributionsServiceUrl}
				auxiaGateDisplayData={auxiaGateDisplayData}
			/>
		</Island>,
		targetElement,
	);
};

/**
 * Function to check if a sign-in gate can be shown.
 * This replicates the logic from SignInGateSelector but is adapted
 * for use within the message picker system.
 */
export interface CanShowSignInGateProps {
	isSignedIn: boolean | undefined;
	isPaidContent: boolean;
	isPreview: boolean;
	pageId: string;
	contributionsServiceUrl: string;
	isInAuxiaControlGroup: boolean;
	editionId?: EditionId;
	contentType?: string;
	sectionId?: string;
	tags?: TagType[];
}
export const canShowSignInGatePortal = async ({
	isSignedIn,
	isPaidContent,
	isPreview,
	pageId,
	contributionsServiceUrl,
	isInAuxiaControlGroup,
	editionId,
	contentType,
	sectionId,
	tags,
}: CanShowSignInGateProps): Promise<CanShowResult<AuxiaGateDisplayData>> => {
	if (!window.guardian.config.switches.signInGate) {
		// Gates are disabled from the Frontend switchboard
		return Promise.resolve({ show: false });
	}

	// Check if the sign-in gate placeholder exists in the DOM
	const targetElement = document.getElementById('sign-in-gate');

	if (!targetElement) {
		return Promise.resolve({ show: false });
	}

	if (isPaidContent || isPreview || isSignedIn) {
		return Promise.resolve({ show: false });
	}

	if (pageId && !pageIdIsAllowedForGating(pageId)) {
		return Promise.resolve({ show: false });
	}

	if (
		!contributionsServiceUrl ||
		editionId === undefined ||
		contentType === undefined ||
		sectionId === undefined ||
		tags === undefined
	) {
		return Promise.resolve({ show: false });
	}

	try {
		const auxiaData = await buildAuxiaGateDisplayData(
			contributionsServiceUrl,
			pageId ?? '',
			editionId,
			contentType,
			sectionId,
			tags,
			retrieveLastGateDismissedCount('AuxiaSignInGate'),
			isInAuxiaControlGroup,
		);

		return {
			show: auxiaData?.auxiaData.userTreatment !== undefined,
			meta: auxiaData as AuxiaGateDisplayData,
		};
	} catch (e) {
		const message = `SignInGatePortal canShowSignInGatePortal - error: ${String(
			e,
		)}`;
		window.guardian.modules.sentry.reportError(
			new Error(message, { cause: e }),
			'sign-in-gate',
		);
		return { show: false };
	}
};
