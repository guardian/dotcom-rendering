import { css, Global } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { AdSlot, MobileStickyContainer } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { InteractivesDisableArticleSwipe } from '../components/InteractivesDisableArticleSwipe.importable';
import { InteractivesNativePlatformWrapper } from '../components/InteractivesNativePlatformWrapper.importable';
import { Island } from '../components/Island';
import { LabsHeader } from '../components/LabsHeader';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import { type ArticleFormat, ArticleSpecial } from '../lib/articleFormat';
import { canRenderAds } from '../lib/canRenderAds';
import type { EditionId } from '../lib/edition';
import { getZIndex } from '../lib/getZIndex';
import { decideLanguage, decideLanguageDirection } from '../lib/lang';
import { renderElement } from '../lib/renderElement';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { ArticleDeprecated } from '../types/article';
import type { ServerSideTests, Switches } from '../types/config';
import type { FEElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { interactiveGlobalStyles } from './lib/interactiveLegacyStyling';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface CommonProps {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
}

interface WebProps extends CommonProps {
	NAV: NavType;
	renderingTarget: 'Web';
}

interface AppsProps extends CommonProps {
	renderingTarget: 'Apps';
}

type HeaderProps = {
	article: ArticleDeprecated;
	NAV: NavType;
	renderAds?: boolean;
};

type RendererProps = {
	format: ArticleFormat;
	elements: FEElement[];
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	editionId: EditionId;
	shouldHideAds: boolean;
};

const Renderer = ({
	format,
	elements,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	abTests,
	switches,
	editionId,
	shouldHideAds,
}: RendererProps) => {
	// const cleanedElements = elements.map(element =>
	//     'html' in element ? { ...element, html: clean(element.html) } : element,
	// );
	// ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
	//    But should be soon.
	const output = elements.map((element, index) => {
		const el = renderElement({
			format,
			element,
			host,
			index,
			isMainMedia: false,
			pageId,
			webTitle,
			ajaxUrl,
			isAdFreeUser,
			isSensitive,
			abTests,
			switches,
			editionId,
			shouldHideAds,
		});

		switch (element._type) {
			// Here we think it makes sense not to wrap every `p` inside a `figure`
			case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				return el;

			default:
				return (
					<figure
						id={
							'elementId' in element
								? element.elementId
								: undefined
						}
						key={index}
					>
						{el}
					</figure>
				);
		}
	});

	const adStyles = css`
		${from.tablet} {
			.mobile-only .ad-slot {
				display: none;
			}
		}
		${until.tablet} {
			.hide-until-tablet .ad-slot {
				display: none;
			}
		}
	`;

	return <div css={adStyles}>{output}</div>;
};

const NavHeader = ({ article, NAV, renderAds }: HeaderProps) => {
	return (
		<section
			/* Note, some interactives require this - e.g. https://www.theguardian.com/environment/ng-interactive/2015/jun/05/carbon-bomb-the-coal-boom-choking-china. */
			css={css`
				z-index: ${getZIndex('fullPageInteractiveHeaderWrapper')};
				position: relative;
			`}
		>
			{renderAds && (
				<Stuck>
					<div data-print-layout="hide">
						<Section
							fullWidth={true}
							showTopBorder={false}
							showSideBorders={false}
							padSides={false}
							shouldCenter={false}
							element="aside"
						>
							<HeaderAdSlot />
						</Section>
					</div>
				</Stuck>
			)}

			<Masthead
				nav={NAV}
				editionId={article.editionId}
				idUrl={article.config.idUrl}
				mmaUrl={article.config.mmaUrl}
				discussionApiUrl={article.config.discussionApiUrl}
				idApiUrl={article.config.idApiUrl}
				contributionsServiceUrl={article.contributionsServiceUrl}
				showSubNav={false}
				showSlimNav={true}
				hasPageSkin={false}
				hasPageSkinContentSelfConstrain={false}
				pageId={article.pageId}
				wholePictureLogoSwitch={
					article.config.switches.wholePictureLogo
				}
			/>
		</section>
	);
};

export const FullPageInteractiveLayout = (props: WebProps | AppsProps) => {
	const { article, format, renderingTarget } = props;
	const {
		config: { host, hasSurveyAd },
		editionId,
	} = article;
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';

	const renderAds = canRenderAds(article);

	return (
		<>
			{article.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}
			{isApps && (
				<>
					<Island priority="critical">
						<InteractivesNativePlatformWrapper />
					</Island>
					<Island priority="critical">
						<InteractivesDisableArticleSwipe />
					</Island>
				</>
			)}
			{isWeb && (
				<>
					<header
						css={css`
							background-color: ${themePalette(
								'--article-background',
							)};
						`}
					>
						<NavHeader
							article={article}
							NAV={props.NAV}
							renderAds={renderAds}
						/>

						{format.theme === ArticleSpecial.Labs && (
							<Stuck zIndex="subNavBanner">
								<Section
									fullWidth={true}
									showTopBorder={false}
									padSides={true}
									backgroundColour={sourcePalette.labs[400]}
									borderColour={sourcePalette.neutral[60]}
									sectionId="labs-header"
								>
									<LabsHeader editionId={editionId} />
								</Section>
							</Stuck>
						)}
					</header>

					{renderAds && hasSurveyAd && (
						<AdSlot position="survey" display={format.display} />
					)}
				</>
			)}

			{isApps && format.theme === ArticleSpecial.Labs && (
				<header>
					<Stuck>
						<Section
							fullWidth={true}
							showTopBorder={false}
							padSides={true}
							backgroundColour={sourcePalette.labs[400]}
							borderColour={sourcePalette.neutral[60]}
							sectionId="labs-header"
						>
							<LabsHeader editionId={editionId} />
						</Section>
					</Stuck>
				</header>
			)}

			<Section
				fullWidth={true}
				showTopBorder={false}
				showSideBorders={false}
				shouldCenter={false}
				padSides={false}
				backgroundColour={themePalette('--article-background')}
				element="main"
			>
				<article
					id="maincontent"
					lang={decideLanguage(article.lang)}
					dir={decideLanguageDirection(article.isRightToLeftLang)}
				>
					<Renderer
						format={format}
						elements={
							article.blocks[0] ? article.blocks[0].elements : []
						}
						host={host}
						pageId={article.pageId}
						webTitle={article.webTitle}
						ajaxUrl={article.config.ajaxUrl}
						abTests={article.config.abTests}
						switches={article.config.switches}
						isAdFreeUser={article.isAdFreeUser}
						isSensitive={article.config.isSensitive}
						editionId={article.editionId}
						shouldHideAds={article.shouldHideAds}
					/>
				</article>
			</Section>

			{isWeb && props.NAV.subNavSections && (
				<Section
					fullWidth={true}
					padSides={false}
					backgroundColour={themePalette('--article-background')}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={props.NAV.subNavSections}
							currentNavLink={props.NAV.currentNavLink}
							position="footer"
							isInteractive={true}
						/>
					</Island>
				</Section>
			)}

			{isWeb && (
				<>
					<Section
						fullWidth={true}
						padSides={false}
						backgroundColour={sourcePalette.brand[400]}
						borderColour={sourcePalette.brand[600]}
						showSideBorders={false}
						element="footer"
					>
						<Footer
							pageFooter={article.pageFooter}
							selectedPillar={props.NAV.selectedPillar}
							pillars={props.NAV.pillars}
							urls={article.nav.readerRevenueLinks.header}
							editionId={article.editionId}
						/>
					</Section>

					<BannerWrapper>
						<Island priority="feature" defer={{ until: 'idle' }}>
							<StickyBottomBanner
								contentType={article.contentType}
								contributionsServiceUrl={
									article.contributionsServiceUrl
								}
								idApiUrl={article.config.idApiUrl}
								isMinuteArticle={
									article.pageType.isMinuteArticle
								}
								isPaidContent={article.pageType.isPaidContent}
								isPreview={!!article.config.isPreview}
								isSensitive={article.config.isSensitive}
								pageId={article.pageId}
								sectionId={article.config.section}
								shouldHideReaderRevenue={
									article.shouldHideReaderRevenue
								}
								remoteBannerSwitch={
									!!article.config.switches.remoteBanner
								}
								tags={article.tags}
								host={host}
							/>
						</Island>
					</BannerWrapper>
					<MobileStickyContainer
						contentType={article.contentType}
						pageId={article.pageId}
					/>
				</>
			)}
		</>
	);
};
