import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CanShowResult } from '../../lib/messagePicker';
import { useSignInGateSelector } from '../../lib/useSignInGateSelector';
import type { TagType } from '../../types/tag';

type SignInGatePortalCandidate = {
	gateElement: JSX.Element;
	targetElement: Element;
};

/**
 * SignInGatePortal component that renders a sign-in gate using React portal
 * into the designated gate position in the article content.
 *
 * This component is designed to be used within the message picker system
 * to coordinate with banners and prevent both from showing simultaneously.
 */
export const SignInGatePortal = ({
	host = 'https://theguardian.com/',
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
}: {
	host?: string;
	contentType: string;
	sectionId: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview: boolean;
}) => {
	const [gateCandidate, setGateCandidate] =
		useState<SignInGatePortalCandidate | null>(null);
	const gateSelector = useSignInGateSelector();

	useEffect(() => {
		// Find the sign-in gate placeholder in the DOM
		const targetElement = document.getElementById('sign-in-gate');

		if (!targetElement || !gateSelector) {
			setGateCandidate(null);
			return;
		}

		const [gateVariant, currentTest] = gateSelector;

		if (!gateVariant || !currentTest || !gateVariant.gate) {
			setGateCandidate(null);
			return;
		}

		// Check if the gate can show based on the variant's canShow logic
		void gateVariant
			.canShow({
				isSignedIn: false, // If we get here, we know user is not signed in
				currentTest,
				contentType,
				sectionId,
				tags,
				isPaidContent,
				isPreview,
				currentLocaleCode: undefined, // This should be passed as prop in real implementation
			})
			.then((canShow) => {
				if (!canShow || !gateVariant.gate) {
					setGateCandidate(null);
					return;
				}

				// Create the gate element using the gate variant
				const gateElement = gateVariant.gate({
					signInUrl: `${host}/signin`, // Basic implementation
					registerUrl: `${host}/register`, // Basic implementation
					guUrl: host,
					dismissGate: () => {
						// Handle gate dismissal
						setGateCandidate(null);
						document.dispatchEvent(
							new CustomEvent('article:sign-in-gate-dismissed'),
						);
					},
					ophanComponentId: 'sign-in-gate-portal',
					abTest: currentTest,
				});

				setGateCandidate({
					gateElement,
					targetElement,
				});
			})
			.catch(() => {
				// If canShow fails, don't show the gate
				setGateCandidate(null);
			});
	}, [
		gateSelector,
		host,
		contentType,
		sectionId,
		tags,
		isPaidContent,
		isPreview,
	]);

	// Render the gate using createPortal if we have a valid candidate
	if (gateCandidate) {
		return createPortal(
			gateCandidate.gateElement,
			gateCandidate.targetElement,
		);
	}

	return null;
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
): Promise<CanShowResult<void>> => {
	// Check if the sign-in gate placeholder exists in the DOM
	const targetElement = document.getElementById('sign-in-gate');

	if (!targetElement) {
		return Promise.resolve({ show: false });
	}

	// Early returns for conditions that prevent gate showing
	if (isPaidContent || isPreview || isSignedIn) {
		return Promise.resolve({ show: false });
	}

	// For now, we'll return true to allow the gate to show
	// The actual gate logic will determine if it should be displayed
	// based on the sign-in gate selector logic
	return Promise.resolve({ show: true, meta: undefined });
};
