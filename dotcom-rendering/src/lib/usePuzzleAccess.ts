import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAdFreeCookie } from '../client/userFeatures/cookies/adFree';
import {
	type AuthStatus,
	getAuthStatus,
	subscribeToAuthStateChange,
} from './identity';
import {
	fetchPuzzleAccess,
	getPuzzleAccessView,
	PUZZLE_MODAL_ROOT_ID,
	type PuzzleAccessCheckResult,
	type PuzzleAccessView,
	type PuzzleReader,
} from './puzzleAccess';

export type AuthState = { authStatus: AuthStatus; reader: PuzzleReader };

type AccessCheck = { forAuthState: AuthState; result: PuzzleAccessCheckResult };

/**
 * The modal is absolutely positioned, so it has to live inside the page
 * layout's positioned `<main>` to cover the whole page content. Falls back to
 * rendering in place when it is not found.
 */
export const renderInModalRoot = (modal: ReactNode): ReactNode => {
	const root = document.getElementById(PUZZLE_MODAL_ROOT_ID);
	return root ? createPortal(modal, root) : modal;
};

/**
 * The reader's auth state, `undefined` until the first check has finished, and
 * kept up to date when the reader signs in or out while on the page.
 */
const useAuthState = (): AuthState | undefined => {
	const [authState, setAuthState] = useState<AuthState | undefined>(
		undefined,
	);

	useEffect(() => {
		let isMounted = true;
		// Lookups can overlap: one runs on mount and another on every auth
		// change, and they can resolve out of order. Only the latest one may set
		// the state, otherwise a slow older lookup (for example "signed in")
		// could overwrite a newer one (for example "signed out").
		let latestLookup = 0;

		const refresh = () => {
			const lookup = ++latestLookup;
			void getAuthStatus().then((authStatus) => {
				if (!isMounted || lookup !== latestLookup) return;
				setAuthState({
					authStatus,
					reader: {
						isSignedIn: authStatus.kind === 'SignedIn',
						hasAdFreeHint: getAdFreeCookie() !== null,
					},
				});
			});
		};

		refresh();
		const unsubscribe = subscribeToAuthStateChange(refresh);

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, []);

	return authState;
};

/**
 * Decides what a puzzle shows the reader: the board, a placeholder while the
 * check runs, or the "unlock premium puzzles" modal. Shared by every gate (the
 * Puzzle Page iframe and the crossword), so they follow exactly the same rules.
 * See `getPuzzleAccessView` for the rules.
 *
 * Free puzzles need no work. Premium puzzles can only be judged in the browser
 * (the HTML is cached and shared, so it cannot hold anything about the
 * reader): the reader's auth state is read first, and a signed in reader is
 * then checked against the uncached access endpoint.
 */
export const usePuzzleAccess = ({
	requiresSubscription,
	ajaxUrl,
	puzzleId,
	puzzleDate,
}: {
	requiresSubscription: boolean;
	ajaxUrl: string;
	puzzleId: string | undefined;
	puzzleDate: string | null | undefined;
}): { view: PuzzleAccessView; authState: AuthState | undefined } => {
	const authState = useAuthState();
	const [check, setCheck] = useState<AccessCheck | undefined>(undefined);

	useEffect(() => {
		if (
			!requiresSubscription ||
			authState?.authStatus.kind !== 'SignedIn'
		) {
			return;
		}

		const controller = new AbortController();
		void fetchPuzzleAccess({
			baseUrl: ajaxUrl,
			puzzleId,
			puzzleDate,
			authStatus: authState.authStatus,
			signal: controller.signal,
		}).then((result) => {
			if (!controller.signal.aborted) {
				setCheck({ forAuthState: authState, result });
			}
		});

		return () => controller.abort();
	}, [requiresSubscription, authState, ajaxUrl, puzzleId, puzzleDate]);

	const view = getPuzzleAccessView({
		requiresSubscription,
		reader: authState?.reader,
		// A result only counts for the auth state it was fetched for
		check: check?.forAuthState === authState ? check?.result : undefined,
	});

	return { view, authState };
};
