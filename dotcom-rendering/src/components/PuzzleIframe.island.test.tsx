import { act, render, screen, waitFor } from '@testing-library/react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import { buildPuzzleIframeSrc, PuzzleIframe } from './PuzzleIframe.island';

jest.mock('../lib/identity', () => ({
	getAuthStatus: jest.fn(),
	subscribeToAuthStateChange: jest.fn(),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);
const mockedSubscribeToAuthStateChange = jest.mocked(
	subscribeToAuthStateChange,
);

const signedIn = (legacyIdentityId: string) => ({
	kind: 'SignedIn' as const,
	accessToken: {} as never,
	idToken: {
		claims: { legacy_identity_id: legacyIdentityId },
	} as never,
});

const signedOut = () => ({ kind: 'SignedOut' as const });

describe('buildPuzzleIframeSrc', () => {
	it('returns the src unchanged when there is no signed-in user', () => {
		expect(
			buildPuzzleIframeSrc('https://example.com/puzzle', undefined),
		).toBe('https://example.com/puzzle');
	});

	it('appends userId as a query param when the src has none', () => {
		expect(
			buildPuzzleIframeSrc('https://example.com/puzzle', 'abc123'),
		).toBe('https://example.com/puzzle?userId=abc123');
	});

	it('preserves existing query params when appending userId', () => {
		expect(
			buildPuzzleIframeSrc(
				'https://example.com/puzzle?set=guardian-sudoku-easy&embed=1',
				'abc123',
			),
		).toBe(
			'https://example.com/puzzle?set=guardian-sudoku-easy&embed=1&userId=abc123',
		);
	});

	it('returns the src unchanged if it cannot be parsed as an absolute URL', () => {
		expect(buildPuzzleIframeSrc('not-a-url', 'abc123')).toBe('not-a-url');
	});
});

describe('PuzzleIframe', () => {
	let unsubscribe: jest.Mock;

	beforeEach(() => {
		jest.resetAllMocks();
		unsubscribe = jest.fn();
		mockedSubscribeToAuthStateChange.mockReturnValue(unsubscribe);
	});

	it('renders the iframe with the plain src while signed out', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		render(
			<PuzzleIframe src="https://example.com/puzzle" title="Puzzle" />,
		);

		const iframe = await screen.findByTitle('Puzzle');
		await waitFor(() =>
			expect(iframe).toHaveAttribute('src', 'https://example.com/puzzle'),
		);
	});

	it('adds the userId query param once signed in', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));

		render(
			<PuzzleIframe src="https://example.com/puzzle" title="Puzzle" />,
		);

		const iframe = await screen.findByTitle('Puzzle');
		await waitFor(() =>
			expect(iframe).toHaveAttribute(
				'src',
				'https://example.com/puzzle?userId=user-123',
			),
		);
	});

	it('posts the user context to the iframe once loaded', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn('user-123'));

		render(
			<PuzzleIframe src="https://example.com/puzzle" title="Puzzle" />,
		);

		const iframe = await screen.findByTitle<HTMLIFrameElement>('Puzzle');
		const postMessage = jest.fn();
		Object.defineProperty(iframe, 'contentWindow', {
			value: { postMessage },
			configurable: true,
		});

		await act(async () => {
			iframe.dispatchEvent(new Event('load'));
		});

		expect(postMessage).toHaveBeenCalledWith(
			{ type: 'guardian-puzzle-user', userId: 'user-123' },
			'*',
		);
	});

	it('subscribes to auth state changes and updates the src if the user signs out', async () => {
		mockedGetAuthStatus.mockResolvedValueOnce(signedIn('user-123'));

		render(
			<PuzzleIframe src="https://example.com/puzzle" title="Puzzle" />,
		);

		const iframe = await screen.findByTitle('Puzzle');
		await waitFor(() =>
			expect(iframe).toHaveAttribute(
				'src',
				'https://example.com/puzzle?userId=user-123',
			),
		);

		expect(mockedSubscribeToAuthStateChange).toHaveBeenCalledTimes(1);
		const onAuthStateChange =
			mockedSubscribeToAuthStateChange.mock.calls[0]![0];

		mockedGetAuthStatus.mockResolvedValueOnce(signedOut());
		await act(async () => {
			onAuthStateChange();
		});

		await waitFor(() =>
			expect(iframe).toHaveAttribute('src', 'https://example.com/puzzle'),
		);
	});

	it('unsubscribes from auth state changes on unmount', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut());

		const { unmount } = render(
			<PuzzleIframe src="https://example.com/puzzle" title="Puzzle" />,
		);

		await screen.findByTitle('Puzzle');
		unmount();

		expect(unsubscribe).toHaveBeenCalledTimes(1);
	});
});
