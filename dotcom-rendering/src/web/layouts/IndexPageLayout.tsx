import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import {
	brandBackground,
	brandBorder,
	brandLine,
	neutral,
} from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { NavType } from '../../model/extract-nav';
import type { DCRCollectionType, DCRFrontType } from '../../types/front';
import type { DCRIndexPageType } from '../../types/indexPage';
import { AdSlot } from '../components/AdSlot';
import { Badge } from '../components/Badge';
import { CPScottHeader } from '../components/CPScottHeader';
import { Footer } from '../components/Footer';
import { FrontMostViewed } from '../components/FrontMostViewed';
import { FrontSection } from '../components/FrontSection';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { SubNav } from '../components/SubNav.importable';
import { TrendingTopics } from '../components/TrendingTopics';
import { canRenderAds } from '../lib/canRenderAds';
import { decidePalette } from '../lib/decidePalette';
import {
	getMerchHighPosition,
	getMobileAdPositions,
} from '../lib/getAdPositions';
import { Stuck } from './lib/stickiness';

interface Props {
	indexPage: DCRIndexPageType;
	NAV: NavType;
}

const spaces = / /g;
/** TODO: Confirm with is a valid way to generate component IDs. */
const ophanComponentId = (name: string) =>
	name.toLowerCase().replace(spaces, '-');

// const decideAdSlot = (
// 	index: number,
// 	isNetworkFront: boolean | undefined,
// 	collectionCount: number,
// 	isPaidContent: boolean | undefined,
// 	format: ArticleDisplay,
// 	mobileAdPositions: (number | undefined)[],
// ) => {
// 	const minContainers = isPaidContent ? 1 : 2;
// 	if (
// 		collectionCount > minContainers &&
// 		index === getMerchHighPosition(collectionCount, isNetworkFront)
// 	) {
// 		return (
// 			<AdSlot
// 				data-print-layout="hide"
// 				position="merchandising-high"
// 				display={format}
// 			/>
// 		);
// 	} else if (mobileAdPositions.includes(index)) {
// 		return (
// 			<Hide from="tablet">
// 				<AdSlot
// 					index={index}
// 					data-print-layout="hide"
// 					position="mobile-front"
// 					display={format}
// 				/>
// 			</Hide>
// 		);
// 	}
// 	return null;
// };

