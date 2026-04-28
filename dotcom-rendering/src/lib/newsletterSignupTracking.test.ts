import { submitComponentEvent } from '../client/ophan/ophan';
import {
	AB_TEST_NAME,
	NEWSLETTER_SIGNUP_COMPONENT_ID,
	sendNewsletterSignupEvent,
} from './newsletterSignupTracking';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

const IDENTITY_NAME = 'morning-briefing';
const RENDERING_TARGET = 'Web';

describe('NEWSLETTER_SIGNUP_COMPONENT_ID', () => {
	it('returns the correct control component id', () => {
		expect(NEWSLETTER_SIGNUP_COMPONENT_ID.control(IDENTITY_NAME)).toBe(
			`AR SecureSignup ${IDENTITY_NAME}`,
		);
	});

	it('returns the correct variant component id', () => {
		expect(NEWSLETTER_SIGNUP_COMPONENT_ID.variant(IDENTITY_NAME)).toBe(
			`AR NewsletterSignupCard ${IDENTITY_NAME}`,
		);
	});
});

describe('sendNewsletterSignupEvent', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('calls submitComponentEvent with the correct shape for a VIEW event', () => {
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName: IDENTITY_NAME,
			componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.control(IDENTITY_NAME),
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
				}),
			},
			RENDERING_TARGET,
		);
	});

	it('calls submitComponentEvent with the correct shape for an EXPAND event', () => {
		const renderUrl = '/world/newsletters/morning-briefing/latest';

		sendNewsletterSignupEvent({
			action: 'EXPAND',
			identityName: IDENTITY_NAME,
			componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(IDENTITY_NAME),
			renderingTarget: RENDERING_TARGET,
			value: { eventDescription: 'preview-open', renderUrl },
		});

		expect(submitComponentEvent).toHaveBeenCalledWith(
			{
				component: {
					componentType: 'NEWSLETTER_SUBSCRIPTION',
					id: `AR NewsletterSignupCard ${IDENTITY_NAME}`,
				},
				action: 'EXPAND',
				value: JSON.stringify({
					eventDescription: 'preview-open',
					renderUrl,
					newsletterId: IDENTITY_NAME,
				}),
			},
			RENDERING_TARGET,
		);
	});

	it('always merges newsletterId into the value payload', () => {
		sendNewsletterSignupEvent({
			action: 'CLOSE',
			identityName: IDENTITY_NAME,
			componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(IDENTITY_NAME),
			renderingTarget: RENDERING_TARGET,
			value: {
				eventDescription: 'preview-close',
				renderUrl: '/some-url',
			},
		});

		const call = (submitComponentEvent as jest.Mock).mock.calls[0][0];
		const parsedValue = JSON.parse(call.value as string) as Record<
			string,
			unknown
		>;

		expect(parsedValue).toMatchObject({
			newsletterId: IDENTITY_NAME,
		});
		expect(parsedValue).not.toHaveProperty('timestamp');
	});

	it('uses the AB_TEST_NAME constant for the abTest field in view events', () => {
		sendNewsletterSignupEvent({
			action: 'VIEW',
			identityName: IDENTITY_NAME,
			componentId: NEWSLETTER_SIGNUP_COMPONENT_ID.control(IDENTITY_NAME),
			renderingTarget: RENDERING_TARGET,
			value: {
				eventDescription: 'newsletter-signup-viewed',
				abTest: AB_TEST_NAME,
				abVariant: 'control',
			},
		});

		const call = (submitComponentEvent as jest.Mock).mock.calls[0][0];
		const parsedValue = JSON.parse(call.value as string) as Record<
			string,
			unknown
		>;

		expect(parsedValue.abTest).toBe('newsletters-newsletter-signup-card');
		expect(parsedValue.abVariant).toBe('control');
	});
});
