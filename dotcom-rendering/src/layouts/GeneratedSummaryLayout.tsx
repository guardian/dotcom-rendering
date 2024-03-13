import { css } from '@emotion/react';
import { ArticleDisplay } from '@guardian/libs';
import {
	background,
	brandBackground,
	brandBorder,
	brandLine,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { AdSlot } from '../components/AdSlot.web';
import {
	decideFrontsBannerAdSlot,
	decideMerchandisingSlot,
	decideMerchHighAndMobileAdSlots,
} from '../components/DecideFrontsAdSlots';
import { Footer } from '../components/Footer';
import { GeneratedSummary } from '../components/GeneratedSummary';
import { GeneratedSummarySection } from '../components/GeneratedSummarySection';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import { TrendingTopics } from '../components/TrendingTopics';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import {
	getFrontsBannerAdPositions,
	getMobileAdPositions,
} from '../lib/getFrontsAdPositions';
import type { NavType } from '../model/extract-nav';
import type { DCRFrontType } from '../types/front';
import { pageSkinContainer } from './lib/pageSkin';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	front: DCRFrontType;
	NAV: NavType;
}

const spaces = / /g;
/** TODO: Confirm with is a valid way to generate component IDs. */
const ophanComponentId = (name: string) =>
	name.toLowerCase().replace(spaces, '-');

