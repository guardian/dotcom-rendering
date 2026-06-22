import type { AbTest, TAction } from '@guardian/ophan-tracker-js';
import { submitComponentEvent } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

export type NewsletterEventDescription =
	| 'click-button'
	| 'email-input-focused'
	| 'form-submission'
	| 'submission-confirmed'
	| 'submission-failed'
	| 'open-captcha'
	| 'captcha-load-error'
	| 'form-submit-error'
	| 'captcha-not-passed'
	| 'captcha-passed'
	| 'highlights-card-viewed'
	| 'highlights-card-modal-opened'
	| 'highlights-card-modal-closed';

export const EVENT_DESCRIPTION_TO_ACTION = {
	'click-button': 'CLICK',
	'email-input-focused': 'EXPAND',
	'form-submission': 'ANSWER',
	'captcha-not-passed': 'ANSWER',
	'captcha-passed': 'ANSWER',
	'submission-confirmed': 'SUBSCRIBE',
	'captcha-load-error': 'CLOSE',
	'form-submit-error': 'CLOSE',
	'submission-failed': 'CLOSE',
	'open-captcha': 'EXPAND',
	'highlights-card-viewed': 'VIEW',
	'highlights-card-modal-opened': 'EXPAND',
	'highlights-card-modal-closed': 'CLOSE',
} as const satisfies Record<NewsletterEventDescription, string>;

/**
 * Stable component IDs for newsletter signup tracking.
 * Keeping them here ensures the VIEW event (fired on mount in EmailSignUpWrapper)
 * and subsequent interaction events all share the same id so they can be
 * joined in Ophan.
 */
export const NEWSLETTER_SIGNUP_COMPONENT_ID = {
	secureSignup: (identityName: string) => `AR SecureSignup ${identityName}`,
	inArticleSignupForm: (identityName: string) =>
		`AR NewsletterSignupForm ${identityName}`,
	highlightsCard: (identityName: string) =>
		`HighlightsNewsletterCard ${identityName}`,
} as const;

/**
 * Sends a newsletter signup tracking event to Ophan.
 *
 * Import this wherever you need to track an interaction with the email signup —
 * e.g. VIEW on mount, EXPAND/CLOSE on preview open/close,
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
