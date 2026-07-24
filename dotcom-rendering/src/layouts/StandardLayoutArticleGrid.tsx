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
import { ContributorAvatar } from '../components/ContributorAvatar';
import { DecideLines } from '../components/DecideLines';
import { FootballMatchInfoWrapper } from '../components/FootballMatchInfoWrapper.island';
import { GuardianLabsLines } from '../components/GuardianLabsLines';
import { Island } from '../components/Island';
import { ListenToArticle } from '../components/ListenToArticle.island';
import { MainMedia } from '../components/MainMedia';
import { MostViewedRightWithAd } from '../components/MostViewedRightWithAd.island';
import { SlotBodyEnd } from '../components/SlotBodyEnd.island';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { getSoleContributor } from '../lib/byline';
import { getContributionsServiceUrl } from '../lib/contributions';
import { safeParseURL } from '../lib/parse';
import { parse } from '../lib/slot-machine-flags';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { RenderingTarget } from '../types/renderingTarget';
import {
	type Area,
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

const avatarHeadlineWrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

// This styling taken from the similar approach in CommentLayout.tsx
// If on mobile, increase the margin top and margin right deficit
const avatarPositionStyles = css`
	display: flex;
	justify-content: flex-end;
	position: relative;
	margin-bottom: -29px;
	pointer-events: none;
	${from.desktop} {
		margin-top: -50px;
	}
	${until.tablet} {
		overflow: hidden;
	}

	/*  Why target img element?

        Because only in this context, where we have overflow: hidden
        and the margin-bottom and margin-top of avatarPositionStyles
        do we also want to apply our margin-right. These styles
        are tightly coupled in this context, and so it does not
        make sense to move them to the avatar component.

        It's imperfect from the perspective of DCR, the alternative is to bust
        the combined elements into a separate component (with the
        relevant stories) and couple them that way, which might be what
        you want to do if you find yourself adding more styles
        to this section. For now, this works without making me 🤢.
    */

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
	element?: 'div' | 'aside';
	className?: string;
	children: React.ReactNode;
}

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
	const isPicture = format.design === ArticleDesign.Picture;

	const isVideo = format.design === ArticleDesign.Video;

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

	const layoutType: LayoutType = isMedia
		? 'media'
		: isPicture
			? 'picture'
			: isShowcase
				? 'showcase'
				: 'standard';

	const avatarUrl = getSoleContributor(
		article.tags,
		article.byline,
	)?.bylineLargeImageUrl;

	const displayAvatarUrl = avatarUrl ? true : false;

	return (
		<article
			css={[
				css`
					background-color: ${themePalette('--article-background')};
				`,
				grid.container,
				grid.outerRules(),
				!isLabs &&
					css`
						${from.leftCol} {
							${grid.centreRule(3)}
						}
					`,
			]}
		>
			<GridItem
				area="media"
				layoutType={layoutType}
				css={
					displayAvatarUrl
						? css`
								margin-top: 8px;
							`
						: undefined
				}
			>
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
					contentLayout={`${ArticleDisplay[format.display]}Layout`}
				/>
			</GridItem>
			<GridItem
				area="title"
				layoutType={layoutType}
				element="aside"
				css={css`
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				`}
			>
				<ArticleTitle
					format={format}
					tags={article.tags}
					sectionLabel={article.sectionLabel}
					sectionUrl={article.sectionUrl}
					guardianBaseURL={article.guardianBaseURL}
					isMatch={!!footballMatchUrl}
				/>
				{displayAvatarUrl && (
					<Hide until="leftCol">
						<StraightLines
							count={8}
							cssOverrides={css`
								display: block;
							`}
							color={themePalette('--straight-lines')}
						/>
					</Hide>
				)}
			</GridItem>
			{displayAvatarUrl ? (
				<GridItem area="headline" layoutType={layoutType}>
					<div css={avatarHeadlineWrapper}>
						<ArticleHeadline
							format={format}
							headlineString={article.headline}
							tags={article.tags}
							byline={article.byline}
							webPublicationDateDeprecated={
								article.webPublicationDateDeprecated
							}
							hasAvatar={displayAvatarUrl}
							starRating={article.starRating}
						/>

						<div>
							{!!avatarUrl && (
								<div css={avatarPositionStyles}>
									<ContributorAvatar
										imageSrc={avatarUrl}
										imageAlt={article.byline ?? ''}
									/>
								</div>
							)}
							<StraightLines
								count={8}
								cssOverrides={css`
									display: block;
								`}
								color={themePalette('--straight-lines')}
							/>
						</div>
					</div>
				</GridItem>
			) : (
				<GridItem area="headline" layoutType={layoutType}>
					<ArticleHeadline
						format={format}
						headlineString={article.headline}
						tags={article.tags}
						byline={article.byline}
						webPublicationDateDeprecated={
							article.webPublicationDateDeprecated
						}
						starRating={article.starRating}
					/>
				</GridItem>
			)}
			<GridItem area="standfirst" layoutType={layoutType}>
				<Standfirst format={format} standfirst={article.standfirst} />
			</GridItem>
			<GridItem area="meta" layoutType={layoutType} element="aside">
				<div css={stretchLines}>
					{isWeb &&
					format.theme === ArticleSpecial.Labs &&
					format.design !== ArticleDesign.Video ? (
						<GuardianLabsLines />
					) : !displayAvatarUrl ? (
						<DecideLines
							format={format}
							color={themePalette('--article-border')}
						/>
					) : null}
				</div>
				{isApps ? (
					<>
						<Hide from="leftCol">
							<ArticleMetaApps
								branding={branding}
								format={format}
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
							{!!article.affiliateLinksDisclaimer && (
								<AffiliateDisclaimer />
							)}
						</Hide>
					</>
				) : (
					<>
						<ArticleMeta
							branding={branding}
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
							isCommentable={article.isCommentable}
							discussionApiUrl={article.config.discussionApiUrl}
							shortUrlId={article.config.shortUrlId}
							mainMediaElements={article.mainMediaElements}
							webPublicationDate={article.webPublicationDate}
						/>
						{!!article.affiliateLinksDisclaimer && (
							<AffiliateDisclaimer />
						)}
					</>
				)}
			</GridItem>
			<GridItem area="body" layoutType={layoutType}>
				{/* Only show Listen to Article button on App landscape views */}
				{isApps && (
					<Hide until="leftCol">
						{!isVideo && (
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
								isMinuteArticle={
									article.pageType.isMinuteArticle
								}
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
				css={css`
					padding-top: ${isMedia ? 0 : 6}px;
					${from.desktop} {
						padding-bottom: ${isMedia ? 41 : 0}px;
					}
				`}
			>
				{!isPicture && (
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
							/>
						</Island>
					</Hide>
				)}
			</GridItem>
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
