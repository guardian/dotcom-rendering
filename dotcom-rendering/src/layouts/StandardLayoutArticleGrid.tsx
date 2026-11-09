import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { between, from, space, until } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AffiliateDisclaimer } from '../components/AffiliateProducts/AffiliateDisclaimer';
import { AppsEpic } from '../components/AppsEpic.island';
import { ArticleBody } from '../components/ArticleBody';
import { ArticleContainer } from '../components/ArticleContainer';
import { ArticleHeadline, headlineFont } from '../components/ArticleHeadline';
import { ArticleMetaApps } from '../components/ArticleMeta.apps';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { ArticleTitle } from '../components/ArticleTitle';
import { Caption } from '../components/Caption';
import { ContributorAvatar } from '../components/ContributorAvatar';
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
	hasImmersiveGridTitleRule,
} from '../lib/articleFormat';
import { getSoleContributor } from '../lib/byline';
import { getContributionsServiceUrl } from '../lib/contributions';
import { decideMainMediaCaption } from '../lib/decide-caption';
import { getZIndex } from '../lib/getZIndex';
import { LABS_HEADER_HEIGHT } from '../lib/labs-constants';
import { safeParseURL } from '../lib/parse';
import { parse } from '../lib/slot-machine-flags';
import { hasFilterTag } from '../lib/theFilter';
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

const immersiveMediaBelowTablet = css`
	${until.tablet} {
		position: relative;

		overflow: hidden;

		> div {
			height: 100%;
		}
	}
`;

const avatarHeadlineWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const immersivePortraitFooter = css`
	display: contents;

	${from.leftCol} {
		${grid.between('left-column-start', 9)}
		display: grid;
		grid-row: 3;
		grid-template-columns: subgrid;
		grid-template-rows: auto;
		align-self: end;
		border-top: 1px solid ${themePalette('--article-border')};

		> [data-gu-name='standfirst'],
		> [data-gu-name='meta'] {
			grid-row: 1;
		}
	}

	${from.wide} {
		${grid.between('left-column-start', 10)}
	}
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

interface GridItemProps {
	area: Area;
	layoutType: LayoutType;
	format: ArticleFormat;
	element?: 'div' | 'aside';
	className?: string;
	children: React.ReactNode;
}

const getImageOrientation = (
	aspectRatio: string,
): 'portrait' | 'landscape' | 'square' => {
	const [width, height] = aspectRatio.split(':').map(Number);
	if (width == null || height == null) return 'landscape';
	if (height > width) return 'portrait';
	if (width > height) return 'landscape';
	return 'square';
};

const GridItem = ({
	area,
	layoutType,
	format,
	element: Element = 'div',
	className,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={gridItemCss(area, layoutType, format)}
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

	const headlineBackgroundImmersive = themePalette(
		'--headline-background-immersive',
	);

	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchStatsUrl;

	const mainMedia = article.mainMediaElements[0];
	const mainMediaType = mainMedia?._type;

	const captionText = decideMainMediaCaption(mainMedia);
	const isMainMediaImage =
		mainMediaType ===
		'model.dotcomrendering.pageElements.ImageBlockElement';
	const isMainMediaAtom =
		mainMediaType ===
		'model.dotcomrendering.pageElements.MediaAtomBlockElement';
	const isMainMediaLoopOrCinemagraph =
		isMainMediaAtom &&
		(mainMedia.videoPlayerFormat === 'Loop' ||
			mainMedia.videoPlayerFormat === 'Cinemagraph');
	const usesImmersiveImageProportions =
		isMainMediaImage || isMainMediaLoopOrCinemagraph;

	const mainMediaAspectRatio = isMainMediaImage
		? mainMedia.media.allImages[0]?.fields.aspectRatio
		: isMainMediaAtom
			? mainMedia.assets[0]?.aspectRatio
			: undefined;

	const mainMediaOrientation =
		mainMediaAspectRatio != null
			? getImageOrientation(mainMediaAspectRatio)
			: 'landscape';
	const immersiveHeaderHeight =
		minHeaderHeightPx + (isLabs ? LABS_HEADER_HEIGHT : 0);

	const topHatTestingPage = '/p/x4zt8y';
	const layoutType =
		article.config.shortUrlId === topHatTestingPage
			? 'interactiveTopHat'
			: getLayoutType(format, mainMediaOrientation);

	const setCentreRule = (gridLayout: LayoutType) => {
		if (
			isLabs ||
			gridLayout === 'interactiveStandard' ||
			gridLayout === 'interactiveTopHat'
		) {
			return undefined;
		}

		const columnCount = gridLayout === 'immersivePortrait' ? 5 : 3;

		return css`
			${from.leftCol} {
				${grid.centreRule(columnCount)}
				${gridLayout === 'immersiveLandscape' &&
				css`
					& > *:nth-child(3)::before {
						top: 100%;
					}
				`}
			}
		`;
	};

	const contentLayoutName = `${ArticleDisplay[format.display]}Layout`;

	const isImmersivePortrait = layoutType === 'immersivePortrait';
	const isImmersiveLandscape = layoutType === 'immersiveLandscape';
	const isImmersive = isImmersivePortrait || isImmersiveLandscape;
	const isImmersiveWeekendRead =
		isImmersivePortrait && format.design === ArticleDesign.WeekendEssay;
	const immersiveHeadlineOverlayBreakpoint = isImmersivePortrait
		? until.desktop
		: until.tablet;
	const hasImmersivePortraitTitleRule =
		isImmersivePortrait && hasImmersiveGridTitleRule(format, article.tags);

	const isInteractiveTopHat = layoutType === 'interactiveTopHat';

	const isFilterArticle = hasFilterTag(article.tags);
	const tableOfContentsStyle =
		isImmersive && isFilterArticle ? 'horizontal' : 'default';

	const hasLabsPortraitImage =
		isLabs && isImmersivePortrait && usesImmersiveImageProportions;

	const ageWarning = getAgeWarning(
		article.tags,
		article.webPublicationDateDeprecated,
	);

	const avatarUrl = getSoleContributor(
		article.tags,
		article.byline,
	)?.bylineLargeImageUrl;

	const displayAvatarUrl = avatarUrl ? true : false;

	const picAndCommentLeftColLines = (avatarDisplayed: boolean) => css`
		${avatarDisplayed && `display: none;`}
		margin-bottom: 4px;
		${from.leftCol} {
			display: block;
			${avatarDisplayed && `margin-top: -28px;`}
		}
	`;

	// Immersive headlines overlap the bottom of the main media, so the
	// disclaimer goes above the standfirst instead.
	const hasImmersiveAffiliateDisclaimer =
		isImmersive && article.affiliateLinksDisclaimerRequired;

	const hideCaptionBeneathMainMedia =
		layoutType === 'media' ||
		isInteractiveTopHat ||
		isImmersiveLandscape ||
		isImmersivePortrait;

	const topHatFurnitureBackgroundStyles = css`
		z-index: ${getZIndex('mediaOverlay')};
		background: rgba(255, 255, 255, 0.9);
		padding: 0 10px;
	`;

	return (
		<article
			css={[
				css`
					background-color: ${themePalette('--article-background')};
				`,
				grid.container,
				grid.outerRules(),
				setCentreRule(layoutType),
				isImmersive &&
					css`
						${until.tablet} {
							--immersive-headline-overlap: ${ageWarning != null
								? '96px'
								: '24px'};
						}
					`,
				isImmersiveLandscape &&
					css`
						${from.desktop} {
							grid-template-rows: auto auto ${ageWarning != null
									? '130px'
									: '90px'} auto auto auto auto auto;
						}
						&::before,
						&::after {
							z-index: ${getZIndex('immersiveGridOuterRules')};
						}
					`,
				isInteractiveTopHat &&
					css`
						grid-template-rows: 300px auto;
					`,
			]}
		>
			<GridItem
				area="media"
				layoutType={layoutType}
				format={format}
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
										background-color: ${headlineBackgroundImmersive};

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
								height: calc(
									100vh - ${immersiveHeaderHeight}px
								);
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
						host={host}
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
					{article.affiliateLinksDisclaimerRequired &&
						!isImmersive && (
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
				format={format}
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

									> span {
										position: relative;
										z-index: ${getZIndex(
											'articleHeadline',
										)};
									}

									&::before {
										${headlineFont(format)}
										content: '';
										position: absolute;
										inset: -120px 0 -${space[8]}px;
										z-index: ${getZIndex('mediaOverlay')};
										background: ${headlineBackgroundImmersive};
										backdrop-filter: blur(8px);
										mask-image: linear-gradient(
											to bottom,
											transparent,
											black calc(120px + 1lh)
										);
										pointer-events: none;
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

							/* Below tablet this padding is part of the
							headline's dark background, so keep it there. */
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
							{displayAvatarUrl && !!avatarUrl && (
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
			{isImmersive && (
				<GridItem
					area="caption"
					layoutType={layoutType}
					format={format}
					css={css`
						padding-top: ${space[2]}px;
					`}
				>
					{isImmersivePortrait ? (
						<Caption
							captionText={captionText}
							format={format}
							shouldLimitWidth={false}
							isLeftCol={true}
							isMainMedia={true}
							showIconBelowLeftCol={true}
						/>
					) : (
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
					)}
				</GridItem>
			)}
			<div
				css={[
					css`
						display: contents;
					`,
					isImmersivePortrait && immersivePortraitFooter,
				]}
			>
				<GridItem
					area="standfirst"
					layoutType={layoutType}
					format={format}
					css={[
						isImmersive &&
							css`
								${until.tablet} {
									padding-top: ${hasImmersiveAffiliateDisclaimer
										? space[3]
										: space[2]}px;
								}
							`,
						isImmersiveLandscape &&
							css`
								${from.desktop} {
									padding-top: ${hasImmersiveAffiliateDisclaimer
										? space[3]
										: space[8]}px;
								}

								${from.leftCol} {
									padding-bottom: 14px;
								}
							`,
						isInteractiveTopHat && topHatFurnitureBackgroundStyles,
					]}
				>
					{hasImmersiveAffiliateDisclaimer && (
						<AffiliateDisclaimer
							cssOverrides={css`
								margin: 0 0 ${space[2]}px;
							`}
						/>
					)}
					<Standfirst
						format={format}
						standfirst={article.standfirst}
						layoutType={layoutType}
					/>
				</GridItem>
				<GridItem
					area="meta"
					layoutType={layoutType}
					format={format}
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
						isImmersiveLandscape &&
							css`
								${from.leftCol} {
									padding-top: ${space[8]}px;
								}
							`,
						layoutType === 'interactiveTopHat' &&
							css`
								${topHatFurnitureBackgroundStyles}
								padding-bottom: 10px;
							`,
					]}
				>
					{format.display !== ArticleDisplay.Immersive &&
						format.design !== ArticleDesign.Audio &&
						layoutType !== 'immersivePortrait' &&
						layoutType !== 'interactiveTopHat' && (
							<div
								css={[
									(layoutType === 'picture' ||
										layoutType === 'comment') &&
										picAndCommentLeftColLines(
											displayAvatarUrl ||
												layoutType === 'comment',
										),
									stretchLines,
								]}
							>
								{isWeb &&
								format.theme === ArticleSpecial.Labs &&
								format.design !== ArticleDesign.Video ? (
									<GuardianLabsLines />
								) : (
									<DecideLines
										format={format}
										color={themePalette('--article-border')}
										displayingAvatar={
											displayAvatarUrl &&
											(layoutType === 'picture' ||
												layoutType === 'comment')
										}
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
									webPublicationDate={
										article.webPublicationDate
									}
									firstPublicationDate={
										article.firstPublicationDate
									}
									isCommentable={article.isCommentable}
									discussionApiUrl={
										article.config.discussionApiUrl
									}
									shortUrlId={article.config.shortUrlId}
									mainMediaElements={
										article.mainMediaElements
									}
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
								primaryDateline={
									article.webPublicationDateDisplay
								}
								secondaryDateline={
									article.webPublicationSecondaryDateDisplay
								}
								webPublicationDate={article.webPublicationDate}
								firstPublicationDate={
									article.firstPublicationDate
								}
								isCommentable={article.isCommentable}
								discussionApiUrl={
									article.config.discussionApiUrl
								}
								shortUrlId={article.config.shortUrlId}
								mainMediaElements={article.mainMediaElements}
							/>
						</>
					)}
				</GridItem>
			</div>
			<GridItem
				area="body"
				layoutType={layoutType}
				format={format}
				css={css`
					z-index: ${getZIndex('bodyArea')};
				`}
			>
				{/* Only show Listen to Article button on App landscape views */}
				{isApps && (
					<Hide until="leftCol">
						{layoutType !== 'media' && (
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
						tableOfContentsStyle={tableOfContentsStyle}
						lang={article.lang}
						isRightToLeftLang={article.isRightToLeftLang}
						editionId={article.editionId}
						shouldHideAds={article.shouldHideAds}
						articleArrangement={layoutType}
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
			<GridItem
				area="right-column"
				layoutType={layoutType}
				format={format}
				css={css`
					padding-top: ${layoutType === 'media' ? 0 : 6}px;
					${from.desktop} {
						padding-bottom: ${layoutType === 'media' ? 41 : 0}px;
					}
				`}
			>
				{layoutType !== 'picture' && (
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
									format.design === ArticleDesign.Audio ||
									format.design === ArticleDesign.Interactive
								}
							/>
						</Island>
					</Hide>
				)}
			</GridItem>
			{format.design === ArticleDesign.Interactive && (
				<div
					aria-hidden="true"
					data-gu-name="centre-rule"
					css={css`
						display: none;
						${from.leftCol} {
							display: block;
							grid-column: centre-column-start;
							grid-row: ${layoutType === 'interactiveStandard'
								? '1 / 5'
								: layoutType === 'interactiveTopHat' && '8'};
							position: relative;

							&::before {
								position: absolute;
								top: 0;
								bottom: 0;
								left: -10px;
								width: 1px;
								background-color: ${themePalette(
									'--article-border',
								)};
								content: '';
							}
						}
					`}
				/>
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
