import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AffiliateDisclaimer } from '../components/AffiliateDisclaimer';
import { AppsEpic } from '../components/AppsEpic.island';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { DecideLines } from '../components/DecideLines';
import { FootballMatchInfoWrapper } from '../components/FootballMatchInfoWrapper.island';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { Island } from '../components/Island';
import { ListenToArticle } from '../components/ListenToArticle.island';
import { MainMedia } from '../components/MainMedia';
import { minHeaderHeightPx } from '../components/Masthead/Titlepiece/constants';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd.island';
import { SlotBodyEnd } from '../components/SlotBodyEnd.island';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import { getAgeWarning } from '../lib/age-warning';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideMainMediaCaption } from '../lib/decide-caption';
import { getZIndex } from '../lib/getZIndex';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { safeParseURL } from '../lib/parse';
import { parse } from '../lib/slot-machine-flags';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import {
	type Area,
	getLayoutType,
	gridItemCss,
	type LayoutType,
} from './lib/articleArrangements';

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const immersiveMediaBelowDesktop = (
	headlineBackground: string,
	isMainMediaImage: boolean,
) => css`
	${until.desktop} {
		position: relative;

		> div {
			${isMainMediaImage
				? 'height: 100%;'
				: 'position: absolute; inset: 0;'}
		}

		${!isMainMediaImage && 'overflow: hidden;'}

		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: ${isMainMediaImage
				? 'min(60%, calc(200% - 120vw + 30px))'
				: 'min(60%, 144px)'};
			z-index: ${getZIndex('mediaOverlay')};
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.08),
				${headlineBackground} 72%
			);
			backdrop-filter: blur(12px);
			mask-image: linear-gradient(to bottom, transparent 40%, black 60%);
			pointer-events: none;
		}
	}
`;

interface GridItemProps {
	area: Area;
	layoutType: LayoutType;
	element?: 'div' | 'aside';
	className?: string;
	children: React.ReactNode;
}

/**
 * Works out the orientation of an image from its Guardian media URL, which
 * encodes the crop dimensions in the path (e.g. `/1000_600_800_480/`).
 * Falls back to 'landscape' if the URL doesn't match the expected pattern.
 */
const getImageOrientation = (
	url: string,
): 'portrait' | 'landscape' | 'square' => {
	const match = url.match(/\/\d+_\d+_(\d+)_(\d+)\/\d+\.\w+$/);
	if (!match) return 'landscape';
	const [, width, height] = match.map(Number);
	if (width == null || height == null) return 'landscape';
	if (height > width) return 'portrait';
	if (width > height) return 'landscape';
	return 'square';
};

