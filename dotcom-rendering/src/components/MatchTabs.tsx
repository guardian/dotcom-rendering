import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { headline, space } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { palette as themePalette } from '../palette';
import type { Palette } from '../types/palette';

type Props = {
	minByMinUrl?: string;
	reportUrl?: string;
	format: ArticleFormat;
};

const thinGreySolid = (palette: Palette) =>
	`1px solid ${palette.border.matchTab}`;

const GreyBorder = ({ palette }: { palette: Palette }) => (
	<div
		css={css`
			border-left: ${thinGreySolid(palette)};
			margin-left: ${space[1]}px;
			width: ${space[2]}px;
		`}
	/>
);

const tabsContainer = (palette: Palette) => css`
	display: flex;
	position: relative;
	border-bottom: ${thinGreySolid(palette)};
`;

const tab = (palette: Palette) => css`
	flex-basis: 50%;
	height: 40px;
	border-top: 3px solid ${palette.border.matchTab};
`;

const activeTab = (palette: Palette) => css`
	border-top: 3px solid ${palette.border.activeMatchTab};
`;

const tabLink = (palette: Palette) => css`
	color: ${palette.border.activeMatchTab};
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

export const MatchTabs = ({ minByMinUrl, reportUrl, format }: Props) => {
	const palette = decidePalette(format);

	return (
		<div>
			<ul css={tabsContainer(palette)}>
				<li
					css={[
						tab(palette),
						format.design === ArticleDesign.MatchReport &&
							activeTab(palette),
					]}
				>
					<a
						href={reportUrl}
						data-link-name="report"
						css={tabLink(palette)}
					>
						<span css={tabLabel}>Report</span>
					</a>
				</li>
				<GreyBorder palette={palette} />
				<li
					css={[
						tab(palette),
						(format.design === ArticleDesign.DeadBlog ||
							format.design === ArticleDesign.LiveBlog) &&
							activeTab(palette),
					]}
				>
					<a
						href={minByMinUrl}
						data-link-name="Min-by-min"
						css={tabLink(palette)}
					>
						<span css={tabLabel}>Min-by-min</span>
					</a>
				</li>
			</ul>
		</div>
	);
};
