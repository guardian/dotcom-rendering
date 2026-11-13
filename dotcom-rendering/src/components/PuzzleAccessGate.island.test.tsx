import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { getAdFreeCookie } from '../client/userFeatures/cookies/adFree';
import { getAuthStatus } from '../lib/identity';
import type * as PuzzleAccess from '../lib/puzzleAccess';
import { fetchPuzzleAccess } from '../lib/puzzleAccess';
import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import { PuzzleAccessGate } from './PuzzleAccessGate.island';

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
jest.mock('./PuzzleIframe.island', () => ({
	PuzzleIframe: () => <div data-testid="board" />,
	buildFrameStyles: () => undefined,
}));
jest.mock('./UnlockPremiumPuzzlesModal', () => ({
	UnlockPremiumPuzzlesModal: ({ isSignedIn }: { isSignedIn?: boolean }) => (
		<div data-testid="modal" data-signed-in={String(isSignedIn)} />
	),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);
const mockedGetAdFreeCookie = jest.mocked(getAdFreeCookie);
const mockedFetchPuzzleAccess = jest.mocked(fetchPuzzleAccess);

const signedIn = {
	kind: 'SignedIn',
	accessToken: { accessToken: 'token' },
	idToken: { claims: { legacy_identity_id: '123' } },
} as unknown as Awaited<ReturnType<typeof getAuthStatus>>;

const signedOut = { kind: 'SignedOut' } as const;

const renderGate = (requiresSubscription?: boolean) =>
	render(
		<PuzzleAccessGate
			puzzleConfig={puzzleConfigs['sudoku-easy']!}
			title="Easy sudoku"
			darkModeAvailable={false}
			puzzleDate="2026-11-01"
			requiresSubscription={requiresSubscription}
			ajaxUrl="https://ajax.example.com"
			puzzleId="guardian-sudoku-easy-20261101"
			idUrl="https://profile.theguardian.com"
			returnToArchivePath="/puzzles-and-games/logic-puzzles/archive"
		/>,
	);

describe('PuzzleAccessGate', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedGetAdFreeCookie.mockReturnValue(null);
	});

	it('shows the board for a free puzzle without asking anything', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut);
		renderGate(false);
		await act(() => Promise.resolve());
		expect(screen.getByTestId('board')).toBeInTheDocument();
		expect(mockedFetchPuzzleAccess).not.toHaveBeenCalled();
	});

	it('treats a puzzle without the flag as free', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut);
		renderGate(undefined);
		await act(() => Promise.resolve());
		expect(screen.getByTestId('board')).toBeInTheDocument();
	});

	it('shows the modal to a signed out reader of a premium puzzle, without asking', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedOut);
		renderGate(true);
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
		expect(await screen.findByTestId('modal')).toHaveAttribute(
			'data-signed-in',
			'false',
		);
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
		expect(mockedFetchPuzzleAccess).not.toHaveBeenCalled();
	});

	it('shows neither board nor modal until a signed in reader without the hint is answered, then the board', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		let answer: (result: 'granted') => void = () => undefined;
		mockedFetchPuzzleAccess.mockReturnValue(
			new Promise((resolve) => {
				answer = resolve;
			}),
		);
		renderGate(true);

		await waitFor(() =>
			expect(mockedFetchPuzzleAccess).toHaveBeenCalledTimes(1),
		);
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

		answer('granted');
		await screen.findByTestId('board');
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('asks about the puzzle by its id and its date', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('granted');
		renderGate(true);

		await waitFor(() =>
			expect(mockedFetchPuzzleAccess).toHaveBeenCalledWith(
				expect.objectContaining({
					baseUrl: 'https://ajax.example.com',
					puzzleId: 'guardian-sudoku-easy-20261101',
					puzzleDate: '2026-11-01',
				}),
			),
		);
	});

	it('shows the modal to a signed in reader without the hint who is denied', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('denied');
		renderGate(true);
		expect(await screen.findByTestId('modal')).toHaveAttribute(
			'data-signed-in',
			'true',
		);
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
	});

	it('shows the board straight away to a signed in ad-free reader, then swaps it for the modal if denied', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedGetAdFreeCookie.mockReturnValue('1');
		let answer: (result: 'denied') => void = () => undefined;
		mockedFetchPuzzleAccess.mockReturnValue(
			new Promise((resolve) => {
				answer = resolve;
			}),
		);
		renderGate(true);

		await screen.findByTestId('board');
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

		answer('denied');
		await screen.findByTestId('modal');
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
	});

	it('keeps the board for a signed in ad-free reader when the check fails', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedGetAdFreeCookie.mockReturnValue('1');
		mockedFetchPuzzleAccess.mockResolvedValue('failed');
		renderGate(true);
		await waitFor(() =>
			expect(mockedFetchPuzzleAccess).toHaveBeenCalledTimes(1),
		);
		await screen.findByTestId('board');
		expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
	});

	it('blocks a signed in reader without the hint when the check fails', async () => {
		mockedGetAuthStatus.mockResolvedValue(signedIn);
		mockedFetchPuzzleAccess.mockResolvedValue('failed');
		renderGate(true);
		await screen.findByTestId('modal');
		expect(screen.queryByTestId('board')).not.toBeInTheDocument();
	});
});
