import { css, type SerializedStyles } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AffiliateDisclaimer } from '../../components/AffiliateDisclaimer';
import { AppsEpic } from '../../components/AppsEpic.island';
import { ArticleBody } from '../../components/ArticleBody';
import { ArticleContainer } from '../../components/ArticleContainer';
import { ArticleHeadline } from '../../components/ArticleHeadline';
import { ArticleMetaApps } from '../../components/ArticleMeta.apps';
import { ArticleMeta } from '../../components/ArticleMeta.web';
import { ArticleTitle } from '../../components/ArticleTitle';
import { DecideLines } from '../../components/DecideLines';
import { GuardianLabsLines } from '../../components/GuardianLabsLines';
import { Island } from '../../components/Island';
import { ListenToArticle } from '../../components/ListenToArticle.island';
import { MainMedia } from '../../components/MainMedia';
import { MostViewedRightWithAd } from '../../components/MostViewedRightWithAd.island';
import { SlotBodyEnd } from '../../components/SlotBodyEnd.island';
import { Standfirst } from '../../components/Standfirst';
import { SubMeta } from '../../components/SubMeta';
import { grid } from '../../grid';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../../lib/articleFormat';
import { getContributionsServiceUrl } from '../../lib/contributions';
import { parse } from '../../lib/slot-machine-flags';
import type { NavType } from '../../model/extract-nav';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import {
	type Area,
	gridItemCss,
	type LayoutType,
} from '../lib/articleArrangements';

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
	customCss?: SerializedStyles;
	children: React.ReactNode;
}

const GridItem = ({
	area,
	layoutType,
	element: Element = 'div',
	customCss,
	children,
}: GridItemProps) => (
	<Element
		data-gu-name={area}
		css={[gridItemCss(area, layoutType), customCss]}
	>
		{children}
	</Element>
);

interface Props {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	serverTime?: number;
}

interface WebProps extends Props {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends Props {
	renderingTarget: 'Apps';
}

export const InteractiveGridV2 = (props: WebProps | AppProps) => {
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

	return (
		<article
			css={[
				css`
					background-color: ${themePalette('--article-background')};
				`,
				grid.container,
				grid.outerRules(),
				css`
					${from.leftCol} {
						${grid.centreRule(3)}
					}
				`,
			]}
		>
			<GridItem area="media" layoutType="interactive">
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
					hideCaption={false}
					shouldHideAds={article.shouldHideAds}
					contentType={article.contentType}
					contentLayout="InteractiveLayout"
				/>
			</GridItem>
			<GridItem area="title" layoutType="interactive" element="aside">
				<ArticleTitle
					format={format}
					tags={article.tags}
					sectionLabel={article.sectionLabel}
					sectionUrl={article.sectionUrl}
					guardianBaseURL={article.guardianBaseURL}
					isMatch={false}
				/>
			</GridItem>
			<GridItem area="headline" layoutType="interactive">
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
			<GridItem area="standfirst" layoutType="interactive">
				<Standfirst format={format} standfirst={article.standfirst} />
			</GridItem>
			<GridItem
				area="meta"
				layoutType="interactive"
				element="aside"
				customCss={css`
					z-index: 5;
				`}
			>
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
					/>
				)}
			</GridItem>
			<GridItem area="body" layoutType="interactive">
				{/* Only show Listen to Article button on App landscape views */}
				{isApps && (
					<Hide until="leftCol">
						<div
							css={css`
								margin-top: ${space[2]}px;
							`}
						>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<ListenToArticle articleId={article.pageId} />
							</Island>
						</div>
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
								isLabs={false}
								articleEndSlot={
									!!article.config.switches.articleEndSlot
								}
								isSensitive={article.config.isSensitive}
							/>
						</Island>
					)}
					<div
						css={css`
							${grid.container}
						`}
					>
						<div
							css={css`
								${grid.column.centre}
							`}
						>
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
								subMetaKeywordLinks={
									article.subMetaKeywordLinks
								}
								subMetaSectionLinks={
									article.subMetaSectionLinks
								}
								pageId={article.pageId}
								webUrl={article.webURL}
								webTitle={article.webTitle}
								showBottomSocialButtons={
									article.showBottomSocialButtons &&
									renderingTarget === 'Web'
								}
							/>
						</div>
					</div>
				</ArticleContainer>
			</GridItem>
			<GridItem
				area="right-column"
				layoutType="interactive"
				customCss={css`
					padding-top: 6px;
					padding-bottom: 0px;
					z-index: 5;
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
		</article>
	);
};
