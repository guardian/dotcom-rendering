import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import {
	ArticleHeadline,
	headlineFont,
} from '../../components/ArticleHeadline';
import { ArticleTitle } from '../../components/ArticleTitle';
import { ContributorAvatar } from '../../components/ContributorAvatar';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { getZIndex } from '../../lib/getZIndex';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';

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
		ageWarning,
		avatarUrl,
		displayAvatarUrl,
		hasImmersiveAffiliateDisclaimer,
		hasImmersivePortraitTitleRule,
		isFootballMatchReport,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isImmersiveWeekendRead,
		isInteractiveTopHat,
		layoutType,
	} = layout;
	const headlineBackgroundImmersive = themePalette(
		'--headline-background-immersive',
	);
	const immersiveHeadlineOverlayBreakpoint = isImmersivePortrait
		? until.desktop
		: until.tablet;

	return (
		<>
			<GridItem
				area="title"
				layoutType={layoutType}
				format={format}
				element="aside"
				css={[
					isImmersive &&
						css`
							z-index: ${getZIndex('articleHeadline')};
						`,
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

							${format.design !== ArticleDesign.WeekendEssay &&
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
				format={format}
				css={[
					isImmersive &&
						!isImmersiveWeekendRead &&
						css`
							z-index: ${getZIndex('articleHeadline')};

							${immersiveHeadlineOverlayBreakpoint} {
								z-index: ${getZIndex('mediaOverlay')};
								padding-bottom: ${space[8]}px;
								[data-gu-name='age-warning'] {
									position: relative;
									z-index: ${getZIndex('articleHeadline')};
								}
								h1 {
									position: relative;
									isolation: isolate;
									background-color: transparent;

									${until.tablet} {
										padding-inline: 20px;
									}

									${until.mobileLandscape} {
										padding-inline: 10px;
									}

									> span {
										position: relative;
										z-index: ${getZIndex(
											'articleHeadline',
										)};
									}
									&::before,
									&::after {
										${headlineFont(format)}
										content: '';
										position: absolute;
										inset: calc(1lh - 120px)
											0 -${space[8]}px;
										z-index: ${getZIndex('mediaOverlay')};
										pointer-events: none;
									}
									&::before {
										backdrop-filter: blur(7px);
										mask-image: linear-gradient(
											180deg,
											transparent 0%,
											black 120px
										);
									}
									&::after {
										background: linear-gradient(
											180deg,
											transparent 0%,
											${headlineBackgroundImmersive} 120px
										);
									}
								}
							}
						`,
					isImmersiveWeekendRead &&
						css`
							z-index: ${getZIndex('articleHeadline')};
							${until.desktop} {
								border-top: 1px solid
									${themePalette('--article-border')};
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
							${!isImmersiveWeekendRead &&
							css`
								${between.tablet.and.desktop} {
									margin-left: -20px;
									margin-right: -20px;
								}
							`}

							${from.desktop} {
								border-bottom: 1px solid
									${themePalette('--article-border')};
								${!hasImmersivePortraitTitleRule &&
								css`
									border-top: 1px solid
										${themePalette('--article-border')};
								`}
							}
							${between.desktop.and.leftCol} {
								border-bottom: 1px solid
									${themePalette('--article-border')};
							}
						`,
					isInteractiveTopHat &&
						css`
							z-index: ${getZIndex('mediaOverlay')};
							background: rgba(255, 255, 255, 0.9);
							padding: 10px 10px 0;
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
