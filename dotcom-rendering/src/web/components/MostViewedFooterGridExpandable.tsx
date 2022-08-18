import { css } from '@emotion/react';
import {
	border,
	from,
	headline,
	neutral,
	until,
} from '@guardian/source-foundations';
import { useState } from 'react';
import { sharedButtonStyles } from './MostViewedFooterExpandableCol';
import { MostViewedFooterItem } from './MostViewedFooterItem';

type Props = {
	data: TrailTabType[];
	palette: Palette;
};

const ColumnHeading = ({ heading }: { heading: string }) => {
	switch (heading.toLowerCase()) {
		case 'most popular':
			return <span>Most popular</span>;
		case `across the&nbsp;guardian`:
			return <span>Across The Guardian</span>;
		default:
			return <span>Deeply Read</span>;
	}
};

const thinGreySolid = `1px solid ${border.secondary}`;

const columnHeading = (index: number) => {
	return css`
		${headline.xxxsmall()};
		background: transparent;
		border-bottom: ${thinGreySolid};
		border-left: ${index === 0 ? thinGreySolid : 'none'};
		border-right: ${thinGreySolid};
		color: ${neutral[7]};
		display: block;
		font-weight: 600;
		margin: 0;
		min-height: 36px;
		padding-right: 6px;
		padding-left: 6px;
		padding-top: 6px;
		text-align: left;
		text-decoration: none;
		width: 100%;

		${until.leftCol} {
			border-top: ${thinGreySolid};
			border-bottom: 0;
		}
	`;
};

const gridContainer = css`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	${from.tablet} {
		flex-direction: row;
	}
`;

const item = css`
	${from.tablet} {
		flex-basis: 50%;
	}
`;

const order = (columnIndex: number, trailIndex: number) => {
	// columnIndex 0, 1
	// columnIndex 0 trailIndex 0 => 0
	// columnIndex 1 trailIndex 0 => 1
	// columnIndex 0 trailIndex 1 => 2
	// columnIndex 1 trailIndex 1 => 3
	// columnIndex 0 trailIndex 2 => 4
	// columnIndex 1 trailIndex 2 => 5

	return css`
		${from.tablet} {
			order: ${trailIndex * 2 + columnIndex};
		}
	`;
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
				{data.map((column, index) => {
					const numberShown = bothExpanded ? 10 : 5;
					return (
						<>
							<div
								css={[
									item,
									columnHeading(index),
									order(index, 0),
								]}
							>
								<ColumnHeading heading={column.heading} />
							</div>
							{column.trails
								.slice(0, numberShown)
								.map((trail, i) => {
									return (
										<div css={[item, order(index, i + 1)]}>
											<MostViewedFooterItem
												key={trail.url}
												trail={trail}
												position={i + 1}
											/>
										</div>
									);
								})}
						</>
					);
				})}
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
