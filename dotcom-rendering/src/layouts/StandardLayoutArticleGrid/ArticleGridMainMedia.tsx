import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { AffiliateDisclaimer } from '../../components/AffiliateProducts/AffiliateDisclaimer';
import { MainMedia } from '../../components/MainMedia';
import type { ArticleFormat } from '../../lib/articleFormat';
import { getZIndex } from '../../lib/getZIndex';
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

		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 240px;
			z-index: ${getZIndex('mediaOverlay')};
			background: ${themePalette('--headline-background-immersive')};
			backdrop-filter: blur(8px);
			mask-image: linear-gradient(
				to bottom,
				transparent,
				rgb(0 0 0 / 12%) 25%,
				rgb(0 0 0 / 50%) 55%,
				rgb(0 0 0 / 85%) 80%,
				black
			);
			pointer-events: none;
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
		contentLayoutName,
		displayAvatarUrl,
		hasLabsPortraitImage,
		hideCaptionBeneathMainMedia,
		immersiveHeaderHeight,
		isImmersive,
		isImmersiveLandscape,
		isImmersivePortrait,
		layoutType,
		mainMediaAspectRatio,
		usesImmersiveImageProportions,
	} = layout;

	return (
		<GridItem
			area="media"
			layoutType={layoutType}
			css={[
				isImmersive
					? css`
							${from.tablet} {
								align-self: start;
								${(!isImmersiveLandscape ||
									!usesImmersiveImageProportions) &&
								mainMediaAspectRatio != null &&
								`aspect-ratio: ${mainMediaAspectRatio.replace(':', ' / ')};`}
								${isImmersiveLandscape &&
								`margin-left: -20px;
								margin-right: -20px;`}
							}

							${isImmersivePortrait &&
							css`
								aspect-ratio: 4 / 5;
							`}
							${immersiveMediaBelowTablet}

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
