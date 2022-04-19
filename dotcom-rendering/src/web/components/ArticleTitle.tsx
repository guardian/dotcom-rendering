import { css } from '@emotion/react';

import { from, textSans, until } from '@guardian/source-foundations';
import { ArticleDisplay, ArticleDesign } from '@guardian/libs';
import { Badge } from './Badge';
import { SeriesSectionLink } from './SeriesSectionLink';
import { Island } from './Island';
import { PulsingDot } from './PulsingDot.importable';
import { decidePalette } from '../lib/decidePalette';

type Props = {
	format: ArticleFormat;
	tags: TagType[];
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
	badge?: BadgeType;
	isMatch?: boolean;
};

const sectionStyles = css`
	padding-top: 8px;
	display: flex;
	flex-direction: row;
	${from.leftCol} {
		flex-direction: column;
	}
`;

const titleBadgeWrapper = css`
	margin-bottom: 6px;
	margin-top: 6px;
	${until.leftCol} {
		display: flex;
		margin-right: 10px;
	}
`;

const badgeContainer = css`
	display: flex;
	padding-top: 3px;
	padding-bottom: 6px;
`;

const marginTop = css`
	margin-top: 6px;
`;

const immersiveMargins = css`
	max-width: 400px;
	margin-bottom: 4px;
	/*
        Make sure we vertically align the title font with the body font
    */
	${from.tablet} {
		margin-left: 16px;
	}
	${from.leftCol} {
		margin-left: 25px;
	}
`;

const livePulseIconStyles = (palette: Palette) => css`
	color: ${palette.text.seriesTitle};
	${textSans.xxsmall({ fontWeight: 'bold' })}
	padding-top: 0.25em;
	${from.desktop} {
		display: none;
	}
`;

export const ArticleTitle = ({
	format,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	badge,
	isMatch,
}: Props) => {
	const palette = decidePalette(format);
	return (
		<div css={[sectionStyles, badge && badgeContainer]}>
			{format.design === ArticleDesign.LiveBlog && (
				<span css={livePulseIconStyles(palette)}>
					<Island deferUntil="idle">
						<PulsingDot />
					</Island>
				</span>
			)}
			{badge && format.display !== ArticleDisplay.Immersive && (
				<div css={titleBadgeWrapper}>
					<Badge
						imageUrl={badge.imageUrl}
						seriesTag={badge.seriesTag}
					/>
				</div>
			)}
			<div
				css={[
					badge && marginTop,
					format.display === ArticleDisplay.Immersive &&
						format.design !== ArticleDesign.PrintShop &&
						immersiveMargins,
				]}
			>
				<SeriesSectionLink
					format={format}
					tags={tags}
					sectionLabel={sectionLabel}
					sectionUrl={sectionUrl}
					guardianBaseURL={guardianBaseURL}
					badge={badge}
					isMatch={isMatch}
				/>
			</div>
		</div>
	);
};
