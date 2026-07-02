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
	ArticleSpecial,
} from '../lib/articleFormat';
import { getContributionsServiceUrl } from '../lib/contributions';
import { safeParseURL } from '../lib/parse';
import { parse } from '../lib/slot-machine-flags';
import { palette as themePalette } from '../palette';
import {
	type Area,
	gridItemCss,
	type LayoutType,
} from './lib/articleArrangements';
import type { AppProps, WebProps } from './StandardLayout';

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

export const StandardLayoutContentGrid = ({
	props,
	layoutType,
}: {
	props: WebProps | AppProps;
	layoutType: LayoutType;
}) => {
	const { article, format, renderingTarget } = props;
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

	const isVideo = format.design === ArticleDesign.Video;

	const footballMatchUrl =
		article.matchType === 'FootballMatchType'
			? article.matchUrl
			: undefined;

	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchUrl;

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
			<GridItem area="media" layoutType={layoutType}>
				<MainMedia
					format={format}
					elements={article.mainMediaElements}
					host={host}
					pageId={article.pageId}
					webTitle={article.webTitle}
					ajaxUrl={article.config.ajaxUrl}
					abTests={article.config.abTests}
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
			<GridItem area="title" layoutType={layoutType} element="aside">
				<ArticleTitle
					format={format}
					tags={article.tags}
					sectionLabel={article.sectionLabel}
					sectionUrl={article.sectionUrl}
					guardianBaseURL={article.guardianBaseURL}
					isMatch={!!footballMatchUrl}
				/>
			</GridItem>
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
			<GridItem area="standfirst" layoutType={layoutType}>
				<Standfirst format={format} standfirst={article.standfirst} />
			</GridItem>
			<GridItem area="meta" layoutType={layoutType} element="aside">
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
						abTests={article.config.abTests}
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
