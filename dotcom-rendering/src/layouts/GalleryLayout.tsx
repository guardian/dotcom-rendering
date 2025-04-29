import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { AdSlot } from '../components/AdSlot.web';
import { ArticleHeadline } from '../components/ArticleHeadline';
import { ArticleMeta } from '../components/ArticleMeta.web';
import { GalleryImage } from '../components/GalleryImage';
import { GalleryMainMediaCaption } from '../components/GalleryMainMediaCaption';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsHeaderFull } from '../components/LabsHeaderFull';
import { MainMedia } from '../components/MainMedia';
import { Masthead } from '../components/Masthead/Masthead';
import { MostViewedFooterData } from '../components/MostViewedFooterData.importable';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { OnwardsUpper } from '../components/OnwardsUpper.importable';
import { Section } from '../components/Section';
import { Standfirst } from '../components/Standfirst';
import { SubMeta } from '../components/SubMeta';
import { grid } from '../grid';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { NavType } from '../model/extract-nav';
import { palette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import { Stuck } from './lib/stickiness';

interface CommonProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppProps extends CommonProps {
	renderingTarget: 'Apps';
}

const mainStyles = css`
	background-color: ${palette('--article-background')};
`;

const headerStyles = css`
	${grid.container};

	grid-auto-flow: row dense;
	background-color: ${palette('--article-inner-background')};
	border-bottom: 1px solid ${palette('--article-border')};

	${from.tablet} {
		&::after {
			${grid.between('grid-start', 'centre-column-start')}
			grid-row: 5 / span 5;
			content: '';
			border-right: 1px solid ${palette('--article-border')};
		}
	}

	${from.leftCol} {
		&::after {
			transform: translateX(10px);
		}
	}
`;

const bodyStyles = css`
	${grid.container};
`;

export const GalleryLayout = (props: WebProps | AppProps) => {
	const { article, format, renderingTarget } = props;

	const isWeb = renderingTarget === 'Web';

	const isLabs = format.theme === ArticleSpecial.Labs;

	const renderAds = isWeb && canRenderAds(article);

	const contributionsServiceUrl = getContributionsServiceUrl(article);

	const { absoluteServerTimes = false } = article.config.switches;

	return (
		<>
			{isWeb && (
				<div data-print-layout="hide" id="bannerandheader">
					{renderAds && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot
									isPaidContent={
										!!article.config.isPaidContent
									}
									shouldHideReaderRevenue={
										!!article.config.shouldHideReaderRevenue
									}
								/>
							</Section>
						</Stuck>
					)}
					<Masthead
						nav={props.NAV}
						editionId={article.editionId}
						idUrl={article.config.idUrl}
						mmaUrl={article.config.mmaUrl}
						discussionApiUrl={article.config.discussionApiUrl}
						idApiUrl={article.config.idApiUrl}
						contributionsServiceUrl={contributionsServiceUrl}
						showSubNav={false}
						showSlimNav={true}
						hasPageSkin={false}
						hasPageSkinContentSelfConstrain={true}
						pageId={article.pageId}
					/>
				</div>
			)}
			<main css={mainStyles}>
				<LabsHeaderFull editionId={article.editionId} format={format} />
				<header css={headerStyles}>
					<MainMedia
						abTests={article.config.abTests}
						ajaxUrl={article.config.ajaxUrl}
						editionId={article.editionId}
						elements={article.mainMediaElements}
						format={format}
						isAdFreeUser={article.isAdFreeUser}
						isSensitive={article.config.isSensitive}
						pageId={article.pageId}
						switches={article.config.switches}
						webTitle={article.webTitle}
					/>
					<ArticleHeadline
						format={format}
						headlineString={article.headline}
						webPublicationDateDeprecated={
							article.webPublicationDateDeprecated
						}
						tags={article.tags}
					/>
					<Standfirst
						format={format}
						standfirst={article.standfirst}
					/>
					<GalleryMainMediaCaption
						elements={article.mainMediaElements}
					/>
					<ArticleMeta
						branding={
							article.commercialProperties[article.editionId]
								.branding
						}
						format={format}
						pageId={article.pageId}
						webTitle={article.webTitle}
						byline={article.byline}
						tags={article.tags}
						primaryDateline={article.webPublicationDateDisplay}
						secondaryDateline={
							article.webPublicationSecondaryDateDisplay
						}
						isCommentable={article.isCommentable}
						discussionApiUrl={article.config.discussionApiUrl}
						shortUrlId={article.config.shortUrlId}
					/>
				</header>
				<div css={bodyStyles}>
					{article.blocks
						.flatMap((block) => block.elements)
						.filter(
							(element) =>
								element._type ===
								'model.dotcomrendering.pageElements.ImageBlockElement',
						)
						.map((element, idx) => (
							<GalleryImage
								image={element}
								format={format}
								pageId={article.pageId}
								webTitle={article.webTitle}
								key={idx}
							/>
						))}
				</div>
				<SubMeta
					format={format}
					pageId={article.pageId}
					showBottomSocialButtons={article.showBottomSocialButtons}
					webTitle={article.webTitle}
					webUrl={article.webURL}
					subMetaKeywordLinks={article.subMetaKeywordLinks}
					subMetaSectionLinks={article.subMetaSectionLinks}
				/>
				{renderAds && !isLabs && (
					<Section
						fullWidth={true}
						data-print-layout="hide"
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={palette('--ad-background')}
						element="aside"
					>
						<AdSlot
							data-print-layout="hide"
							position="merchandising-high"
							display={format.display}
						/>
					</Section>
				)}

				<Island priority="feature" defer={{ until: 'visible' }}>
					<OnwardsUpper
						ajaxUrl={article.config.ajaxUrl}
						hasRelated={article.hasRelated}
						hasStoryPackage={article.hasStoryPackage}
						isAdFreeUser={article.isAdFreeUser}
						pageId={article.pageId}
						isPaidContent={!!article.config.isPaidContent}
						showRelatedContent={article.config.showRelatedContent}
						keywordIds={article.config.keywordIds}
						contentType={article.contentType}
						tags={article.tags}
						format={format}
						pillar={format.theme}
						editionId={article.editionId}
						shortUrlId={article.config.shortUrlId}
						discussionApiUrl={article.config.discussionApiUrl}
						absoluteServerTimes={absoluteServerTimes}
						renderingTarget={renderingTarget}
					/>
				</Island>

				{!article.config.isPaidContent && (
					<Section
						title="Most viewed"
						padContent={false}
						verticalMargins={false}
						element="aside"
						data-print-layout="hide"
						data-link-name="most-popular"
						data-component="most-popular"
						backgroundColour={palette(
							'--article-section-background',
						)}
						borderColour={palette('--article-border')}
					>
						<MostViewedFooterLayout renderAds={renderAds}>
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<MostViewedFooterData
									sectionId={article.config.section}
									ajaxUrl={article.config.ajaxUrl}
									edition={article.editionId}
								/>
							</Island>
						</MostViewedFooterLayout>
					</Section>
				)}

				{renderAds && !isLabs && (
					<Section
						fullWidth={true}
						data-print-layout="hide"
						padSides={false}
						showTopBorder={false}
						showSideBorders={false}
						backgroundColour={palette('--ad-background')}
						element="aside"
					>
						<AdSlot
							position="merchandising"
							display={format.display}
						/>
					</Section>
				)}
			</main>
		</>
	);
};
