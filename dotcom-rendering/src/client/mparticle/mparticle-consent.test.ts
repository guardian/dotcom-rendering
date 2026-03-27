import type { ConsentState } from '@guardian/libs';
import type { AuthStatus } from '../../lib/identity';
import { getAuthStatus as getAuthStatus_ } from '../../lib/identity';
import {
	mparticleConsentNeedsSync as mparticleConsentNeedsSync_,
	markMparticleConsentSynced as markMparticleConsentSynced_,
} from './cookies/mparticleConsentSynced';
import { syncConsentToMparticle as syncConsentToMparticle_ } from './mparticleConsentApi';
import {
	MPARTICLE_CONSENT_PURPOSE,
	syncMparticleConsent,
} from './mparticle-consent';

// Capture the callback registered by onConsentChange so tests can invoke it
let capturedConsentCallback:
	| ((state: ConsentState) => Promise<void>)
	| undefined;

const mockGetConsentFor = jest.fn();
const mockGetCookie = jest.fn();

jest.mock('@guardian/libs', () => ({
	// eslint-disable-next-line -- ESLint doesn't understand jest.requireActual
	...jest.requireActual<typeof import('@guardian/libs')>('@guardian/libs'),
	onConsentChange: jest.fn((cb: (state: ConsentState) => Promise<void>) => {
		capturedConsentCallback = cb;
	}),
	getConsentFor: (...args: unknown[]) => mockGetConsentFor(...args),
	getCookie: (...args: unknown[]) => mockGetCookie(...args),
}));

jest.mock('../../lib/identity', () => ({
	getAuthStatus: jest.fn(),
	getOptionsHeaders: jest.fn(),
}));

jest.mock('./mparticleConsentApi', () => ({
	syncConsentToMparticle: jest.fn(),
}));

jest.mock('./cookies/mparticleConsentSynced', () => ({
	mparticleConsentNeedsSync: jest.fn(),
	markMparticleConsentSynced: jest.fn(),
}));

const getAuthStatus = getAuthStatus_ as jest.MockedFunction<
	typeof getAuthStatus_
>;
const syncConsentToMparticle = syncConsentToMparticle_ as jest.MockedFunction<
	typeof syncConsentToMparticle_
>;
const mparticleConsentNeedsSync =
	mparticleConsentNeedsSync_ as jest.MockedFunction<
		typeof mparticleConsentNeedsSync_
	>;
const markMparticleConsentSynced =
	markMparticleConsentSynced_ as jest.MockedFunction<
		typeof markMparticleConsentSynced_
	>;

const mockConsentState = {} as unknown as ConsentState;

const fireConsentChange = async (state: ConsentState = mockConsentState) => {
	if (!capturedConsentCallback) {
		throw new Error('onConsentChange callback was never registered');
	}
	await capturedConsentCallback(state);
};

beforeEach(() => {
	jest.clearAllMocks();
	capturedConsentCallback = undefined;

	// Default: sync is needed
	mparticleConsentNeedsSync.mockReturnValue(true);

	// Default: user is signed in
	getAuthStatus.mockResolvedValue({
		kind: 'SignedIn',
		accessToken: { accessToken: 'test-access-token' },
		idToken: {},
	} as unknown as AuthStatus);

	// Default: bwid cookie is present
	mockGetCookie.mockReturnValue('test-browser-id');

	// Default: user has consented
	mockGetConsentFor.mockReturnValue(true);

	// Default: API call succeeds
	syncConsentToMparticle.mockResolvedValue(undefined);
});

describe('syncMparticleConsent', () => {
	describe('when user is signed out', () => {
		it('does not call the API', async () => {
			getAuthStatus.mockResolvedValue({
				kind: 'SignedOut',
			} as AuthStatus);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).not.toHaveBeenCalled();
		});
	});

	describe('when the staleness cookie is present (already synced recently)', () => {
		it('does not call the API', async () => {
			mparticleConsentNeedsSync.mockReturnValue(false);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).not.toHaveBeenCalled();
		});
	});

	describe('when the bwid cookie is absent', () => {
		it('does not call the API', async () => {
			mockGetCookie.mockReturnValue(null);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).not.toHaveBeenCalled();
		});
	});

	describe('when user is signed in, needs sync, and bwid is present', () => {
		it('calls syncConsentToMparticle with the correct arguments (consented: true)', async () => {
			mockGetConsentFor.mockReturnValue(true);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).toHaveBeenCalledTimes(1);
			expect(syncConsentToMparticle).toHaveBeenCalledWith(
				expect.objectContaining({ kind: 'SignedIn' }),
				'test-browser-id',
				true,
				'jest-page-view-id',
			);
		});

		it('passes consented: false when the user has not consented', async () => {
			mockGetConsentFor.mockReturnValue(false);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).toHaveBeenCalledWith(
				expect.anything(),
				expect.anything(),
				false,
				expect.anything(),
			);
		});

		it('uses the correct consent purpose key', async () => {
			syncMparticleConsent();
			await fireConsentChange(mockConsentState);

			expect(mockGetConsentFor).toHaveBeenCalledWith(
				MPARTICLE_CONSENT_PURPOSE,
				mockConsentState,
			);
		});

		it('marks the sync cookie after a successful sync', async () => {
			syncMparticleConsent();
			await fireConsentChange();

			expect(markMparticleConsentSynced).toHaveBeenCalledTimes(1);
		});

		it('does not mark the sync cookie when the API call fails', async () => {
			syncConsentToMparticle.mockRejectedValue(
				new Error('mParticle consent sync failed'),
			);

			syncMparticleConsent();
			await expect(fireConsentChange()).rejects.toThrow(
				'mParticle consent sync failed',
			);

			expect(markMparticleConsentSynced).not.toHaveBeenCalled();
		});
	});
});
