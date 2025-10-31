import { isSentryEnabled } from './sentryLoader';

// Stubbed to prevent parsing of __webpack_public_path__
jest.mock('./loadSentry', () => ({ loadSentry: jest.fn() }));

describe('Enable Sentry when it passes loading conditions', () => {
	it('does NOT enable Sentry when enableSentryReporting switch is false', () => {
		expect(
			isSentryEnabled({
				isDev: false,
				enableSentryReporting: false,
				isInBrowserVariantTest: true,
				random: 99 / 100,
			}),
		).toEqual(false);
	});
	it('does NOT enable Sentry when in development environment', () => {
		expect(
			isSentryEnabled({
				isDev: true,
				enableSentryReporting: true,
				isInBrowserVariantTest: true,
				random: 1 / 100,
			}),
		).toEqual(false);
	});
	it('does enable Sentry when the user is in the browser bundle variant test', () => {
		expect(
			isSentryEnabled({
				isDev: false,
				enableSentryReporting: true,
				isInBrowserVariantTest: true,
				random: 1 / 100,
			}),
		).toEqual(true);
	});
	it('does enable Sentry for 0.1% of users', () => {
		expect(
			isSentryEnabled({
				isDev: false,
				enableSentryReporting: true,
				isInBrowserVariantTest: false,
				random: 1 / 100,
			}),
		).toEqual(false);
		expect(
			isSentryEnabled({
				isDev: false,
				enableSentryReporting: true,
				isInBrowserVariantTest: false,
				random: 99 / 100,
			}),
		).toEqual(false);
		expect(
			isSentryEnabled({
				isDev: false,
				enableSentryReporting: true,
				isInBrowserVariantTest: false,
				random: 99.9001 / 100,
			}),
		).toEqual(true);
		expect(
			isSentryEnabled({
				isDev: false,
				enableSentryReporting: true,
				isInBrowserVariantTest: false,
				random: 100 / 100,
			}),
		).toEqual(true);
	});
});
