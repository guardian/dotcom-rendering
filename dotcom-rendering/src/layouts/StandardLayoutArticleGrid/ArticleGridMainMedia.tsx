import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import { AffiliateDisclaimer } from '../../components/AffiliateProducts/AffiliateDisclaimer';
import { MainMedia } from '../../components/MainMedia';
import { ArticleDisplay, type ArticleFormat } from '../../lib/articleFormat';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';

const immersiveMediaBelowTablet = css`
	${until.tablet} {
		position: relative;
		overflow: hidden;

		> div {
			height: 100%;
		}
	}
`;

export const ArticleGridMainMedia = ({
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
		immersiveHeaderHeight,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		isImmersiveWeekendRead,
		layoutType,
		mainMediaAspectRatio,
		usesImmersiveImageProportions,
	} = layout;
	const displayAvatarUrl = avatarUrl != null;
	const contentLayoutName = `${ArticleDisplay[format.display]}Layout`;
	const hasLabsPortraitImage =
		layout.isLabs && isImmersivePortrait && usesImmersiveImageProportions;
	const hideCaptionBeneathMainMedia =
		layoutType === 'media' ||
		layout.isInteractiveTopHat ||
		isImmersiveLandscape ||
		isImmersivePortrait;

	return (
		<GridItem
			area="media"
			layoutType={layoutType}
			format={format}
			css={[
				isImmersive
					? css`
							${from.tablet} {
								align-self: start;
								${!usesImmersiveImageProportions &&
								mainMediaAspectRatio != null &&
								`aspect-ratio: ${mainMediaAspectRatio.replace(':', ' / ')};`}
								${isImmersiveLandscape &&
								`margin-left: -20px;
								margin-right: -20px;`}
							}

							${isImmersivePortrait &&
							css`
								aspect-ratio: 4 / 5;

								${!isImmersiveWeekendRead &&
								css`
									${between.tablet.and.desktop} {
										margin-left: -20px;
										margin-right: -20px;
									}
								`}
							`}
							${!isImmersiveWeekendRead &&
							immersiveMediaBelowTablet}

							${hasLabsPortraitImage &&
							css`
								${until.tablet} {
									position: relative;
									width: 100%;
									min-width: 0;
									aspect-ratio: 4 / 5;
									overflow: hidden;
									background-color: ${themePalette(
										'--headline-background-immersive',
									)};

									> div {
										position: absolute;
										inset: 0;
									}
								}
							`}
						`
					: undefined,
				isImmersiveLandscape &&
					usesImmersiveImageProportions &&
					css`
						position: relative;
						aspect-ratio: 4 / 5;

						> div {
							position: absolute;
							inset: 0;
						}

						${from.mobileLandscape} {
							aspect-ratio: 5 / 4;
						}

						${from.desktop} {
							aspect-ratio: auto;
							height: calc(100vh - ${immersiveHeaderHeight}px);
						}
					`,
				isImmersivePortrait &&
					css`
						${from.leftCol} {
							grid-template-rows: auto 1fr max-content;
						}
					`,
				isImmersivePortrait &&
					usesImmersiveImageProportions &&
					css`
						> div {
							height: 100%;
						}

						${from.leftCol} {
							aspect-ratio: 4 / 5;
						}
					`,
				displayAvatarUrl && layoutType === 'picture'
					? css`
							margin-top: ${space[2]}px;
						`
					: undefined,
			]}
		>
			<div>
				<MainMedia
					format={format}
					elements={article.mainMediaElements}
					host={article.config.host}
					pageId={article.pageId}
					webTitle={article.webTitle}
					ajaxUrl={article.config.ajaxUrl}
					switches={article.config.switches}
					isAdFreeUser={article.isAdFreeUser}
					isSensitive={article.config.isSensitive}
					editionId={article.editionId}
					hideCaption={hideCaptionBeneathMainMedia}
					shouldHideAds={article.shouldHideAds}
					contentType={article.contentType}
					contentLayout={contentLayoutName}
					articleArrangement={layoutType}
				/>
				{article.affiliateLinksDisclaimerRequired && !isImmersive && (
					<AffiliateDisclaimer
						cssOverrides={css`
							margin: ${space[4]}px 0;
						`}
					/>
				)}
			</div>
		</GridItem>
	);
};
