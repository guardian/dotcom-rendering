import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import {
	type ComponentProps,
	type ReactNode,
	useEffect,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getAdFreeCookie } from '../client/userFeatures/cookies/adFree';
import {
	type AuthStatus,
	getAuthStatus,
	subscribeToAuthStateChange,
} from '../lib/identity';
import {
	fetchPuzzleAccess,
	getPuzzleAccessView,
	PUZZLE_MODAL_ROOT_ID,
	type PuzzleAccessCheckResult,
	type PuzzleReader,
} from '../lib/puzzleAccess';
import { buildFrameStyles, PuzzleIframe } from './PuzzleIframe.island';
import { UnlockPremiumPuzzlesModal } from './UnlockPremiumPuzzlesModal';

type Props = ComponentProps<typeof PuzzleIframe> &
	Pick<
		ComponentProps<typeof UnlockPremiumPuzzlesModal>,
		'idUrl' | 'returnToArchivePath'
	> & {
		/** `instance.requiresSubscription`. Absent means the puzzle is free. */
		requiresSubscription?: boolean;
		/** `config.ajaxUrl`: the uncached host the access check is sent to. */
		ajaxUrl: string;
		/**
		 * The Puzzles API id, used to ask about this puzzle's access. The
		 * puzzle's date (`puzzleDate`, already a prop of the iframe) is sent
		 * with it so the API can find the puzzle.
		 */
		puzzleId?: string;
	};

type AuthState = { authStatus: AuthStatus; reader: PuzzleReader };

type AccessCheck = { forAuthState: AuthState; result: PuzzleAccessCheckResult };

const placeholderStyles = css`
	background-color: ${sourcePalette.neutral[97]};
`;

/**
 * The modal is absolutely positioned, so it has to live inside the page
 * layout's positioned `<main>` to cover the whole page content. Falls back to
 * rendering in place when it is not found.
 */
const renderInModalRoot = (modal: ReactNode) => {
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

		const refresh = () => {
			void getAuthStatus().then((authStatus) => {
				if (!isMounted) return;
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
 * Decides whether the reader may play, and shows the game or the "unlock
 * premium puzzles" modal accordingly. See `getPuzzleAccessView` for the exact
 * rules.
 *
 * Free puzzles render the game with no extra work. Premium puzzles can only be
 * judged in the browser (the HTML is cached and shared, so it cannot hold
 * anything about the reader): the reader's auth state is read first, and a
 * signed in reader is then checked against the uncached access endpoint. This
 * runs in parallel with the wait `PuzzleIframe` already does for the reader's
 * identity, so for a subscriber it adds no delay.
 *
 * This is a soft paywall: the game URL is in the page source for anyone to
 * read.
 */
export const PuzzleAccessGate = ({
	requiresSubscription = false,
	ajaxUrl,
	puzzleId,
	puzzleDate,
	idUrl,
	returnToArchivePath,
	...iframeProps
}: Props) => {
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

	if (view === 'board') {
		return <PuzzleIframe {...iframeProps} puzzleDate={puzzleDate} />;
	}

	return (
		<>
			<div
				css={[
					buildFrameStyles(iframeProps.puzzleConfig.slug),
					placeholderStyles,
				]}
			/>
			{view === 'modal' &&
				renderInModalRoot(
					<UnlockPremiumPuzzlesModal
						idUrl={idUrl}
						isSignedIn={authState?.reader.isSignedIn}
						returnToArchivePath={returnToArchivePath}
					/>,
				)}
		</>
	);
};
