import { css } from '@emotion/react';
import { border, from, until } from '@guardian/source-foundations';
import { useState } from 'react';
import { MostViewedExpandableCol } from './MostViewedFooterExpandableCol';

const thinGreySolid = `1px solid ${border.secondary}`;

const tabsContainer = css`
	display: flex;
	position: relative;
	border-left: ${thinGreySolid};
	border-right: ${thinGreySolid};
	border-bottom: ${thinGreySolid};

	${until.leftCol} {
		border-top: ${thinGreySolid};
		border-bottom: 0;
	}
`;

const listTab = css`
	font-weight: 700;
	line-height: 1.1;
	background-color: transparent;
	text-transform: capitalize;
	padding: 0 0 0;
	margin-bottom: 16px;
	width: 240px;
	height: 28px;

	${from.tablet} {
		width: 50%;
	}
`;

const firstTab = css`
	border-right: ${thinGreySolid};
`;
const selectedListTabStyles = (palette: Palette) => css`
	/* TODO: Using a pseudo selector here could be faster? */
	box-shadow: inset 0px 4px 0px 0px ${palette.background.mostViewedTab};
	transition: box-shadow 0.3s ease-in-out;
`;

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

// To avoid having to handle multiple ways of reducing the capitalisation styling
const TabHeading = ({ heading }: { heading: string }) => {
	switch (heading.toLowerCase()) {
		case 'most popular':
			return <span>Most popular</span>;
		default:
			return (
				<span
					css={css`
						text-transform: capitalize;
					`}
					// "Across The Guardian" has a non-breaking space entity between "The" and "Guardian - Eg. "Across The&nbsp;Guardian"
					dangerouslySetInnerHTML={{
						__html: heading,
					}}
				/>
			);
	}
};

export const MostViewedFooterGridExpandable = ({ data, palette }: Props) => {
	const [bothExpanded, setBothExpanded] = useState<boolean>(false);

	return (
		<div>
			{Array.isArray(data) && data.length > 1 && (
				<ul css={tabsContainer} role="tablist">
					{data.map((tab: TrailTabType, i: number) => {
						// const isSelected = i === selectedTabIndex;
						const isFirst = i === 0;
						const selectedStyles = selectedListTabStyles(palette);
						return (
							<li
								css={[
									listTab,
									selectedStyles,
									isFirst && firstTab,
								]}
								role="tab"
								// aria-selected={isSelected}
								aria-controls={`tabs-popular-${i}`}
								id={`tabs-popular-${i}-tab`}
								data-cy={`tab-heading-${i}`}
								key={`tabs-popular-${i}-tab`}
								data-link-name={tab.heading}
								data-chromatic="ignore"
							>
								<TabHeading heading={tab.heading} />
							</li>
						);
					})}
				</ul>
			)}
			<div css={gridContainer}>
				{data.map((tab: TrailTabType, i: number) => (
					<MostViewedExpandableCol
						key={`tabs-popular-${i}`}
						tab={tab}
						expanded={bothExpanded}
					/>
				))}
			</div>
			<button
				css={css`
					display: block;
					${until.tablet} {
						display: none;
					}
				`}
				type="button"
				onClick={() => setBothExpanded(!bothExpanded)}
			>
				expand both
			</button>
		</div>
	);
};
