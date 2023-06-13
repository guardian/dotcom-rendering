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
import { AdSlot } from '../components/AdSlot';
import { CPScottHeader } from '../components/CPScottHeader';
import { DecideContainer } from '../components/DecideContainer';
import { Footer } from '../components/Footer';
import { FrontMostViewed } from '../components/FrontMostViewed';
import { FrontSection } from '../components/FrontSection';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { LabsSection } from '../components/LabsSection';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { Snap } from '../components/Snap';
import { SnapCssSandbox } from '../components/SnapCssSandbox';
import { SubNav } from '../components/SubNav.importable';
import { TrendingTopics } from '../components/TrendingTopics';
import { canRenderAds } from '../lib/canRenderAds';
import { decidePalette } from '../lib/decidePalette';
import {
	getMerchHighPosition,
	getMobileAdPositions,
} from '../lib/getAdPositions';
import type { NavType } from '../model/extract-nav';
import type { DCRCollectionType, DCRFrontType } from '../types/front';
import { Stuck } from './lib/stickiness';

interface Props {
	front: DCRFrontType;
	NAV: NavType;
}

const spaces = / /g;
/** TODO: Confirm with is a valid way to generate component IDs. */
const ophanComponentId = (name: string) =>
	name.toLowerCase().replace(spaces, '-');

const isNavList = (collection: DCRCollectionType) => {
	return (
		collection.collectionType == 'nav/list' ||
		collection.collectionType == 'nav/media-list'
	);
};

const isToggleable = (
	index: number,
	collection: DCRCollectionType,
	isNetworkFront: boolean,
) => {
	if (isNetworkFront) {
		return (
			collection.displayName.toLowerCase() != 'headlines' &&
			!isNavList(collection)
		);
	} else return index != 0 && !isNavList(collection);
};

const decideAdSlot = (
	renderAds: boolean,
	index: number,
	isNetworkFront: boolean | undefined,
	collectionCount: number,
	isPaidContent: boolean | undefined,
	format: ArticleDisplay,
	mobileAdPositions: (number | undefined)[],
) => {
	if (!renderAds) return null;
	const minContainers = isPaidContent ? 1 : 2;
	if (
		collectionCount > minContainers &&
		index === getMerchHighPosition(collectionCount, isNetworkFront)
	) {
		return (
			<AdSlot
				data-print-layout="hide"
				position="merchandising-high"
				display={format}
			/>
		);
	} else if (mobileAdPositions.includes(index)) {
		return (
			<Hide from="tablet">
				<AdSlot
					index={index}
					data-print-layout="hide"
					position="mobile-front"
					display={format}
				/>
			</Hide>
		);
	}
	return null;
};

