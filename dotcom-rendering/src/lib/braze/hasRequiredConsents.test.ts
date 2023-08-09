import { getConsentFor } from '@guardian/consent-management-platform';
import type {
	ConsentState,
	OnConsentChange,
} from '@guardian/consent-management-platform/dist/types';
import { jest } from '@jest/globals';

const brazeVendorId = '5ed8c49c4b8ce4571c7ad801';

let mockOnConsentChangeResult: ConsentState;
jest.unstable_mockModule('@guardian/consent-management-platform', () => ({
	onConsentChange: (callback: Parameters<OnConsentChange>[0]) => {
		callback(mockOnConsentChangeResult);
	},
	getConsentFor,
}));

const { hasRequiredConsents } = await import('./hasRequiredConsents');

afterEach(() => {
	// @ts-expect-error -- it’s a test
	mockOnConsentChangeResult = undefined;
});

describe('hasRequiredConsents', () => {
	describe('when the user is covered by tcfv2 and consent is given', () => {
		it('returns a promise which resolves with true', async () => {
			mockOnConsentChangeResult = {
				// @ts-expect-error -- it’s a test
				tcfv2: {
					vendorConsents: {
						[brazeVendorId]: true,
					},
				},
			};
			await expect(hasRequiredConsents()).resolves.toBe(true);
		});
	});

	describe('when the user is covered by tcfv2 and consent is not given', () => {
		it('returns a promise which resolves with false', async () => {
			mockOnConsentChangeResult = {
				// @ts-expect-error -- it’s a test
				tcfv2: {
					vendorConsents: {
						[brazeVendorId]: false,
					},
				},
			};

			await expect(hasRequiredConsents()).resolves.toBe(false);
		});
	});

	describe('when the user is covered by ccpa and consent is given', () => {
		it('returns a promise which resolves with true', async () => {
			// @ts-expect-error -- it’s a test
			mockOnConsentChangeResult = {
				ccpa: {
					doNotSell: false,
				},
			};

			await expect(hasRequiredConsents()).resolves.toBe(true);
		});
	});

	describe('when the user is covered by ccpa and consent is not given', () => {
		it('returns a promise which resolves with false', async () => {
			// @ts-expect-error -- it’s a test
			mockOnConsentChangeResult = {
				ccpa: {
					doNotSell: true,
				},
			};

			await expect(hasRequiredConsents()).resolves.toBe(false);
		});
	});

	describe('when the user is covered by aus and consent is given', () => {
		it('returns a promise which resolves with true', async () => {
			// @ts-expect-error -- it’s a test
			mockOnConsentChangeResult = {
				aus: {
					personalisedAdvertising: true,
				},
			};

			await expect(hasRequiredConsents()).resolves.toBe(true);
		});
	});

	describe('when the user is covered by aus and consent is not given', () => {
		it('returns a promise which resolves with false', async () => {
			// @ts-expect-error -- it’s a test
			mockOnConsentChangeResult = {
				aus: {
					personalisedAdvertising: false,
				},
			};

			await expect(hasRequiredConsents()).resolves.toBe(false);
		});
	});
});
