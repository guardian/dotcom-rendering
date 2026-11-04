import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { ArticleHeadline } from '../../components/ArticleHeadline';
import { ArticleTitle } from '../../components/ArticleTitle';
import { ContributorAvatar } from '../../components/ContributorAvatar';
import {
	ArticleDesign,
	type ArticleFormat,
	hasImmersiveGridTitle,
} from '../../lib/articleFormat';
import { getZIndex } from '../../lib/getZIndex';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';
import { topHatFurnitureBackgroundStyles } from './styles';

const avatarHeadlineWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const avatarPositionStyles = (isPicture: boolean) => css`
	display: flex;
	justify-content: flex-end;
	position: relative;
	margin-bottom: -29px;
	pointer-events: none;

	${!isPicture && 'margin-top: -50px;'}

	${from.desktop} {
		margin-top: -50px;
	}
	${until.tablet} {
		overflow: hidden;
	}

	${from.mobile} {
		img {
			margin-right: -1.85rem;
		}
	}
	${from.mobileLandscape} {
		img {
			margin-right: -1.25rem;
		}
	}
`;

export const ArticleGridHeader = ({
	article,
	format,
	layout,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	layout: ArticleGridLayout;
}) => {
	const {
		avatarUrl,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isInteractiveTopHat,
		layoutType,
	} = layout;
	const hasImmersivePortraitTitleRule =
		isImmersivePortrait && hasImmersiveGridTitle(format, article.tags);
	const displayAvatarUrl = avatarUrl != null;
	const hasImmersiveAffiliateDisclaimer =
		isImmersive && article.affiliateLinksDisclaimerRequired;
	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport &&
		article.matchType === 'FootballMatchType' &&
		article.matchStatsUrl != null;
	const headlineBackgroundImmersive = themePalette(
		'--headline-background-immersive',
	);

	return (
		<>
			<GridItem
				area="title"
				layoutType={layoutType}
				element="aside"
				css={[
					isImmersive &&
						css`
							z-index: ${getZIndex('articleHeadline')};
						`,
					isImmersivePortrait &&
						css`
							align-content: flex-start;
							margin-bottom: 0;

							${format.design !== ArticleDesign.WeekendEssay &&
							css`
								${from.desktop} {
									align-content: flex-end;
								}
							`}
						`,
					layoutType === 'picture' &&
						css`
							display: flex;
							flex-direction: column;
							justify-content: space-between;
						`,
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
			<GridItem
				area="headline"
				layoutType={layoutType}
				css={[
					isImmersive &&
						css`
							z-index: ${getZIndex('articleHeadline')};

							${until.tablet} {
								background: linear-gradient(
									to bottom,
									transparent,
									${headlineBackgroundImmersive}
										calc(
											var(--immersive-headline-overlap) -
												1px
										)
								);

								h1 {
									background-color: transparent;
								}

								padding-bottom: ${space[8]}px;
							}
						`,
					isImmersiveLandscape &&
						css`
							${between.tablet.and.desktop} {
								padding-bottom: ${space[8]}px;
							}

							${hasImmersiveAffiliateDisclaimer &&
							`${between.tablet.and.desktop} {
								padding-bottom: ${space[3]}px;
							}`}
						`,
					isImmersivePortrait &&
						css`
							${from.desktop} {
								${!hasImmersivePortraitTitleRule &&
								`border-top: 1px solid ${themePalette(
									'--article-border',
								)};`}
							}

							${between.desktop.and.leftCol} {
								border-bottom: 1px solid
									${themePalette('--article-border')};
							}
						`,
					isInteractiveTopHat &&
						css`
							${topHatFurnitureBackgroundStyles}
							padding-top: 10px;
						`,
				]}
			>
				{layoutType === 'picture' || layoutType === 'comment' ? (
					<div css={avatarHeadlineWrapper}>
						<ArticleHeadline
							format={format}
							layoutType={layoutType}
							headlineString={article.headline}
							tags={article.tags}
							byline={article.byline}
							webPublicationDateDeprecated={
								article.webPublicationDateDeprecated
							}
							hasAvatar={!!avatarUrl}
							starRating={article.starRating}
						/>

						<>
							{displayAvatarUrl && avatarUrl && (
								<div
									css={avatarPositionStyles(
										layoutType === 'picture',
									)}
								>
									<ContributorAvatar
										imageSrc={avatarUrl}
										imageAlt={article.byline ?? ''}
									/>
								</div>
							)}
							{!(
								layoutType === 'picture' && !displayAvatarUrl
							) && (
								<StraightLines
									count={8}
									cssOverrides={css`
										display: block;
									`}
									color={themePalette('--straight-lines')}
								/>
							)}
						</>
					</div>
				) : (
					<ArticleHeadline
						format={format}
						layoutType={layoutType}
						headlineString={article.headline}
						tags={article.tags}
						byline={article.byline}
						webPublicationDateDeprecated={
							article.webPublicationDateDeprecated
						}
						starRating={article.starRating}
					/>
				)}
			</GridItem>
		</>
	);
};
