import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import type { ComponentProps } from 'react';
import { getPuzzleIntcmp } from '../lib/puzzlesAcquisition';
import { renderInModalRoot, usePuzzleAccess } from '../lib/usePuzzleAccess';
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

const placeholderStyles = css`
	background-color: ${sourcePalette.neutral[97]};
`;

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
	const { view, authState } = usePuzzleAccess({
		requiresSubscription,
		ajaxUrl,
		puzzleId,
		puzzleDate,
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
						intcmp={getPuzzleIntcmp(iframeProps.puzzleConfig.slug)}
						isSignedIn={authState?.reader.isSignedIn}
						returnToArchivePath={returnToArchivePath}
					/>,
				)}
		</>
	);
};
