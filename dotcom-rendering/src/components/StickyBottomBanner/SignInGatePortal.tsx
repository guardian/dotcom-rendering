import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { EditionId } from '../../lib/edition';
import type { CanShowResult } from '../../lib/messagePicker';
import { useAuthStatus } from '../../lib/useAuthStatus';
import type { TagType } from '../../types/tag';
import { Island } from '../Island';
import { pageIdIsAllowedForGating } from '../SignInGate/displayRules';
import { SignInGateSelector } from '../SignInGateSelector.importable';

/**
 * SignInGatePortal - Portal wrapper for SignInGateSelector
 *
 * This component wraps the existing SignInGateSelector in a portal
 * so it can be controlled by the StickyBottomBanner message picker
 * while maintaining all the existing Auxia logic.
 */
export const SignInGatePortal = ({
	host = 'https://theguardian.com/',
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	pageId,
	contributionsServiceUrl,
	editionId,
	idUrl,
}: {
	host?: string;
	contentType: string;
	sectionId: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview: boolean;
	pageId: string;
	contributionsServiceUrl: string;
	editionId: EditionId;
	idUrl: string;
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
		setTargetElement(element);

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
	]);

	if (!(shouldShowGate && targetElement)) {
		return null;
	}

	return createPortal(
		<Island priority="feature" defer={{ until: 'visible' }}>
			<SignInGateSelector
				contentType={contentType}
				sectionId={sectionId}
				tags={tags}
				isPaidContent={isPaidContent}
				isPreview={isPreview}
				host={host}
				pageId={pageId}
				idUrl={idUrl}
				contributionsServiceUrl={contributionsServiceUrl}
				editionId={editionId}
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
export const canShowSignInGatePortal = (
	isSignedIn: boolean | undefined,
	isPaidContent: boolean,
	isPreview: boolean,
	pageId?: string,
): Promise<CanShowResult<void>> => {
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

	return Promise.resolve({ show: true, meta: undefined });
};
