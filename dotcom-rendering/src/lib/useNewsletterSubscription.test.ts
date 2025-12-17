import { renderHook, waitFor } from '@testing-library/react';
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

describe('useNewsletterSubscription', () => {
	const mockIdApiUrl = 'https://idapi.theguardian.com';
	const mockNewsletterId = 4147;

	beforeEach(() => {
		jest.clearAllMocks();
		global.fetch = jest.fn();
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
				idToken: {} as never,
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
				idToken: {} as never,
			});

			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					result: {
						subscriptions: [
							{ listId: '1234' },
							{ listId: String(mockNewsletterId) },
							{ listId: '5678' },
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

			expect(global.fetch).toHaveBeenCalledWith(
				`${mockIdApiUrl}/users/me/newsletters`,
				expect.objectContaining({
					method: 'GET',
					credentials: 'include',
				}),
			);
		});

		it('should return false when user is not subscribed to the newsletter', async () => {
			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: {} as never,
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
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation(() => {});

			mockUseAuthStatus.mockReturnValue({
				kind: 'SignedIn',
				accessToken: {} as never,
				idToken: {} as never,
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

			expect(consoleSpy).toHaveBeenCalledWith(
				'Failed to fetch user newsletters',
			);

			consoleSpy.mockRestore();
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
				idToken: {} as never,
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

	describe('default behavior (enableCheck not specified)', () => {
		it('should default to enabled and check subscription', async () => {
			mockUseAuthStatus.mockReturnValue({ kind: 'SignedOut' });

			const { result } = renderHook(() =>
				useNewsletterSubscription(mockNewsletterId, mockIdApiUrl),
			);

			await waitFor(() => {
				expect(result.current).toBe(false);
			});
		});
	});
});
