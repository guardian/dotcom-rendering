import { css } from '@emotion/react';
import {
	from,
	until,
	border,
	neutral,
	textSans,
	headline,
} from '@guardian/source-foundations';
import { useState } from 'react';
import { MostViewedFooterItem } from './MostViewedFooterItem';

const thinGreySolid = `1px solid ${border.secondary}`;

export const sharedButtonStyles = css`
	z-index: 1;
	height: 32px;
	background-color: ${neutral[7]};
	border-radius: 1600px;
	color: ${neutral[97]};
	border: none;
	${textSans.small()};
	font-weight: 700;
	padding: 0 15px 0 7px;
	position: absolute;
	cursor: pointer;
`;

const gridList = (expandedState: boolean) => {
	return css`
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1;
		grid-template-rows: ${expandedState
			? `repeat(10, 1fr)`
			: `repeat(5, 1fr)`};
		height: 100%;
		margin-bottom: 100px;
		border-bottom: ${thinGreySolid};
	`;
};

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

type Props = {
	tab: TrailTabType;
	expanded?: boolean;
	index: number;
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

export const MostViewedExpandableCol = ({
	tab,
	expanded = false,
	index,
}: Props) => {
	const [colExpanded, setColExpanded] = useState<boolean>(false);
	const expandedState = colExpanded || expanded;
	const trails = expandedState
		? tab.trails.slice(0, 10)
		: tab.trails.slice(0, 5);

	return (
		<div
			css={css`
				position: relative;
			`}
		>
			<div css={[columnHeading(index)]}>
				<ColumnHeading heading={tab.heading} />
			</div>
			<ol
				css={[gridList(expandedState)]}
				id={`tabs-popular-${tab.heading}`}
				data-cy={`tab-body-${tab.heading}`}
				key={`tabs-popular-${tab.heading}`}
				role="tabpanel"
				aria-labelledby={`tabs-popular-${tab.heading}-tab`}
				data-link-name={tab.heading}
				data-testid={tab.heading}
				data-link-context={`most-read/${tab.heading}`}
			>
				{trails.map((trail: TrailType, ii: number) => {
					return (
						<MostViewedFooterItem
							key={trail.url}
							trail={trail}
							position={ii + 1}
						/>
					);
				})}
			</ol>
			<button
				css={css`
					${sharedButtonStyles}
					${from.tablet} {
						display: none;
					}
				`}
				type="button"
				onClick={() => {
					setColExpanded(!colExpanded);
				}}
			>
				{!colExpanded ? 'Show All +' : 'Show Fewer -'}
			</button>
		</div>
	);
};
