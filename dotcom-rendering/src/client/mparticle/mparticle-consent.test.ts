import type { ConsentState } from '@guardian/libs';
import type { AuthStatus } from '../../lib/identity';
import { getAuthStatus as getAuthStatus_ } from '../../lib/identity';
import {
	buildFingerprint as buildFingerprint_,
	markMparticleConsentSynced as markMparticleConsentSynced_,
	markSessionAttempt as markSessionAttempt_,
	mparticleConsentNeedsSync as mparticleConsentNeedsSync_,
	sessionAttemptExists as sessionAttemptExists_,
} from './cookies/mparticleConsentSynced';
import {
	MPARTICLE_CONSENT_PURPOSE,
	syncMparticleConsent,
} from './mparticle-consent';
import { syncConsentToMparticle as syncConsentToMparticle_ } from './mparticleConsentApi';

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
	buildFingerprint: jest.fn(),
	mparticleConsentNeedsSync: jest.fn(),
	sessionAttemptExists: jest.fn(),
	markSessionAttempt: jest.fn(),
	markMparticleConsentSynced: jest.fn(),
}));

const getAuthStatus = getAuthStatus_ as jest.MockedFunction<
	typeof getAuthStatus_
>;
const syncConsentToMparticle = syncConsentToMparticle_ as jest.MockedFunction<
	typeof syncConsentToMparticle_
>;
const buildFingerprint = buildFingerprint_ as jest.MockedFunction<
	typeof buildFingerprint_
>;
const mparticleConsentNeedsSync =
	mparticleConsentNeedsSync_ as jest.MockedFunction<
		typeof mparticleConsentNeedsSync_
	>;
const sessionAttemptExists = sessionAttemptExists_ as jest.MockedFunction<
	typeof sessionAttemptExists_
>;
const markSessionAttempt = markSessionAttempt_ as jest.MockedFunction<
	typeof markSessionAttempt_
>;
const markMparticleConsentSynced =
	markMparticleConsentSynced_ as jest.MockedFunction<
		typeof markMparticleConsentSynced_
	>;

const mockConsentState = {} as unknown as ConsentState;

const signedInAuthStatus: AuthStatus = {
	kind: 'SignedIn',
	accessToken: { accessToken: 'test-access-token' } as never,
	idToken: {} as never,
};

const signedOutAuthStatus: AuthStatus = { kind: 'SignedOut' };

const fireConsentChange = async (
	state: ConsentState = mockConsentState,
): Promise<void> => {
	if (!capturedConsentCallback) {
		throw new Error('onConsentChange callback was never registered');
	}
	await capturedConsentCallback(state);
};

beforeEach(() => {
	jest.clearAllMocks();
	capturedConsentCallback = undefined;

	// Default happy-path setup
	mockGetCookie.mockReturnValue('test-browser-id');
	mockGetConsentFor.mockReturnValue(true);
	getAuthStatus.mockResolvedValue(signedInAuthStatus);
	buildFingerprint.mockReturnValue('signed-in:true');
	mparticleConsentNeedsSync.mockReturnValue(true);
	sessionAttemptExists.mockReturnValue(false);
	syncConsentToMparticle.mockResolvedValue(undefined);
});

describe('syncMparticleConsent', () => {
	describe('when bwid cookie is absent', () => {
		it('does not call the API', async () => {
			mockGetCookie.mockReturnValue(null);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).not.toHaveBeenCalled();
		});
	});

	describe('when consent does not need syncing', () => {
		it('does not call the API', async () => {
			mparticleConsentNeedsSync.mockReturnValue(false);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).not.toHaveBeenCalled();
		});
	});

	describe('when a session attempt already exists for this fingerprint', () => {
		it('does not call the API', async () => {
			sessionAttemptExists.mockReturnValue(true);

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).not.toHaveBeenCalled();
		});
	});

	describe('when all conditions are met (bwid present, needs sync, no session attempt)', () => {
		it('calls markSessionAttempt before the API call', async () => {
			const callOrder: string[] = [];
			markSessionAttempt.mockImplementation(() => {
				callOrder.push('markSessionAttempt');
			});
			syncConsentToMparticle.mockImplementation(async () => {
				callOrder.push('syncConsentToMparticle');
			});

			syncMparticleConsent();
			await fireConsentChange();

			expect(callOrder).toEqual([
				'markSessionAttempt',
				'syncConsentToMparticle',
			]);
		});

		it('calls the API for a signed-in user, passing their auth status', async () => {
			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).toHaveBeenCalledTimes(1);
			expect(syncConsentToMparticle).toHaveBeenCalledWith(
				signedInAuthStatus,
				'test-browser-id',
				true,
				'jest-page-view-id',
			);
		});

		it('calls the API for a signed-out (anonymous) user, passing signed-out auth status', async () => {
			getAuthStatus.mockResolvedValue(signedOutAuthStatus);
			buildFingerprint.mockReturnValue('anonymous:true');

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).toHaveBeenCalledTimes(1);
			expect(syncConsentToMparticle).toHaveBeenCalledWith(
				signedOutAuthStatus,
				'test-browser-id',
				true,
				'jest-page-view-id',
			);
		});

		it('passes consented: false when the user has not consented', async () => {
			mockGetConsentFor.mockReturnValue(false);
			buildFingerprint.mockReturnValue('signed-in:false');

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

		it('calls markSessionAttempt with the computed fingerprint', async () => {
			buildFingerprint.mockReturnValue('signed-in:true');

			syncMparticleConsent();
			await fireConsentChange();

			expect(markSessionAttempt).toHaveBeenCalledWith('signed-in:true');
		});

		it('calls markMparticleConsentSynced with consented and isSignedIn after a successful call', async () => {
			getAuthStatus.mockResolvedValue(signedInAuthStatus);
			mockGetConsentFor.mockReturnValue(true);

			syncMparticleConsent();
			await fireConsentChange();

			expect(markMparticleConsentSynced).toHaveBeenCalledTimes(1);
			expect(markMparticleConsentSynced).toHaveBeenCalledWith(true, true);
		});

		it('does not call markMparticleConsentSynced when the API call fails', async () => {
			syncConsentToMparticle.mockRejectedValue(
				new Error('mParticle consent sync failed'),
			);

			syncMparticleConsent();
			await expect(fireConsentChange()).rejects.toThrow(
				'mParticle consent sync failed',
			);

			expect(markMparticleConsentSynced).not.toHaveBeenCalled();
		});

		it('fires when a previously anonymous user is now signed in with the same consent value', async () => {
			// Scenario: last successful sync was "anonymous:false"
			// Now the user has signed in; consent is still false, but fingerprint changed
			getAuthStatus.mockResolvedValue(signedInAuthStatus);
			mockGetConsentFor.mockReturnValue(false);
			buildFingerprint.mockReturnValue('signed-in:false');
			mparticleConsentNeedsSync.mockReturnValue(true); // "anonymous:false" ≠ "signed-in:false"

			syncMparticleConsent();
			await fireConsentChange();

			expect(syncConsentToMparticle).toHaveBeenCalledWith(
				signedInAuthStatus,
				'test-browser-id',
				false,
				'jest-page-view-id',
			);
		});
	});
});
