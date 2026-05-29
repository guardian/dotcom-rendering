import { submitComponentEvent } from '../client/ophan/ophan';
import {
	AB_TEST_NAME,
	NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT,
	sendNewsletterSignupEvent,
} from './newsletterSignupTracking';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

const IDENTITY_NAME = 'morning-briefing';
const RENDERING_TARGET = 'Web';
const MOCK_TIMESTAMP = 1_000_000_000_000;

describe('NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT', () => {
	it('returns explicit IDs for in-article and highlights contexts', () => {
		expect({
			inArticleControl:
				NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.inArticle.control(
					IDENTITY_NAME,
				),
			inArticleVariant:
				NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.inArticle.variant(
					IDENTITY_NAME,
				),
			highlights:
				NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.highlights.control(
					IDENTITY_NAME,
				),
		}).toEqual({
			inArticleControl: `AR SecureSignup ${IDENTITY_NAME}`,
			inArticleVariant: `AR NewsletterSignupForm ${IDENTITY_NAME}`,
			highlights: `AR HighlightsNewsletterSignupForm ${IDENTITY_NAME}`,
		});
	});
});

describe('sendNewsletterSignupEvent', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(Date, 'now').mockReturnValue(MOCK_TIMESTAMP);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('calls submitComponentEvent with the correct shape for a VIEW event', () => {
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName: IDENTITY_NAME,
			componentId:
				NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.inArticle.control(
					IDENTITY_NAME,
				),
			renderingTarget: RENDERING_TARGET,
			value: { eventDescription: 'newsletter-signup-viewed' },
		});

		expect(submitComponentEvent).toHaveBeenCalledWith(
			{
				component: {
					componentType: 'NEWSLETTER_SUBSCRIPTION',
					id: `AR SecureSignup ${IDENTITY_NAME}`,
				},
				action: 'VIEW',
				value: JSON.stringify({
					eventDescription: 'newsletter-signup-viewed',
					newsletterId: IDENTITY_NAME,
					timestamp: MOCK_TIMESTAMP,
				}),
				abTest: undefined,
			},
			RENDERING_TARGET,
		);
	});

	it('merges newsletterId and timestamp into event payload', () => {
		sendNewsletterSignupEvent({
			action: 'CLOSE',
			identityName: IDENTITY_NAME,
			componentId:
				NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.inArticle.variant(
					IDENTITY_NAME,
				),
			renderingTarget: RENDERING_TARGET,
			value: {
				eventDescription: 'preview-close',
				renderUrl: '/some-url',
			},
		});

		expect(submitComponentEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				value: JSON.stringify({
					eventDescription: 'preview-close',
					renderUrl: '/some-url',
					newsletterId: IDENTITY_NAME,
					timestamp: MOCK_TIMESTAMP,
				}),
			}),
			RENDERING_TARGET,
		);
	});

	it('passes the abTest object to the top-level abTest field (not encoded in value)', () => {
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName: IDENTITY_NAME,
			componentId:
				NEWSLETTER_SIGNUP_COMPONENT_ID_BY_CONTEXT.inArticle.control(
					IDENTITY_NAME,
				),
			renderingTarget: RENDERING_TARGET,
			value: {
				eventDescription: 'newsletter-signup-viewed',
				isAlreadySubscribed: false,
			},
			abTest: { name: AB_TEST_NAME, variant: 'control' },
		});

		expect(submitComponentEvent).toHaveBeenCalledWith(
			expect.objectContaining({
				abTest: { name: AB_TEST_NAME, variant: 'control' },
				value: JSON.stringify({
					eventDescription: 'newsletter-signup-viewed',
					isAlreadySubscribed: false,
					newsletterId: IDENTITY_NAME,
					timestamp: MOCK_TIMESTAMP,
				}),
			}),
			RENDERING_TARGET,
		);
	});
});
