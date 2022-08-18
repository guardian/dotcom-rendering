import { css } from '@emotion/react';
import { border, from, until } from '@guardian/source-foundations';
import { useState } from 'react';
import {
	MostViewedExpandableCol,
	sharedButtonStyles,
} from './MostViewedFooterExpandableCol';

const gridContainer = css`
	display: grid;
	grid-auto-flow: column;

	/* One column view */
	grid-template-columns: fr;
	grid-template-rows: auto auto auto auto auto auto auto auto auto auto;

	/* Two column view */
	${from.tablet} {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
	}

	/* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
	border-left: 1px solid ${border.secondary};
`;

type Props = {
	data: TrailTabType[];
	palette: Palette;
};

export const MostViewedFooterGridExpandable = ({ data }: Props) => {
	const [bothExpanded, setBothExpanded] = useState<boolean>(false);

	return (
		<div
			css={css`
				position: relative;
			`}
		>
			<div css={gridContainer}>
				{data.map((tab: TrailTabType, i: number) => (
					<MostViewedExpandableCol
						key={`tabs-popular-${i}`}
						tab={tab}
						expanded={bothExpanded}
						index={i}
					/>
				))}
			</div>
			<button
				css={css`
					${sharedButtonStyles};
					${until.tablet} {
						display: none;
					}
				`}
				type="button"
				onClick={() => setBothExpanded(!bothExpanded)}
			>
				{!bothExpanded ? 'Show All +' : 'Show Fewer -'}
			</button>
		</div>
	);
};
