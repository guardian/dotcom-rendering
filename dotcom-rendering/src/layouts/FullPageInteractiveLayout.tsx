import { css, Global } from '@emotion/react';
import {
	from,
	palette as sourcePalette,
	until,
} from '@guardian/source/foundations';
import { MobileStickyContainer } from '../components/AdSlot.web';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
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
import { interactiveGlobalStyles } from './lib/interactiveLegacyStyling';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	article: ArticleDeprecated;
	NAV: NavType;
	format: ArticleFormat;
}

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

const NavHeader = ({ article, NAV, format }: Props) => {
	// Typically immersives use the slim nav, but this switch is used to force
	// the full nav - typically during special events such as Project 200, or
	// the Euros. The motivation is to better onboard new visitors; interactives
	// often reach readers who are less familiar with the Guardian.
	const showSlimNav = !article.config.switches.interactiveFullHeaderSwitch;

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = canRenderAds(article);

	return (
		<section
			/* Note, some interactives require this - e.g. https://www.theguardian.com/environment/ng-interactive/2015/jun/05/carbon-bomb-the-coal-boom-choking-china. */
			css={css`
				${getZIndex('fullPageInteractiveHeaderWrapper')};
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
							<HeaderAdSlot
								isPaidContent={!!article.config.isPaidContent}
								shouldHideReaderRevenue={
									!!article.config.shouldHideReaderRevenue
								}
							/>
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
				showSubNav={format.theme !== ArticleSpecial.Labs}
				showSlimNav={showSlimNav}
				hasPageSkin={false}
				hasPageSkinContentSelfConstrain={false}
				pageId={article.pageId}
			/>
		</section>
	);
};

export const FullPageInteractiveLayout = ({ article, NAV, format }: Props) => {
	const {
		config: { host },
		editionId,
	} = article;

	return (
		<>
			{article.isLegacyInteractive && (
				<Global styles={interactiveGlobalStyles} />
			)}
			<header
				css={css`
					background-color: ${themePalette('--article-background')};
				`}
			>
				<NavHeader article={article} NAV={NAV} format={format} />

				{format.theme === ArticleSpecial.Labs && (
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
				)}
			</header>

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
					/>
				</article>
			</Section>

			{NAV.subNavSections && (
				<Section
					fullWidth={true}
					padSides={false}
					backgroundColour={themePalette('--article-background')}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							position="footer"
							isInteractive={true}
						/>
					</Island>
				</Section>
			)}

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
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={article.nav.readerRevenueLinks.footer}
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
						isMinuteArticle={article.pageType.isMinuteArticle}
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
					/>
				</Island>
			</BannerWrapper>
			<MobileStickyContainer
				contentType={article.contentType}
				pageId={article.pageId}
			/>
		</>
	);
};
