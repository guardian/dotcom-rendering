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
import { LI } from '../components/Card/components/LI';
import { UL } from '../components/Card/components/UL';
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
import { CardDefault } from '../lib/cardWrappers';
import { decidePalette } from '../lib/decidePalette';
import { getEditionFromId } from '../lib/edition';
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
				{indexPage.groupedTrails.map((groupedTrails, index) => {
					const locale = getEditionFromId(indexPage.editionId).locale;
					const date = new Date(
						groupedTrails.year,
						groupedTrails.month,
						groupedTrails.day ?? 1,
					);

					return (
						<FrontSection
							key={index}
							title={date.toLocaleDateString(locale, {
								day: 'numeric',
								month: 'long',
								year: 'numeric',
							})}
							showTopBorder={index > 0}
							ophanComponentName={'test'}
							containerName={'test'}
							toggleable={false}
							sectionId={'test'}
							pageId={indexPage.pageId}
							editionId={indexPage.editionId}
							canShowMore={false}
							ajaxUrl={indexPage.config.ajaxUrl}
						>
							<UL wrapCards={true} direction="row">
								{groupedTrails.trails.map((trail) => (
									<LI
										key={trail.url}
										percentage="25%"
										padSides={true}
									>
										<CardDefault trail={trail} />
									</LI>
								))}
							</UL>
						</FrontSection>
					);
				})}
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
