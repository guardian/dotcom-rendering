import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { palette } from '../palette';
import { BigNumber } from './BigNumber';

/**
 * A tab list is usually rendered above the list items.
 * We reduce CLS for the majority of page views by expecting them to be rendered.
 */
const tabs = css`
	height: 44px;
	border-left: 1px solid var(--article-border);
`;

const listContainer = css`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(10, 70px);
	grid-auto-flow: column;

	${from.mobileLandscape} {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(10, 60px);
	}

	${from.tablet} {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(5, 80px);
	}
`;

const listItem = css`
	position: relative;
	border-top: 1px solid var(--article-border);
	border-left: 1px solid var(--article-border);
	border-right: 1px solid var(--article-border);
`;

const bigNumber = css`
	position: absolute;
	top: 6px;
	left: 10px;
	fill: ${palette('--article-text')};
	svg {
		height: 40px;
	}
`;

export const MostViewedFooterPlaceholder = () => {
	return (
		<>
			<div css={tabs} />
			<ol css={listContainer}>
				{Array.from(Array(10), (_, i) => (
					<li key={i} css={listItem}>
						<span css={bigNumber}>
							<BigNumber index={i + 1} />
						</span>
					</li>
				))}
			</ol>
		</>
	);
};
