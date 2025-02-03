import { css } from '@emotion/react';
import { Crossword as ReactCrossword } from '@guardian/react-crossword-next';
import type { CrosswordProps } from '@guardian/react-crossword-next';
import {
	from,
	headlineBold17,
	space,
	textSans14,
	textSansItalic12,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { palette } from '../palette';

const CluesHeader = memo(({ children }: { children: ReactNode }) => {
	return (
		<div
			css={css`
				${headlineBold17};
				border-top: 1px solid
					${palette('--crossword-clues-header-border-top')};
				border-bottom: 1px dotted
					${palette('--crossword-clues-header-border-bottom')};
				height: 2em;
				margin-bottom: 0.5em;
				text-transform: capitalize;
			`}
		>
			{children}
		</div>
	);
});

const Layout: CrosswordProps['Layout'] = ({
	Grid,
	Clues,
	Controls,
	SavedMessage,
	AnagramHelper,
	StickyClue,
	gridWidth,
}) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: ${space[4]}px;

				${from.leftCol} {
					flex-direction: row;
				}
			`}
		>
			<AnagramHelper />
			<div
				css={css`
					flex-basis: ${gridWidth}px;

					${from.leftCol} {
						position: sticky;
						top: ${space[4]}px;
						align-self: flex-start;
					}
				`}
			>
				<StickyClue
					additionalCss={css`
						${from.leftCol} {
							display: none;
						}
					`}
				/>
				<Grid />
				<Controls />
				<div
					css={css`
						${textSansItalic12};
					`}
				>
					<SavedMessage />
				</div>
			</div>

			<div
				css={css`
					${textSans14};
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: ${space[4]}px;
					align-items: flex-start;

					> * {
						flex: 1;
					}

					${from.wide} {
						flex-direction: row;
					}
				`}
			>
				<Clues direction="across" Header={CluesHeader} />
				<Clues direction="down" Header={CluesHeader} />
			</div>
		</div>
	);
};

export const CrosswordComponent = ({
	data,
}: {
	data: CrosswordProps['data'];
}) => <ReactCrossword data={data} Layout={Layout} />;
