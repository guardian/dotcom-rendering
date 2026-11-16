import { css } from '@emotion/react';
import type { CrosswordProps } from '@guardian/react-crossword';
import { palette as sourcePalette } from '@guardian/source/foundations';
import type { ComponentProps } from 'react';
import { getCrosswordAccessIdentity } from '../lib/puzzleProgress/adapters/crossword';
import { renderInModalRoot, usePuzzleAccess } from '../lib/usePuzzleAccess';
import { CrosswordComponent } from './CrosswordComponent.island';
import { UnlockPremiumPuzzlesModal } from './UnlockPremiumPuzzlesModal';

type Props = Pick<
	ComponentProps<typeof UnlockPremiumPuzzlesModal>,
	'idUrl' | 'returnToArchivePath'
> & {
	data: CrosswordProps['data'];
	/** `config.ajaxUrl`: the uncached host the access check is sent to. */
	ajaxUrl: string;
};

const placeholderStyles = css`
	background-color: ${sourcePalette.neutral[97]};
	width: 100%;
	min-height: 480px;
`;

/**
 * The premium crossword's counterpart of `PuzzleAccessGate`: the same rules
 * (`usePuzzleAccess`) and the same modal, around the crossword instead of an
 * iframe. Only rendered for a premium crossword while puzzles hub v3 is on;
 * every other crossword renders `CrosswordComponent` directly, as before.
 *
 * A crossword of a series the Puzzles API does not know has no identity to
 * check, so it is never gated.
 *
 * This is a soft paywall: the crossword is in the page source for anyone to
 * read. Ads are off for premium crosswords, see `CrosswordLayout`.
 */
export const CrosswordAccessGate = ({
	data,
	ajaxUrl,
	idUrl,
	returnToArchivePath,
}: Props) => {
	const identity = getCrosswordAccessIdentity(data);
	const { view, authState } = usePuzzleAccess({
		requiresSubscription: identity !== undefined,
		ajaxUrl,
		puzzleId: identity?.puzzleId,
		puzzleDate: identity?.puzzleDate,
	});

	if (view === 'board') {
		return <CrosswordComponent data={data} canRenderAds={false} />;
	}

	return (
		<>
			<div css={placeholderStyles} />
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
