import { css } from '@emotion/react';
import { Crossword as ReactCrossword } from '@guardian/react-crossword-next';
import type { CrosswordProps } from '@guardian/react-crossword-next';
import {
	from,
	headlineBold17,
	palette,
	space,
	textSans12,
	textSans14,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import { memo } from 'react';

const CluesHeader = memo(({ children }: { children: ReactNode }) => {
	return (
		<div
			css={css`
				${headlineBold17};
				border-top: 1px solid ${palette.neutral[86]};
				border-bottom: 1px dotted ${palette.neutral[86]};
				background-color: ${palette.neutral[100]};
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
				<Grid />
				<Controls />
				<div
					css={css`
						${textSans12};
						font-style: italic;
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

export const Crossword = (data: CrosswordProps['data']) => (
	<ReactCrossword data={data} Layout={Layout} />
);