export const FrontLayout = ({ front, NAV }: Props) => {
	const {
		config: { isPaidContent, abTests },
	} = front;

	const isInEuropeTest = abTests.europeNetworkFrontVariant === 'variant';

	const theme = isPaidContent ? ArticleSpecial.Labs : ArticlePillar.News;

	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme,
	};

	const palette = decidePalette(format);

	const merchHighPosition = getMerchHighPosition(
		front.pressedPage.collections.length,
		front.isNetworkFront,
	);

	const renderAds = canRenderAds(front);

	const mobileAdPositions = renderAds
		? getMobileAdPositions(front.pressedPage.collections, merchHighPosition)
		: [];

	const showMostPopular =
		front.config.switches.deeplyReadSwitch &&
		front.isNetworkFront &&
		front.deeplyRead &&
		front.deeplyRead.length > 0;

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
							editionId={front.editionId}
							idUrl={front.config.idUrl}
							mmaUrl={front.config.mmaUrl}
							discussionApiUrl={front.config.discussionApiUrl}
							urls={front.nav.readerRevenueLinks.header}
							remoteHeader={!!front.config.switches.remoteHeader}
							contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
							idApiUrl="https://idapi.theguardian.com/" // TODO: read this from somewhere as in other layouts
							isInEuropeTest={isInEuropeTest}
							headerTopBarSearchCapiSwitch={
								!!front.config.switches.headerTopBarSearchCapi
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
								front.nav.readerRevenueLinks.header.subscribe
							}
							editionId={front.editionId}
							headerTopBarSwitch={
								!!front.config.switches.headerTopNav
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
				{front.pressedPage.collections.map((collection, index) => {
					// Backfills should be added to the end of any curated content
					const trails = collection.curated.concat(
						collection.backfill,
					);
					const [trail] = trails;

					// There are some containers that have zero trails. We don't want to render these
					if (!trail) return null;

					const ophanName = ophanComponentId(collection.displayName);
					const ophanComponentLink = `container-${index} | ${ophanName}`;
					const mostPopularTitle = 'Most popular';

					if (collection.collectionType === 'fixed/thrasher') {
						return (
							<>
								{!!trail.embedUri && (
									<SnapCssSandbox snapData={trail.snapData}>
										<Section
											fullWidth={true}
											padSides={false}
											showTopBorder={false}
											showSideBorders={false}
											ophanComponentLink={
												ophanComponentLink
											}
											ophanComponentName={ophanName}
											containerName={
												collection.collectionType
											}
										>
											<Snap snapData={trail.snapData} />
										</Section>
									</SnapCssSandbox>
								)}
								{decideAdSlot(
									renderAds,
									index,
									front.isNetworkFront,
									front.pressedPage.collections.length,
									front.pressedPage.frontProperties
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
						front.config.switches.mostViewedFronts
					) {
						const deeplyReadData = showMostPopular
							? front.deeplyRead
							: undefined;
						return (
							<>
								<Section
									key={ophanName}
									title={
										showMostPopular
											? mostPopularTitle
											: 'Most viewed'
									}
									showTopBorder={index > 0}
									padContent={false}
									verticalMargins={false}
									url={collection.href}
									ophanComponentLink={ophanComponentLink}
									ophanComponentName={
										showMostPopular
											? ophanComponentId(mostPopularTitle)
											: ophanName
									}
									containerName={collection.collectionType}
									containerPalette={
										collection.containerPalette
									}
									sectionId={ophanName}
									showDateHeader={
										collection.config.showDateHeader
									}
									editionId={front.editionId}
									treats={collection.treats}
									data-print-layout="hide"
									element="aside"
								>
									<FrontMostViewed
										displayName={collection.displayName}
										trails={trails}
										mostViewed={front.mostViewed}
										mostCommented={front.mostCommented}
										mostShared={front.mostShared}
										isNetworkFront={front.isNetworkFront}
										deeplyRead={deeplyReadData}
									/>
								</Section>
								{decideAdSlot(
									renderAds,
									index,
									front.isNetworkFront,
									front.pressedPage.collections.length,
									front.pressedPage.frontProperties
										.isPaidContent,
									format.display,
									mobileAdPositions,
								)}
							</>
						);
					}

					if (
						collection.containerPalette === 'Branded' &&
						renderAds
					) {
						const trailsWithoutBranding = collection.badge
							? trails.map((labTrail) => {
									return {
										...labTrail,
										branding: undefined,
									};
							  })
							: trails;

						return (
							<LabsSection
								key={ophanName}
								title={collection.displayName}
								collectionId={collection.id}
								pageId={front.pressedPage.id}
								ajaxUrl={front.config.ajaxUrl}
								sectionId={`container-${ophanName}`}
								ophanComponentName={ophanName}
								ophanComponentLink={ophanComponentLink}
								containerName={collection.collectionType}
								canShowMore={collection.canShowMore}
								url={collection.href}
								badge={collection.badge}
								data-print-layout="hide"
							>
								<DecideContainer
									trails={trailsWithoutBranding}
									index={index}
									groupedTrails={collection.grouped}
									containerType={collection.collectionType}
									containerPalette={
										collection.containerPalette
									}
									renderAds={false}
								/>
							</LabsSection>
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
									front.isNetworkFront,
								)}
								leftContent={
									(front.config.pageId ===
										'uk/commentisfree' ||
										front.config.pageId ===
											'au/commentisfree') &&
									collection.displayName === 'Opinion' && (
										<CPScottHeader />
									)
								}
								badge={collection.badge}
								sectionId={ophanName}
								collectionId={collection.id}
								pageId={front.pressedPage.id}
								showDateHeader={
									collection.config.showDateHeader
								}
								editionId={front.editionId}
								treats={collection.treats}
								canShowMore={collection.canShowMore}
								ajaxUrl={front.config.ajaxUrl}
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
							{decideAdSlot(
								renderAds,
								index,
								front.isNetworkFront,
								front.pressedPage.collections.length,
								front.pressedPage.frontProperties.isPaidContent,
								format.display,
								mobileAdPositions,
							)}
						</>
					);
				})}
			</main>
			<Section
				fullWidth={true}
				showTopBorder={false}
				data-component="trending-topics"
			>
				<TrendingTopics trendingTopics={front.trendingTopics} />
			</Section>
			{renderAds && (
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
			)}

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
					pageFooter={front.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={front.nav.readerRevenueLinks.header}
					editionId={front.editionId}
					contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
				/>
			</Section>
		</>
	);
};
