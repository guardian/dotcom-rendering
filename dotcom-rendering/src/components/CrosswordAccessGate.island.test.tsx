import '@testing-library/jest-dom';
import type { CrosswordProps } from '@guardian/react-crossword';
import { act, render, screen, waitFor } from '@testing-library/react';
import { getAdFreeCookie } from '../client/userFeatures/cookies/adFree';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import type * as PuzzleAccess from '../lib/puzzleAccess';
import { fetchPuzzleAccess } from '../lib/puzzleAccess';
import { CrosswordAccessGate } from './CrosswordAccessGate.island';

jest.mock('../lib/identity', () => ({
	getAuthStatus: jest.fn(),
	subscribeToAuthStateChange: jest.fn(() => () => undefined),
}));
jest.mock('../client/userFeatures/cookies/adFree', () => ({
	getAdFreeCookie: jest.fn(),
}));
jest.mock('../lib/puzzleAccess', () => ({
	...jest.requireActual<typeof PuzzleAccess>('../lib/puzzleAccess'),
	fetchPuzzleAccess: jest.fn(),
}));
jest.mock('./CrosswordComponent.island', () => ({
	CrosswordComponent: ({ canRenderAds }: { canRenderAds: boolean }) => (
		<div data-testid="board" data-can-render-ads={String(canRenderAds)} />
	),
}));
jest.mock('./UnlockPremiumPuzzlesModal', () => ({
	UnlockPremiumPuzzlesModal: ({ isSignedIn }: { isSignedIn?: boolean }) => (
		<div data-testid="modal" data-signed-in={String(isSignedIn)} />
	),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);
const mockedSubscribeToAuthStateChange = jest.mocked(
	subscribeToAuthStateChange,
);
const mockedGetAdFreeCookie = jest.mocked(getAdFreeCookie);
const mockedFetchPuzzleAccess = jest.mocked(fetchPuzzleAccess);

const signedIn = {
	kind: 'SignedIn',
	accessToken: { accessToken: 'token' },
	idToken: { claims: { legacy_identity_id: '123' } },
} as unknown as Awaited<ReturnType<typeof getAuthStatus>>;

const signedOut = { kind: 'SignedOut' } as const;

const crossword = (crosswordType: string) =>
	({
		crosswordType,
		number: 28000,
		date: Date.UTC(2020, 0, 1),
	}) as unknown as CrosswordProps['data'];

const renderGate = (crosswordType = 'quick') =>
	render(
		<CrosswordAccessGate
			data={crossword(crosswordType)}
			ajaxUrl="https://ajax.example.com"
			idUrl="https://profile.theguardian.com"
			returnToArchivePath="/puzzles-and-games/crosswords/archive"
		/>,
	);

describe('CrosswordAccessGate', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedGetAdFreeCookie.mockReturnValue(null);
		mockedSubscribeToAuthStateChange.mockReturnValue(() => undefined);
	});

	it('shows the modal to a signed out reader, without asking and without the board', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut);
		renderGate();
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
		expect(await screen.findByTestId('modal')).toHaveAttribute(
			'data-signed-in',
			'false',
		);
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
		expect(mockedFetchPuzzleAccess).not.toHaveBeenCalled();
	});

	it('asks about the crossword by its series qualified id and its UTC date', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('granted');
		renderGate('quick');

		await waitFor(() =>
			expect(mockedFetchPuzzleAccess).toHaveBeenCalledWith(
				expect.objectContaining({
					baseUrl: 'https://ajax.example.com',
					puzzleId: 'guardian-crossword-quick-28000',
					puzzleDate: '2020-01-01',
				}),
			),
		);
	});

	it('shows the board, without ads, to a reader who has access', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('granted');
		renderGate();

		expect(await screen.findByTestId('board')).toHaveAttribute(
			'data-can-render-ads',
			'false',
		);
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('shows the modal to a signed in reader without the hint who is denied', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('denied');
		renderGate();

		expect(await screen.findByTestId('modal')).toHaveAttribute(
			'data-signed-in',
			'true',
		);
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
	});

	it('blocks a signed in reader without the hint when the check fails', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('failed');
		renderGate();

		expect(await screen.findByTestId('modal')).toBeInTheDocument();
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
	});

	it('never gates a series the Puzzles API does not know', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut);
		renderGate('everyman');
		await act(() => Promise.resolve());

		expect(screen.getByTestId('board')).toBeInTheDocument();
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
		expect(mockedFetchPuzzleAccess).not.toHaveBeenCalled();
	});
});