export const GeneratedSummaryLayout = ({ front, NAV }: Props) => {
	const {
		config: { isPaidContent, hasPageSkin: hasPageSkinConfig, pageId },
	} = front;

	const renderAds = canRenderAds(front);

	const hasPageSkin = renderAds && hasPageSkinConfig;

	const mobileAdPositions = renderAds
		? getMobileAdPositions(front.pressedPage.collections)
		: [];

	const desktopAdPositions = renderAds
		? getFrontsBannerAdPositions(
				front.pressedPage.collections.map(
					({
						collectionType,
						containerPalette,
						displayName,
						grouped,
					}) => ({
						collectionType,
						containerPalette,
						displayName,
						grouped,
					}),
				),
				pageId,
		  )
		: [];

	const showMostPopular =
		front.config.switches.deeplyRead &&
		front.isNetworkFront &&
		front.deeplyRead &&
		front.deeplyRead.length > 0;

	const contributionsServiceUrl = getContributionsServiceUrl(front);

	return (
		<>
			<div>definitely now the thing</div>
			<div data-print-layout="hide" id="bannerandheader">
				<>
					{renderAds && (
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot />
							</Section>
						</Stuck>
					)}

					{hasPageSkin && (
						<AdSlot
							data-print-layout="hide"
							position="pageskin"
							display={ArticleDisplay.Standard}
							hasPageskin={hasPageSkin}
						/>
					)}

					{!isPaidContent && (
						<Section
							fullWidth={true}
							shouldCenter={false}
							showTopBorder={false}
							showSideBorders={false}
							padSides={false}
							backgroundColour={brandBackground.primary}
							element="header"
							hasPageSkin={hasPageSkin}
							hasPageSkinContentSelfConstrain={true}
						>
							<Header
								editionId={front.editionId}
								idUrl={front.config.idUrl}
								mmaUrl={front.config.mmaUrl}
								discussionApiUrl={front.config.discussionApiUrl}
								urls={front.nav.readerRevenueLinks.header}
								remoteHeader={
									!!front.config.switches.remoteHeader
								}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
								idApiUrl={front.config.idApiUrl}
								headerTopBarSearchCapiSwitch={
									!!front.config.switches
										.headerTopBarSearchCapi
								}
								hasPageSkin={hasPageSkin}
							/>
						</Section>
					)}

					<Section
						fullWidth={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="nav"
						hasPageSkin={hasPageSkin}
						hasPageSkinContentSelfConstrain={true}
					>
						<Nav
							nav={NAV}
							subscribeUrl={
								front.nav.readerRevenueLinks.header.subscribe
							}
							selectedPillar={NAV.selectedPillar}
							editionId={front.editionId}
							headerTopBarSwitch={
								!!front.config.switches.headerTopNav
							}
							hasPageSkin={hasPageSkin}
						/>
					</Section>
					{NAV.subNavSections && (
						<>
							<Section
								fullWidth={true}
								padSides={false}
								element="aside"
								hasPageSkin={hasPageSkin}
							>
								<Island
									priority="enhancement"
									defer={{ until: 'idle' }}
								>
									<SubNav
										subNavSections={NAV.subNavSections}
										currentNavLink={NAV.currentNavLink}
										linkHoverColour={
											sourcePalette.news[400]
										}
										borderColour={sourcePalette.neutral[46]}
									/>
								</Island>
							</Section>
							<Section
								fullWidth={true}
								padSides={false}
								showTopBorder={false}
								hasPageSkin={hasPageSkin}
							>
								<StraightLines
									cssOverrides={css`
										display: block;
									`}
									count={4}
								/>
							</Section>
						</>
					)}
				</>
			</div>
			<main
				data-layout="FrontLayout"
				data-link-name={`Front | /${front.pressedPage.id}`}
				id="maincontent"
				css={hasPageSkin && pageSkinContainer}
			>
				{front.pressedPage.collections.map((collection, index) => {
					// Backfills should be added to the end of any curated content
					const trails = collection.curated.concat(
						collection.backfill,
					);
					const [trail] = trails;

					// There are some containers that have zero trails. We don't want to render these
					if (!trail) return null;

					const ophanName = ophanComponentId(collection.displayName);
					const ophanComponentLink = `container-${
						index + 1
					} | ${ophanName}`;
					const mostPopularTitle = 'Most popular';

					collection.collectionType === 'news/most-popular' &&
						!isPaidContent &&
						front.config.switches.mostViewedFronts;
					const deeplyReadData = showMostPopular
						? front.deeplyRead
						: undefined;

					return (
						<>
							{decideFrontsBannerAdSlot(
								renderAds,
								hasPageSkin,
								index,
								desktopAdPositions,
							)}
							<GeneratedSummarySection
								toggleable={true}
								key={ophanName}
								title={
									showMostPopular
										? mostPopularTitle
										: 'Most viewed'
								}
								showTopBorder={index > 0}
								url={collection.href}
								ophanComponentLink={ophanComponentLink}
								ophanComponentName={
									showMostPopular
										? ophanComponentId(mostPopularTitle)
										: ophanName
								}
								containerName={collection.collectionType}
								containerPalette={collection.containerPalette}
								sectionId={ophanName}
								showDateHeader={
									collection.config.showDateHeader
								}
								editionId={front.editionId}
								treats={collection.treats}
								data-print-layout="hide"
								hasPageSkin={hasPageSkin}
								discussionApiUrl={front.config.discussionApiUrl}
							>
								<GeneratedSummary
									displayName={collection.displayName}
									trails={trails}
									mostViewed={front.mostViewed}
									isNetworkFront={front.isNetworkFront}
									deeplyRead={deeplyReadData}
									editionId={front.editionId}
								/>
							</GeneratedSummarySection>
							{decideMerchHighAndMobileAdSlots(
								renderAds,
								index,
								front.pressedPage.collections.length,
								front.pressedPage.frontProperties.isPaidContent,
								mobileAdPositions,
								hasPageSkin,
							)}
						</>
					);
				})}
			</main>

			<Section
				fullWidth={true}
				showTopBorder={false}
				ophanComponentName="trending-topics"
				data-component="trending-topics"
				hasPageSkin={hasPageSkin}
			>
				<TrendingTopics trendingTopics={front.trendingTopics} />
			</Section>

			{decideMerchandisingSlot(renderAds, hasPageSkin)}

			{NAV.subNavSections && (
				<Section
					fullWidth={true}
					showTopBorder={hasPageSkin}
					data-print-layout="hide"
					padSides={false}
					element="aside"
					backgroundColour={
						hasPageSkin ? background.primary : undefined
					}
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							linkHoverColour={sourcePalette.news[400]}
							borderColour={sourcePalette.neutral[46]}
						/>
					</Island>
				</Section>
			)}

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				showTopBorder={false}
				element="footer"
			>
				<Footer
					pageFooter={front.pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={front.nav.readerRevenueLinks.header}
					editionId={front.editionId}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</Section>

			<BannerWrapper data-print-layout="hide">
				<Island priority="feature" defer={{ until: 'idle' }}>
					<StickyBottomBanner
						contentType={front.config.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={front.config.idApiUrl}
						isMinuteArticle={false}
						isPaidContent={!!front.config.isPaidContent}
						isPreview={front.config.isPreview}
						isSensitive={front.config.isSensitive}
						keywordIds={front.config.keywordIds} // a front doesn't really have tags, but frontend generates a keywordId
						pageId={front.pressedPage.id}
						sectionId={front.config.section}
						shouldHideReaderRevenue={false} // never defined for fronts
						remoteBannerSwitch={
							!!front.config.switches.remoteBanner
						}
						tags={[]} // a front doesn't have tags
					/>
				</Island>
			</BannerWrapper>
		</>
	);
};
