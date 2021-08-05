import { useState } from 'react';
import { css } from '@emotion/react';
import { neutral, border } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';

import { MostViewedFooterItem } from './MostViewedFooterItem';

const thinGreySolid = `1px solid ${border.secondary}`;

const hideList = css`
	display: none;
`;

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
`;

const firstTab = css`
	border-right: ${thinGreySolid};
`;
const selectedListTabStyles = (palette: Palette) => css`
	/* TODO: Using a pseudo selector here could be faster? */
	box-shadow: inset 0px 4px 0px 0px ${palette.background.mostViewedTab};
	transition: box-shadow 0.3s ease-in-out;
`;

const unselectedStyles = css`
	&:hover {
		box-shadow: inset 0px 4px 0px 0px ${neutral[86]};
		transition: box-shadow 0.3s ease-in-out;
	}
`;

const tabButton = css`
	${headline.xxxsmall()};
	margin: 0;
	border: 0;
	background: transparent;
	padding-right: 6px;
	padding-top: 6px;
	text-align: left;
	text-decoration: none;
	font-weight: 600;
	min-height: 36px;
	display: block;
	width: 100%;

	&:hover {
		cursor: pointer;
	}
`;

const gridContainer = css`
	display: grid;
	grid-auto-flow: column;

	/* One column view */
	grid-template-columns: 1fr;
	grid-template-rows: auto auto auto auto auto auto auto auto auto auto;

	/* Two column view */
	${from.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto auto auto auto;
	}

	/* We set left border on the grid container, and then right border on
    the gridItems to prevent borders doubling up */
	border-left: 1px solid ${border.secondary};
`;

type Props = {
	data: TrailTabType[];
	sectionName?: string;
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

export const MostViewedFooterGrid = ({ data, sectionName, palette }: Props) => {
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	return (
		<div>
			{Array.isArray(data) && data.length > 1 && (
				<ul css={tabsContainer} role="tablist">
					{data.map((tab: TrailTabType, i: number) => {
						const isSelected = i === selectedTabIndex;
						const isFirst = i === 0;
						const selectedStyles = selectedListTabStyles(palette);
						return (
							<li
								css={[
									listTab,
									isSelected
										? selectedStyles
										: unselectedStyles,
									isFirst && firstTab,
								]}
								role="tab"
								aria-selected={isSelected}
								aria-controls={`tabs-popular-${i}`}
								id={`tabs-popular-${i}-tab`}
								data-cy={`tab-heading-${i}`}
								key={`tabs-popular-${i}-tab`}
								data-link-name={tab.heading}
							>
								<button
									css={tabButton}
									onClick={() => setSelectedTabIndex(i)}
								>
									<span
										css={css`
											${visuallyHidden};
										`}
									>
										Most viewed{' '}
									</span>

									<TabHeading heading={tab.heading} />
								</button>
							</li>
						);
					})}
				</ul>
			)}
			{data.map((tab: TrailTabType, i: number) => (
				<ol
					css={[gridContainer, i !== selectedTabIndex && hideList]}
					id={`tabs-popular-${i}`}
					data-cy={`tab-body-${i}`}
					key={`tabs-popular-${i}`}
					role="tabpanel"
					aria-labelledby={`tabs-popular-${i}-tab`}
					data-link-name={tab.heading}
					data-testid={tab.heading}
					data-link-context={`most-read/${sectionName}`}
				>
					{(tab.trails || []).map((trail: TrailType, ii: number) => (
						<MostViewedFooterItem
							key={trail.url}
							trail={trail}
							position={ii + 1}
						/>
					))}
				</ol>
			))}
		</div>
	);
};
