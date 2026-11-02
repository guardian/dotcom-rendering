import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { AppsEpic } from '../../components/AppsEpic.island';
import { ArticleBody } from '../../components/ArticleBody';
import { ArticleContainer } from '../../components/ArticleContainer';
import { FootballMatchInfoWrapper } from '../../components/FootballMatchInfoWrapper.island';
import { Island } from '../../components/Island';
import { ListenToArticle } from '../../components/ListenToArticle.island';
import { SlotBodyEnd } from '../../components/SlotBodyEnd.island';
import { SubMeta } from '../../components/SubMeta';
import type { ArticleFormat } from '../../lib/articleFormat';
import { getZIndex } from '../../lib/getZIndex';
import { safeParseURL } from '../../lib/parse';
import { palette as themePalette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { ArticleGridLayout } from './deriveArticleGridLayout';
import { GridItem } from './GridItem';

export const ArticleGridBody = ({
	article,
	format,
	renderingTarget,
	layout,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	layout: ArticleGridLayout;
}) => {
	const {
		contributionsServiceUrl,
		footballMatchStatsUrl,
		isApps,
		isFootballMatchReport,
		isLabs,
		layoutType,
		renderAds,
		showBodyEndSlot,
		tableOfContentsStyle,
	} = layout;

	return (
		<GridItem
			area="body"
			layoutType={layoutType}
			format={format}
			css={css`
				z-index: ${getZIndex('bodyArea')};
			`}
		>
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
								<ListenToArticle articleId={article.pageId} />
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
					host={article.config.host}
					pageId={article.pageId}
					webTitle={article.webTitle}
					ajaxUrl={article.config.ajaxUrl}
					switches={article.config.switches}
					isSensitive={article.config.isSensitive}
					isAdFreeUser={article.isAdFreeUser}
					sectionId={article.config.section}
					shouldHideReaderRevenue={article.shouldHideReaderRevenue}
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
					<Island priority="critical" defer={{ until: 'visible' }}>
						<AppsEpic />
					</Island>
				)}

				{showBodyEndSlot && (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<SlotBodyEnd
							contentType={article.contentType}
							contributionsServiceUrl={contributionsServiceUrl}
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
	);
};

const MatchInfoContainer = ({
	isMatchReport,
	footballMatchStatsUrl,
}: {
	isMatchReport: boolean;
	footballMatchStatsUrl: string | undefined;
}) => {
	if (!isMatchReport || !footballMatchStatsUrl) return null;

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
			<FootballMatchInfoWrapper matchStatsUrl={footballMatchStatsUrl} />
		</Island>
	);
};
