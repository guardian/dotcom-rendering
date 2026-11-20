import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source/foundations';
import { ArticleTitle } from '../../components/ArticleTitle';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { getZIndex } from '../../lib/getZIndex';
import type { ArticleDeprecated } from '../../types/article';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';
import { immersiveLayer, spacedColumn } from './styles';

export const ArticleGridTitle = ({
	article,
	format,
	layout,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	layout: ArticleGridLayout;
}) => {
	const {
		ageWarning,
		hasPageSkin,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isImmersiveWeekendRead,
		isInteractiveTopHat,
		layoutType,
	} = layout;
	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport &&
		article.matchType === 'FootballMatchType' &&
		article.matchStatsUrl != null;

	return (
		<GridItem
			area="title"
			layoutType={layoutType}
			format={format}
			hasPageSkin={hasPageSkin}
			element="aside"
			css={[
				isImmersive && immersiveLayer,
				isImmersive &&
					!isImmersiveWeekendRead &&
					ageWarning != null &&
					css`
						${until.desktop} {
							padding-bottom: 2px;
						}
						${until.tablet} {
							padding-bottom: calc(
								var(--immersive-headline-overlap) + 2px
							);
						}
						${isImmersiveLandscape &&
						css`
							${from.desktop} {
								padding-bottom: 2px;
							}
						`}
					`,
				isImmersivePortrait &&
					css`
						align-content: flex-start;
						margin-bottom: 0;

						${!isImmersiveWeekendRead &&
						css`
							${between.tablet.and.desktop} {
								margin-left: -20px;
								margin-right: -20px;
							}

							${from.desktop} {
								align-content: flex-end;
							}
						`}
					`,
				layoutType === 'picture' && spacedColumn,
				isInteractiveTopHat &&
					css`
						z-index: ${getZIndex('mediaOverlay')};
					`,
			]}
		>
			<ArticleTitle
				format={format}
				layoutType={layoutType}
				tags={article.tags}
				sectionLabel={article.sectionLabel}
				sectionUrl={article.sectionUrl}
				guardianBaseURL={article.guardianBaseURL}
				isMatch={isFootballMatchReport}
			/>
		</GridItem>
	);
};
