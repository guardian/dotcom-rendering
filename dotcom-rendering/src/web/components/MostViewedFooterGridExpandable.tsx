import { css } from '@emotion/react';
import {
	border,
	from,
	neutral,
	textSans,
	until,
} from '@guardian/source-foundations';
import { useState } from 'react';
import { MostViewedExpandableCol } from './MostViewedFooterExpandableCol';

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
		<div>
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
					z-index: 1;
					height: 32px;
					background-color: ${neutral[7]};
					border-radius: 1600px;
					color: ${neutral[100]};
					border: none;
					${textSans.small()};
					font-weight: 700;
					padding: 0 15px 0 7px;
					position: absolute;
					display: block;
					${until.tablet} {
						display: none;
					}
				`}
				type="button"
				onClick={() => setBothExpanded(!bothExpanded)}
			>
				{!bothExpanded ? 'Show More' : 'Show Less'}
			</button>
		</div>
	);
};
