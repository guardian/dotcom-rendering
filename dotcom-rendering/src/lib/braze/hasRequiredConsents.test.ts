import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { hasRequiredConsents } from './hasRequiredConsents';

const brazeVendorId = '5ed8c49c4b8ce4571c7ad801';

describe('hasRequiredConsents', () => {
	describe('when the user is covered by tcfv2 and consent is given', () => {
		it('returns a promise which resolves with true', () => {
			const mockState = {
				tcfv2: {
					vendorConsents: {
						[brazeVendorId]: true,
					},
				},
			} as unknown as ConsentState;

			expect(hasRequiredConsents(mockState)).toBe(true);
		});
	});

	describe('when the user is covered by tcfv2 and consent is not given', () => {
		it('returns a promise which resolves with false', () => {
			const mockState = {
				tcfv2: {
					vendorConsents: {
						[brazeVendorId]: false,
					},
				},
			} as unknown as ConsentState;

			expect(hasRequiredConsents(mockState)).toBe(false);
		});
	});

	describe('when the user is covered by ccpa and consent is given', () => {
		it('returns a promise which resolves with true', () => {
			const mockState = {
				ccpa: {
					doNotSell: false,
				},
			} as unknown as ConsentState;

			expect(hasRequiredConsents(mockState)).toBe(true);
		});
	});

	describe('when the user is covered by ccpa and consent is not given', () => {
		it('returns a promise which resolves with false', () => {
			const mockState = {
				ccpa: {
					doNotSell: true,
				},
			} as unknown as ConsentState;

			expect(hasRequiredConsents(mockState)).toBe(false);
		});
	});

	describe('when the user is covered by aus and consent is given', () => {
		it('returns a promise which resolves with true', () => {
			const mockState = {
				aus: {
					personalisedAdvertising: true,
				},
			} as unknown as ConsentState;

			expect(hasRequiredConsents(mockState)).toBe(true);
		});
	});

	describe('when the user is covered by aus and consent is not given', () => {
		it('returns a promise which resolves with false', () => {
			const mockState = {
				aus: {
					personalisedAdvertising: false,
				},
			} as unknown as ConsentState;

			expect(hasRequiredConsents(mockState)).toBe(false);
		});
	});
});