export const IndexPageLayout = ({ indexPage, NAV }: Props) => {
	const {
		config: { isPaidContent },
	} = indexPage;

	const isInEuropeTest =
		indexPage.config.abTests.europeNetworkFrontVariant === 'variant';

	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};

	const palette = decidePalette(format);

	// const merchHighPosition = getMerchHighPosition(
	// 	indexPage.pressedPage.collections.length,
	// 	indexPage.isNetworkFront,
	// );

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = canRenderAds(indexPage);

	// const mobileAdPositions = renderAds
	// 	? getMobileAdPositions(indexPage.pressedPage.collections, merchHighPosition)
	// 	: [];

	return (
		<>
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
								<HeaderAdSlot display={format.display} />
							</Section>
						</Stuck>
					)}

					<Section
						fullWidth={true}
						shouldCenter={false}
						showTopBorder={false}
						showSideBorders={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="header"
					>
						<Header
							editionId={indexPage.editionId}
							idUrl={indexPage.config.idUrl}
							mmaUrl={indexPage.config.mmaUrl}
							discussionApiUrl={indexPage.config.discussionApiUrl}
							urls={indexPage.nav.readerRevenueLinks.header}
							remoteHeader={
								!!indexPage.config.switches.remoteHeader
							}
							contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
							idApiUrl="https://idapi.theguardian.com/" // TODO: read this from somewhere as in other layouts
							isInEuropeTest={isInEuropeTest}
							headerTopBarSearchCapiSwitch={
								!!indexPage.config.switches
									.headerTopBarSearchCapi
							}
						/>
					</Section>
					<Section
						fullWidth={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padSides={false}
						backgroundColour={brandBackground.primary}
						element="nav"
					>
						<Nav
							nav={NAV}
							format={format}
							subscribeUrl={
								indexPage.nav.readerRevenueLinks.header
									.subscribe
							}
							editionId={indexPage.editionId}
							headerTopBarSwitch={
								!!indexPage.config.switches.headerTopNav
							}
							isInEuropeTest={isInEuropeTest}
						/>
					</Section>
					{NAV.subNavSections && (
						<>
							<Section
								fullWidth={true}
								showTopBorder={false}
								backgroundColour={palette.background.article}
								padSides={false}
								element="aside"
							>
								<Island deferUntil="idle">
									<SubNav
										subNavSections={NAV.subNavSections}
										currentNavLink={NAV.currentNavLink}
										format={format}
									/>
								</Island>
							</Section>
							<Section
								fullWidth={true}
								backgroundColour={palette.background.article}
								padSides={false}
								showTopBorder={false}
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

			<main data-layout="FrontLayout" id="maincontent">
				{/* {indexPage.pressedPage.collections.map((collection, index) => {
					// Backfills should be added to the end of any curated content
					const trails = collection.curated.concat(
						collection.backfill,
					);
					const [trail] = trails;

					// There are some containers that have zero trails. We don't want to render these
					if (!trail) return null;

					const ophanName = ophanComponentId(collection.displayName);
					const ophanComponentLink = `container-${index} | ${ophanName}`;

					if (collection.collectionType === 'fixed/thrasher') {
						return (
							<>
								<Section
									fullWidth={true}
									padSides={false}
									padBottom={true}
									showTopBorder={false}
									showSideBorders={true}
									ophanComponentLink={ophanComponentLink}
									ophanComponentName={ophanName}
									containerName={collection.collectionType}
								>
									<Snap snapData={trail.snapData} />
								</Section>
								{decideAdSlot(
									index,
									indexPage.isNetworkFront,
									indexPage.pressedPage.collections.length,
									indexPage.pressedPage.frontProperties
										.isPaidContent,
									format.display,
									mobileAdPositions,
								)}
							</>
						);
					}

					if (
						collection.collectionType === 'news/most-popular' &&
						!isPaidContent &&
						indexPage.config.switches.mostViewedFronts
					) {
						return (
							<>
								<Section
									key={ophanName}
									title="Most viewed"
									showTopBorder={index > 0}
									padContent={false}
									verticalMargins={false}
									url={collection.href}
									ophanComponentLink={ophanComponentLink}
									ophanComponentName={ophanName}
									containerName={collection.collectionType}
									containerPalette={
										collection.containerPalette
									}
									sectionId={ophanName}
									showDateHeader={
										collection.config.showDateHeader
									}
									editionId={indexPage.editionId}
									treats={collection.treats}
									data-print-layout="hide"
									element="aside"
								>
									<FrontMostViewed
										displayName={collection.displayName}
										trails={trails}
										mostViewed={indexPage.mostViewed}
										mostCommented={indexPage.mostCommented}
										mostShared={indexPage.mostShared}
										isNetworkFront={indexPage.isNetworkFront}
									/>
								</Section>
								{decideAdSlot(
									index,
									indexPage.isNetworkFront,
									indexPage.pressedPage.collections.length,
									indexPage.pressedPage.frontProperties
										.isPaidContent,
									format.display,
									mobileAdPositions,
								)}
							</>
						);
					}

					return (
						<>
							<FrontSection
								key={ophanName}
								title={collection.displayName}
								description={collection.description}
								showTopBorder={index > 0}
								url={
									collection.href
										? `https://www.theguardian.com/${collection.href}`
										: undefined
								}
								ophanComponentLink={ophanComponentLink}
								ophanComponentName={ophanName}
								containerName={collection.collectionType}
								containerPalette={collection.containerPalette}
								toggleable={isToggleable(
									index,
									collection,
									indexPage.isNetworkFront,
								)}
								leftContent={
									(indexPage.config.pageId ===
										'uk/commentisfree' ||
										indexPage.config.pageId ===
											'au/commentisfree') &&
									collection.displayName === 'Opinion' && (
										<CPScottHeader />
									)
								}
								badge={showBadge(collection.displayName)}
								sectionId={ophanName}
								collectionId={collection.id}
								pageId={indexPage.pressedPage.id}
								showDateHeader={
									collection.config.showDateHeader
								}
								editionId={indexPage.editionId}
								treats={collection.treats}
								canShowMore={collection.canShowMore}
								ajaxUrl={indexPage.config.ajaxUrl}
							>
								<DecideContainer
									trails={trails}
									index={index}
									groupedTrails={collection.grouped}
									containerType={collection.collectionType}
									containerPalette={
										collection.containerPalette
									}
									showAge={
										collection.displayName === 'Headlines'
									}
									renderAds={renderAds}
								/>
							</FrontSection>
							{renderAds &&
								decideAdSlot(
									index,
									indexPage.isNetworkFront,
									indexPage.pressedPage.collections.length,
									indexPage.pressedPage.frontProperties
										.isPaidContent,
									format.display,
									mobileAdPositions,
								)}
						</>
					);
				})} */}
			</main>
			<Section
				fullWidth={true}
				showTopBorder={false}
				data-component="trending-topics"
			>
				<TrendingTopics trendingTopics={indexPage.trendingTopics} />
			</Section>
			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				showTopBorder={false}
				showSideBorders={false}
				backgroundColour={neutral[93]}
				element="aside"
			>
				<AdSlot position="merchandising" display={format.display} />
			</Section>

			{NAV.subNavSections && (
				<Section
					fullWidth={true}
					showTopBorder={false}
					data-print-layout="hide"
					padSides={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
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
					pageFooter={indexPage.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={indexPage.nav.readerRevenueLinks.header}
					editionId={indexPage.editionId}
					contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
				/>
			</Section>
		</>
	);
};
