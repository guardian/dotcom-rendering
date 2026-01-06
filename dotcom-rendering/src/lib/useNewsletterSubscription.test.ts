import { renderHook, waitFor } from '@testing-library/react';
import {
	clearSubscriptionCache,
	getCachedSubscriptions,
	setCachedSubscriptions,
} from './newsletterSubscriptionCache';
import { useAuthStatus } from './useAuthStatus';
import { useNewsletterSubscription } from './useNewsletterSubscription';

// Mock the useAuthStatus hook
jest.mock('./useAuthStatus', () => ({
	useAuthStatus: jest.fn(),
}));

// Mock the identity module for getOptionsHeaders
jest.mock('./identity', () => ({
	getOptionsHeaders: jest.fn(() => ({
		headers: {
			Authorization: 'Bearer mock-token',
			'X-GU-IS-OAUTH': 'true',
		},
	})),
}));

const mockUseAuthStatus = useAuthStatus as jest.MockedFunction<
	typeof useAuthStatus
>;

const idTokenMock = {
	claims: {
		sub: 'mock-user-id',
	},
};

describe('useNewsletterSubscription', () => {
	const mockIdApiUrl = 'https://idapi.theguardian.com';
	const mockNewsletterId = 4147;

	beforeEach(() => {
		jest.clearAllMocks();
		global.fetch = jest.fn();
		clearSubscriptionCache();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('when feature flag is disabled (enableCheck = false)', () => {
		it('should return false immediately without making API call', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: {} as never,
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(
					mockNewsletterId,
					mockIdApiUrl,
					false,
				),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(global.fetch).not.toHaveBeenCalled();
		});
	});

	describe('when feature flag is enabled (enableCheck = true)', () => {
		it('should return undefined while auth status is pending', () => {
			mockUseAuthStatus.mockReturnValue({ kind: 'Pending' });

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl, true),
			);

			expect(result.current).toBeUndefined();
			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('should return false when user is signed out', async () => {
			mockUseAuthStatus.mockReturnValue({ kind: 'SignedOut' });

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl, true),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('should return false when idApiUrl is undefined', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, undefined, true),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('should return true when user is subscribed to the newsletter', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					result: {
						subscriptions: [
							{ listId: '1234' },
							{ listId: String(mockNewsletterId) },
						],
					},
				}),
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl, true),
			);

			await waitFor(() => {
				expect(result.current).toBe(true);
			});
		});

		it('should return false when user is not subscribed to the newsletter', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					result: {
						subscriptions: [{ listId: '1234' }, { listId: '5678' }],
					},
				}),
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl, true),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});
		});

		it('should return false when API returns non-ok response', async () => {
			const sentryReportErrorMock = jest.fn();
			window.guardian = {
				modules: {
					sentry: {
						reportError: sentryReportErrorMock,
					},
				},
			} as unknown as typeof window.guardian;

			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl, true),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(sentryReportErrorMock).toHaveBeenCalledWith(
				expect.any(Error),
				'errors-fetching-newsletters',
			);
		});

		it('should return false when fetch throws an error', async () => {
			const sentryReportErrorMock = jest.fn();
			window.guardian = {
				modules: {
					sentry: {
						reportError: sentryReportErrorMock,
					},
				},
			} as unknown as typeof window.guardian;

			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error('Network error'),
			);

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl, true),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(sentryReportErrorMock).toHaveBeenCalledWith(
				expect.any(Error),
				'errors-fetching-newsletters',
			);
		});
	});

	describe('default behavior (enableCheck defaults to true)', () => {
		it('should return false when API returns non-ok response', async () => {
			const sentryReportErrorMock = jest.fn();
			window.guardian = {
				modules: {
					sentry: {
						reportError: sentryReportErrorMock,
					},
				},
			} as unknown as typeof window.guardian;

			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: false,
				status: 401,
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(sentryReportErrorMock).toHaveBeenCalledWith(
				expect.any(Error),
				'errors-fetching-newsletters',
			);
		});

		it('should return false when fetch throws an error', async () => {
			const sentryReportErrorMock = jest.fn();
			window.guardian = {
				modules: {
					sentry: {
						reportError: sentryReportErrorMock,
					},
				},
			} as unknown as typeof window.guardian;

			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockRejectedValueOnce(
				new Error('Network error'),
			);

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			expect(sentryReportErrorMock).toHaveBeenCalledWith(
				expect.any(Error),
				'errors-fetching-newsletters',
			);
		});
	});

	describe('newsletter subscription data caching', () => {
		it('should fetch from API when no cache exists', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					result: {
						subscriptions: [
							{ listId: '1234' },
							{ listId: String(mockNewsletterId) },
						],
					},
				}),
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(true);
			});

			expect(global.fetch).toHaveBeenCalledTimes(1);
		});

		it('should use cache when it exists and includes the newsletter', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			// Set up cache with newsletter subscriptions including the one we're checking
			setCachedSubscriptions(
				[1234, mockNewsletterId, 5678],
				'mock-user-id',
			);

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(true);
			});

			// Should NOT call fetch when cache is available
			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('should use cache when it exists but does not include the newsletter', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			// Set up cache with newsletter subscriptions NOT including the one we're checking
			setCachedSubscriptions([1234, 5678, 9999], 'mock-user-id');

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			// Should NOT call fetch when cache is available
			expect(global.fetch).not.toHaveBeenCalled();
		});

		it('should invalidate cache and fetch when user ID changes', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			// Set up cache with a different user ID
			setCachedSubscriptions([mockNewsletterId], 'different-user-id');

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					result: {
						subscriptions: [
							{ listId: '1234' },
							{ listId: String(mockNewsletterId) },
						],
					},
				}),
			});

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(true);
			});

			// Should call fetch because user ID doesn't match
			expect(global.fetch).toHaveBeenCalledTimes(1);

			// Verify cache was overridden with new user's data
			const cache = getCachedSubscriptions();
			expect(cache?.userId).toBe('mock-user-id');
			expect(cache?.listIds).toEqual([1234, mockNewsletterId]);
		});

		it('should clear cache when user signs out', async () => {
			// First, set up cache
			setCachedSubscriptions([mockNewsletterId], 'mock-user-id');

			mockUseAuthStatus.mockReturnValue({ kind: 'SignedOut' });

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});

			// Verify cache was cleared by checking that a subsequent signed-in request fetches
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: idTokenMock as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					result: {
						subscriptions: [{ listId: String(mockNewsletterId) }],
					},
				}),
			});

			const { result: result2 } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result2.current).toBe(true);
			});

			// Should have called fetch because cache was cleared
			expect(global.fetch).toHaveBeenCalledTimes(1);
		});
	});
});