const GridItem = ({
	area,
	layoutType,
	element: Element = 'div',
	className,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={gridItemCss(area, layoutType)}
		className={className}
	>
		{children}
	</Element>
);

export const StandardLayoutArticleGrid = ({
	article,
	format,
	renderingTarget,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}) => {
	const {
		config: { host },
	} = article;
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';
	const renderAds = isWeb && !article.shouldHideAds;

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const showBodyEndSlot =
		isWeb &&
		(parse(article.slotMachineFlags ?? '').showBodyEnd ||
			article.config.switches.slotBodyEnd);

	const { branding } = article.commercialProperties[article.editionId];

	const footballMatchStatsUrl =
		article.matchType === 'FootballMatchType'
			? article.matchStatsUrl
			: undefined;

	const isLabs = format.theme === ArticleSpecial.Labs;
	const isMedia =
		format.design === ArticleDesign.Video ||
		format.design === ArticleDesign.Audio;
	const isShowcase = format.display === ArticleDisplay.Showcase;
	const isImmersive = format.display === ArticleDisplay.Immersive;
	const isFeature = format.design === ArticleDesign.Feature;
	const headlineBackgroundImmersive = themePalette(
		'--headline-background-immersive',
	);
	const isInteractive = format.design === ArticleDesign.Interactive;

	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchStatsUrl;

	const mainMedia = article.mainMediaElements[0];
	const captionText = decideMainMediaCaption(mainMedia);
	const isMainMediaImage =
		mainMedia?._type ===
		'model.dotcomrendering.pageElements.ImageBlockElement';
	const mainMediaUrl: string | undefined = isMainMediaImage
		? mainMedia.media.allImages[0]?.url
		: undefined;
	const mainMediaAspectRatio = isMainMediaImage
		? mainMedia.media.allImages[0]?.fields.aspectRatio
		: undefined;

	const mainMediaOrientation =
		mainMediaUrl != null ? getImageOrientation(mainMediaUrl) : 'landscape';
	const immersiveHeaderHeight =
		minHeaderHeightPx + (isLabs ? LABS_HEADER_HEIGHT : 0);
	const immersiveMediaRowHeight = isMainMediaImage
		? '60vw'
		: `max(calc(80vh - ${immersiveHeaderHeight}px), calc(25rem - ${immersiveHeaderHeight}px))`;

	const layoutType = getLayoutType({
		isImmersive,
		isFeature,
		orientation: mainMediaOrientation,
		isMedia,
		isShowcase,
		isInteractive,
	});
	const contentLayoutName = `${ArticleDisplay[format.display]}Layout`;

	const ageWarning = getAgeWarning(
		article.tags,
		article.webPublicationDateDeprecated,
	);

	return (
		<article
			css={[
				css`
					background-color: ${themePalette('--article-background')};
				`,
				grid.container,
				grid.outerRules(),
				isLabs &&
					isImmersive &&
					css`
						${from.desktop} {
							&::before,
							&::after {
								z-index: ${getZIndex(
									'immersiveGridOuterRules',
								)};
							}
						}
						/* Anchor the title consistently while wrapped text extends the media below it. */
						grid-template-rows: ${immersiveMediaRowHeight} repeat(
								6,
								auto
							);
					`,
				!isLabs &&
					css`
						${from.leftCol} {
							${grid.centreRule(isImmersive ? 4 : 3)}
						}
					`,
				layoutType === 'immersivePortrait' &&
					css`
						${from.desktop} {
							grid-template-rows: 0.25fr 1fr auto;
						}
					`,
				layoutType === 'immersiveLandscape' &&
					css`
						${from.desktop} {
							grid-template-rows: auto auto ${ageWarning != null
									? '130px'
									: '90px'} auto auto auto auto auto;
						}
					`,
			]}
		>
			<GridItem
				area="media"
				layoutType={layoutType}
				css={
					isImmersive
						? css`
								${from.desktop} {
									align-self: start;
									${mainMediaAspectRatio != null &&
									`aspect-ratio: ${mainMediaAspectRatio.replace(':', ' / ')};`}
									${layoutType === 'immersiveLandscape' &&
									`margin-left: -20px;
									margin-right: -20px;`}
								}

								${immersiveMediaBelowDesktop(
									headlineBackgroundImmersive,
									isMainMediaImage,
								)}
							`
						: undefined
				}
			>
				<div>
					<MainMedia
						format={format}
						elements={article.mainMediaElements}
						host={host}
						pageId={article.pageId}
						webTitle={article.webTitle}
						ajaxUrl={article.config.ajaxUrl}
						switches={article.config.switches}
						isAdFreeUser={article.isAdFreeUser}
						isSensitive={article.config.isSensitive}
						editionId={article.editionId}
						hideCaption={isMedia}
						shouldHideAds={article.shouldHideAds}
						contentType={article.contentType}
						contentLayout={contentLayoutName}
						articleArrangement={layoutType}
					/>
					{article.affiliateLinksDisclaimerRequired && (
						<AffiliateDisclaimer
							cssOverrides={css`
								margin: ${space[4]}px 0;
							`}
						/>
					)}
				</div>
			</GridItem>
			<GridItem
				area="title"
				layoutType={layoutType}
				element="aside"
				css={[
					isImmersive &&
						css`
							z-index: ${getZIndex('articleHeadline')};

							${until.desktop} {
								padding-bottom: ${space[2]}px;
							}
						`,
					layoutType === 'immersivePortrait' &&
						css`
							align-self: end;
							margin-bottom: 0;

							${from.desktop} {
								margin-bottom: 2px;
							}
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

							${until.desktop} {
								margin-top: -1px;
								background-color: ${headlineBackgroundImmersive};
								padding-top: 1px;
								padding-bottom: ${space[8]}px;
							}
						`,
					layoutType === 'immersiveLandscape' &&
						css`
							${from.desktop} {
								padding-bottom: ${space[8]}px;
							}
						`,
					layoutType === 'immersivePortrait' &&
						css`
							${from.desktop} {
								border-bottom: 1px solid
									${themePalette('--article-border')};
								border-top: 1px solid
									${themePalette('--article-border')};
							}
						`,
				]}
			>
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
			</GridItem>
			<GridItem
				area="standfirst"
				layoutType={layoutType}
				css={[
					isImmersive &&
						css`
							${until.desktop} {
								padding-top: ${space[2]}px;
							}
						`,
					layoutType === 'immersiveLandscape' &&
						css`
							${from.desktop} {
								padding-bottom: ${space[8]}px;
							}
						`,
				]}
			>
				<Standfirst
					format={format}
					standfirst={article.standfirst}
					layoutType={layoutType}
				/>
			</GridItem>
			{isImmersive && (
				<GridItem
					area="caption"
					layoutType={layoutType}
					css={css`
						padding-top: ${space[2]}px;
					`}
				>
					<Hide from="leftCol">
						<Caption
							captionText={captionText}
							format={format}
							shouldLimitWidth={false}
							isLeftCol={true}
							isMainMedia={true}
							showIconBelowLeftCol={true}
						/>
					</Hide>
				</GridItem>
			)}
			<GridItem
				area="meta"
				layoutType={layoutType}
				element="aside"
				css={[
					isImmersive &&
						branding != null &&
						captionText != null &&
						css`
							${until.desktop} {
								padding-top: ${space[3]}px;
							}
						`,
					layoutType === 'immersivePortrait'
						? css`
								${from.leftCol} {
									margin-right: -10px;
								}
							`
						: undefined,
				]}
			>
				{format.display !== ArticleDisplay.Immersive &&
					format.design !== ArticleDesign.Audio &&
					layoutType !== 'immersivePortrait' && (
						<div css={stretchLines}>
							{isWeb &&
							format.theme === ArticleSpecial.Labs &&
							format.design !== ArticleDesign.Video ? (
								<GuardianLabsLines />
							) : (
								<DecideLines
									format={format}
									color={themePalette('--article-border')}
								/>
							)}
						</div>
					)}
				{isApps ? (
					<>
						<Hide from="leftCol">
							<ArticleMetaApps
								branding={branding}
								format={format}
								layoutType={layoutType}
								byline={article.byline}
								tags={article.tags}
								primaryDateline={
									article.webPublicationDateDisplay
								}
								secondaryDateline={
									article.webPublicationSecondaryDateDisplay
								}
								isCommentable={article.isCommentable}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								shortUrlId={article.config.shortUrlId}
								pageId={article.config.pageId}
							></ArticleMetaApps>
						</Hide>
						<Hide until="leftCol">
							<ArticleMeta
								branding={branding}
								layoutType={layoutType}
								format={format}
								pageId={article.pageId}
								webTitle={article.webTitle}
								byline={article.byline}
								source={article.config.source}
								tags={article.tags}
								primaryDateline={
									article.webPublicationDateDisplay
								}
								secondaryDateline={
									article.webPublicationSecondaryDateDisplay
								}
								webPublicationDate={article.webPublicationDate}
								isCommentable={article.isCommentable}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								shortUrlId={article.config.shortUrlId}
								mainMediaElements={article.mainMediaElements}
							/>
						</Hide>
					</>
				) : (
					<>
						<ArticleMeta
							branding={branding}
							layoutType={layoutType}
							format={format}
							pageId={article.pageId}
							webTitle={article.webTitle}
							byline={article.byline}
							source={article.config.source}
							tags={article.tags}
							primaryDateline={article.webPublicationDateDisplay}
							secondaryDateline={
								article.webPublicationSecondaryDateDisplay
							}
							webPublicationDate={article.webPublicationDate}
							isCommentable={article.isCommentable}
							discussionApiUrl={article.config.discussionApiUrl}
							shortUrlId={article.config.shortUrlId}
							mainMediaElements={article.mainMediaElements}
						/>
					</>
				)}
			</GridItem>
			<GridItem
				area="body"
				layoutType={layoutType}
				css={css`
					z-index: ${getZIndex('bodyArea')};
				`}
			>
				{/* Only show Listen to Article button on App landscape views */}
				{isApps && (
					<Hide until="leftCol">
						{!isMedia && (
							<div
								css={css`
									margin-top: ${space[2]}px;
								`}
							>
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<ListenToArticle
										articleId={article.pageId}
									/>
								</Island>
							</div>
						)}
					</Hide>
				)}
				<ArticleContainer format={format}>
					<ArticleBody
						format={format}
						blocks={article.blocks}
						pinnedPost={article.pinnedPost}
						host={host}
						pageId={article.pageId}
						webTitle={article.webTitle}
						ajaxUrl={article.config.ajaxUrl}
						switches={article.config.switches}
						isSensitive={article.config.isSensitive}
						isAdFreeUser={article.isAdFreeUser}
						sectionId={article.config.section}
						shouldHideReaderRevenue={
							article.shouldHideReaderRevenue
						}
						tags={article.tags}
						isPaidContent={!!article.config.isPaidContent}
						contributionsServiceUrl={contributionsServiceUrl}
						contentType={article.contentType}
						isPreview={article.config.isPreview}
						idUrl={article.config.idUrl ?? ''}
						isDev={!!article.config.isDev}
						keywordIds={article.config.keywordIds}
						tableOfContents={article.tableOfContents}
						lang={article.lang}
						isRightToLeftLang={article.isRightToLeftLang}
						editionId={article.editionId}
						shouldHideAds={article.shouldHideAds}
						idApiUrl={article.config.idApiUrl}
					/>
					<MatchInfoContainer
						isMatchReport={isFootballMatchReport}
						footballMatchStatsUrl={footballMatchStatsUrl}
					/>

					{isApps && (
						<Island
							priority="critical"
							defer={{ until: 'visible' }}
						>
							<AppsEpic />
						</Island>
					)}

					{showBodyEndSlot && (
						<Island priority="feature" defer={{ until: 'visible' }}>
							<SlotBodyEnd
								contentType={article.contentType}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={article.config.idApiUrl}
								isPaidContent={article.pageType.isPaidContent}
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								tags={article.tags}
								renderAds={renderAds}
								isLabs={isLabs}
								articleEndSlot={
									!!article.config.switches.articleEndSlot
								}
								isSensitive={article.config.isSensitive}
							/>
						</Island>
					)}
					<StraightLines
						data-print-layout="hide"
						count={4}
						cssOverrides={css`
							display: block;
						`}
						color={themePalette('--straight-lines')}
					/>
					<SubMeta
						format={format}
						subMetaKeywordLinks={article.subMetaKeywordLinks}
						subMetaSectionLinks={article.subMetaSectionLinks}
						pageId={article.pageId}
						webUrl={article.webURL}
						webTitle={article.webTitle}
						showBottomSocialButtons={
							article.showBottomSocialButtons &&
							renderingTarget === 'Web'
						}
					/>
				</ArticleContainer>
			</GridItem>
			{layoutType !== 'interactive' && (
				<GridItem
					area="right-column"
					layoutType={layoutType}
					css={css`
						padding-top: ${isMedia ? 0 : 6}px;
						${from.desktop} {
							padding-bottom: ${isMedia ? 41 : 0}px;
						}
					`}
				>
					<Hide until="desktop">
						<Island
							priority="feature"
							defer={{
								until: 'visible',
								// Provide a much higher value for the top margin for the intersection observer
								// This is because the most viewed would otherwise only be lazy loaded when the
								// bottom of the container intersects with the viewport
								rootMargin: '700px 100px',
							}}
						>
							<MostViewedRightWithAd
								format={format}
								isPaidContent={article.pageType.isPaidContent}
								renderAds={isWeb && renderAds}
								shouldHideReaderRevenue={
									!!article.config.shouldHideReaderRevenue
								}
								shouldHideMostViewed={
									format.design === ArticleDesign.Audio
								}
							/>
						</Island>
					</Hide>
				</GridItem>
			)}
		</article>
	);
};

const MatchInfoContainer = ({
	isMatchReport,
	footballMatchStatsUrl,
}: {
	isMatchReport: boolean;
	footballMatchStatsUrl: string | undefined;
}) => {
	if (isMatchReport && !!footballMatchStatsUrl) {
		const parsedUrl = safeParseURL(footballMatchStatsUrl);
		if (!parsedUrl.ok) {
			log(
				'dotcom',
				new Error(
					`Failed to parse match stats URL: ${footballMatchStatsUrl}`,
				),
			);

			return null;
		}
		return (
			<Island priority="feature" defer={{ until: 'visible' }}>
				<FootballMatchInfoWrapper
					matchStatsUrl={footballMatchStatsUrl}
				/>
			</Island>
		);
	}

	return null;
};
