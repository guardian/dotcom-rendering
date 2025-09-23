import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { buildAuxiaGateDisplayData } from '../../lib/auxia';
import type { EditionId } from '../../lib/edition';
import type { CanShowResult } from '../../lib/messagePicker';
import { useAuthStatus } from '../../lib/useAuthStatus';
import type { TagType } from '../../types/tag';
import { Island } from '../Island';
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
	idUrl,
	auxiaGateDisplayData,
}: {
	host?: string;
	isPaidContent: boolean;
	isPreview: boolean;
	pageId: string;
	contributionsServiceUrl: string;
	idUrl: string;
	auxiaGateDisplayData?: AuxiaGateDisplayData | undefined;
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
			undefined,
			auxiaGateDisplayData?.auxiaData.userTreatment,
		);
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
				idUrl={idUrl}
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
export const canShowSignInGatePortal = async (
	isSignedIn: boolean | undefined,
	isPaidContent: boolean,
	isPreview: boolean,
	pageId?: string,
	contributionsServiceUrl?: string,
	editionId?: EditionId,
	contentType?: string,
	sectionId?: string,
	tags?: TagType[],
	retrieveDismissedCount?: (variant: string, name: string) => number,
): Promise<CanShowResult<AuxiaGateDisplayData>> => {
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
		tags === undefined ||
		retrieveDismissedCount === undefined
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
			retrieveDismissedCount('auxia-signin-gate', 'AuxiaSignInGate'),
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
