import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { useState } from 'react';
import { MostViewedFooterItem } from './MostViewedFooterItem';

const gridList = (expandedState: boolean) => {
	return css`
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1;
		grid-template-rows: ${expandedState
			? `repeat(10, 1fr)`
			: `repeat(5, 1fr)`};
		height: 100%;
	`;
};

type Props = {
	tab: TrailTabType;
	expanded?: boolean;
};

export const MostViewedExpandableCol = ({ tab, expanded = false }: Props) => {
	const [colExpanded, setColExpanded] = useState<boolean>(false);
	const expandedState = colExpanded || expanded;
	const trails = expandedState
		? tab.trails.slice(0, 10)
		: tab.trails.slice(0, 5);

	return (
		<div>
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
					display: block;
					${from.tablet} {
						display: none;
					}
				`}
				type="button"
				onClick={() => {
					setColExpanded(!colExpanded);
				}}
			>
				see more, per column
			</button>
		</div>
	);
};
