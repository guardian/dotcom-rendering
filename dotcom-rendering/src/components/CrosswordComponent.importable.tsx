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
	FocusedClue,
	gridWidth,
}) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: ${space[4]}px;
				${from.phablet} {
					flex-direction: row;
				}
			`}
		>
			<AnagramHelper />
			<div
				css={css`
					flex-basis: ${gridWidth}px;
				`}
			>
				<FocusedClue
					additionalCss={css`
						max-width: ${gridWidth}px;
						${from.phablet} {
							display: none;
						}
					`}
				/>
				<Grid />
				<div
					data-print-layout="hide"
					css={css`
						max-width: ${gridWidth}px;
					`}
				>
					<FocusedClue
						additionalCss={css`
							${from.phablet} {
								display: none;
							}
						`}
					/>
					<Controls />
					<div
						css={css`
							${textSansItalic12};
						`}
					>
						<SavedMessage />
					</div>
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
					min-width: 200px;
					${from.phablet} {
						max-height: ${gridWidth + 100}px;
						overflow: auto;
					}
					${from.desktop} {
						max-height: none;
						overflow: visible;
					}
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
