import { css } from '@emotion/react';

import { from, until } from '@guardian/src-foundations/mq';
import { Badge } from '@frontend/web/components/Badge';
import { ArticleDisplay, ArticleDesign } from '@guardian/libs';
import { SeriesSectionLink } from './SeriesSectionLink';
import { palette } from '@guardian/src-foundations';

type Props = {
	format: ArticleFormat;
	palette: Palette;
	tags: TagType[];
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
	badge?: BadgeType;
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
	${from.phablet} {
		max-width: 600px;
	}
	padding-right: 5px;
	//margin-bottom: 4px;
	/*
        Make sure we vertically align the title font with the body font
    */
	${from.tablet} {
		margin-left: 16px;
	}
	${from.leftCol} {
		margin-left: 25px;
	}

	${until.mobileLandscape} {
		margin-right: 39px;
	}
`;

const backgroundColour = (palette: Palette) => css`
	background-color: ${palette.background.seriesTitle};
`;

export const ArticleTitle = ({
	format,
	palette,
	tags,
	sectionLabel,
	sectionUrl,
	guardianBaseURL,
	badge,
}: Props) => (
	<div css={[sectionStyles, badge && badgeContainer]}>
		{badge && format.display !== ArticleDisplay.Immersive && (
			<div css={titleBadgeWrapper}>
				<Badge imageUrl={badge.imageUrl} seriesTag={badge.seriesTag} />
			</div>
		)}
		<div
			css={[
				badge && marginTop,
				format.display === ArticleDisplay.Immersive &&
					format.design !== ArticleDesign.PrintShop &&
					immersiveMargins,
				backgroundColour(palette),
			]}
		>
			<SeriesSectionLink
				format={format}
				palette={palette}
				tags={tags}
				sectionLabel={sectionLabel}
				sectionUrl={sectionUrl}
				guardianBaseURL={guardianBaseURL}
				badge={badge}
			/>
		</div>
	</div>
);
