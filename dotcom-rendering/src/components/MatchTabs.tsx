import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import { palette as themePalette } from '../palette';

type Props = {
	minByMinUrl?: string;
	reportUrl?: string;
	format: ArticleFormat;
};

const thinGreySolid = `1px solid ${themePalette('--match-tab-border')}`;

const GreyBorder = () => (
	<div
		css={css`
			border-left: ${thinGreySolid};
			margin-left: ${space[1]}px;
			width: ${space[2]}px;
		`}
	/>
);

const tabsContainer = css`
	display: flex;
	position: relative;
	border-bottom: ${thinGreySolid};
`;

const tab = css`
	flex-basis: 50%;
	height: 40px;
	border-top: 3px solid ${themePalette('--match-tab-border')};
`;

const activeTab = css`
	border-top: 3px solid ${themePalette('--match-active-tab-border')};
`;

const tabLink = css`
	color: ${themePalette('--match-active-tab-border')};
	display: block;
	text-decoration: none;
	&:hover {
		background-color: ${themePalette('--article-background')};
	}
`;

const tabLabel = css`
	${headline.xxxsmall()};
	background: transparent;
	padding: 6px 8px 0;
	text-align: left;
	font-weight: 600;
	min-height: 36px;
	display: block;
	width: 100%;
`;

export const MatchTabs = ({ minByMinUrl, reportUrl, format }: Props) => (
	<div>
		<ul css={tabsContainer}>
			<li
				css={[
					tab,
					format.design === ArticleDesign.MatchReport && activeTab,
				]}
			>
				<a href={reportUrl} data-link-name="report" css={tabLink}>
					<span css={tabLabel}>Report</span>
				</a>
			</li>
			<GreyBorder />
			<li
				css={[
					tab,
					(format.design === ArticleDesign.DeadBlog ||
						format.design === ArticleDesign.LiveBlog) &&
						activeTab,
				]}
			>
				<a href={minByMinUrl} data-link-name="Min-by-min" css={tabLink}>
					<span css={tabLabel}>Min-by-min</span>
				</a>
			</li>
		</ul>
	</div>
);
