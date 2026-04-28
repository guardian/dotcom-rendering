import { submitComponentEvent } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

export const AB_TEST_NAME = 'newsletters-newsletter-signup-card';

/**
 * The component ids used by each branch of the newsletter signup A/B test.
 * Keeping them here ensures the VIEW event (fired on mount in EmailSignUpWrapper)
 * and subsequent events (EXPAND/CLOSE in NewsletterSignupCardContainer, SUBSCRIBE
 * in SecureSignup) all share the same id, so they can be joined in Ophan.
 *
 * Note: both ids use the `AR` prefix as a shared convention, keeping them
 * consistent with the pre-existing `SecureSignup` component id.
 */
export const NEWSLETTER_SIGNUP_COMPONENT_ID = {
	control: (identityName: string) => `AR SecureSignup ${identityName}`,
	variant: (identityName: string) =>
		`AR NewsletterSignupCard ${identityName}`,
} as const;

type NewsletterSignupAction = 'VIEW' | 'EXPAND' | 'CLOSE';

/**
 * Sends a newsletter signup tracking event to Ophan.
 *
 * Used by both branches of the A/B test so that all events share a consistent
 * component shape. Import this wherever you need to track an interaction with
 * the email signup — e.g. VIEW on mount, EXPAND/CLOSE on preview open/close.
 */
export const sendNewsletterSignupEvent = ({
	action,
	identityName,
	componentId,
	renderingTarget,
	value,
}: {
	action: NewsletterSignupAction;
	identityName: string;
	componentId: string;
	renderingTarget: RenderingTarget;
	value: Record<string, unknown>;
}): void => {
	void submitComponentEvent(
		{
			component: {
				componentType: 'NEWSLETTER_SUBSCRIPTION',
				id: componentId,
			},
			action,
			value: JSON.stringify({
				...value,
				newsletterId: identityName,
			}),
		},
		renderingTarget,
	);
};
