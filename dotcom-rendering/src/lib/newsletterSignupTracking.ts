import type { AbTest, TAction } from '@guardian/ophan-tracker-js';
import { submitComponentEvent } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

export const AB_TEST_NAME = 'newsletters-newsletter-signup-card';

export type NewsletterEventDescription =
	| 'click-button'
	| 'form-submission'
	| 'submission-confirmed'
	| 'submission-failed'
	| 'open-captcha'
	| 'captcha-load-error'
	| 'form-submit-error'
	| 'captcha-not-passed'
	| 'captcha-passed';

export const EVENT_DESCRIPTION_TO_ACTION = {
	'click-button': 'CLICK',
	'form-submission': 'ANSWER',
	'captcha-not-passed': 'ANSWER',
	'captcha-passed': 'ANSWER',
	'submission-confirmed': 'SUBSCRIBE',
	'captcha-load-error': 'CLOSE',
	'form-submit-error': 'CLOSE',
	'submission-failed': 'CLOSE',
	'open-captcha': 'EXPAND',
} as const satisfies Record<NewsletterEventDescription, string>;

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

/**
 * Sends a newsletter signup tracking event to Ophan.
 *
 * Used by both branches of the A/B test so that all events share a consistent
 * component shape. Import this wherever you need to track an interaction with
 * the email signup — e.g. VIEW on mount, EXPAND/CLOSE on preview open/close,
 * CLICK/ANSWER/SUBSCRIBE on form interactions.
 */
export const sendNewsletterSignupEvent = ({
	action,
	identityName,
	componentId,
	renderingTarget,
	value,
	abTest,
}: {
	action: TAction;
	identityName: string;
	componentId: string;
	renderingTarget: RenderingTarget;
	value: Record<string, unknown>;
	abTest?: AbTest;
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
				timestamp: Date.now(),
			}),
			abTest,
		},
		renderingTarget,
	);
};
