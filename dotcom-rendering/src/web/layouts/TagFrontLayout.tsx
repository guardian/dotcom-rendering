import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import {
	brandBackground,
	brandBorder,
	brandLine,
	neutral,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { NavType } from '../../model/extract-nav';
import type { DCRTagFrontType } from '../../types/tagFront';
import { AdSlot } from '../components/AdSlot';
import { DecideContainerByTrails } from '../components/DecideContainerByTrails';
import { Footer } from '../components/Footer';
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
import { getEditionFromId } from '../lib/edition';
import { Stuck } from './lib/stickiness';

interface Props {
	tagFront: DCRTagFrontType;
	NAV: NavType;
}

// const spaces = / /g;
/** TODO: Confirm with is a valid way to generate component IDs. */
// const ophanComponentId = (name: string) =>
// 	name.toLowerCase().replace(spaces, '-');

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

export const TagFrontLayout = ({ tagFront, NAV }: Props) => {
	// const {
	// 	config: { isPaidContent },
	// } = tagFront;

	const isInEuropeTest =
		tagFront.config.abTests.europeNetworkFrontVariant === 'variant';

	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};

	const palette = decidePalette(format);

	// const merchHighPosition = getMerchHighPosition(
	// 	tagFront.pressedPage.collections.length,
	// 	tagFront.isNetworkFront,
	// );

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = canRenderAds(tagFront);

	// const mobileAdPositions = renderAds
	// 	? getMobileAdPositions(tagFront.pressedPage.collections, merchHighPosition)
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
							editionId={tagFront.editionId}
							idUrl={tagFront.config.idUrl}
							mmaUrl={tagFront.config.mmaUrl}
							discussionApiUrl={tagFront.config.discussionApiUrl}
							urls={tagFront.nav.readerRevenueLinks.header}
							remoteHeader={
								!!tagFront.config.switches.remoteHeader
							}
							contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
							idApiUrl="https://idapi.theguardian.com/" // TODO: read this from somewhere as in other layouts
							isInEuropeTest={isInEuropeTest}
							headerTopBarSearchCapiSwitch={
								!!tagFront.config.switches
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
								tagFront.nav.readerRevenueLinks.header.subscribe
							}
							editionId={tagFront.editionId}
							headerTopBarSwitch={
								!!tagFront.config.switches.headerTopNav
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
				{tagFront.webTitle ? (
					<FrontSection title={tagFront.webTitle}></FrontSection>
				) : undefined}
				{tagFront.groupedTrails.map((groupedTrails, index) => {
					const locale = getEditionFromId(tagFront.editionId).locale;
					const date = new Date(
						groupedTrails.year,
						groupedTrails.month,
						groupedTrails.day ?? 1,
					);

					const url =
						groupedTrails.day !== undefined
							? `/${tagFront.pageId}/${groupedTrails.year}/${date
									.toLocaleDateString(locale, {
										month: 'long',
									})
									.slice(0, 3)
									.toLowerCase()}/${date.toLocaleDateString(
									locale,
									{
										day: '2-digit',
									},
							  )}/all`
							: undefined;

					return (
						<FrontSection
							key={index}
							title={date.toLocaleDateString(locale, {
								day:
									groupedTrails.day !== undefined
										? 'numeric'
										: undefined,
								month: 'long',
								year: 'numeric',
							})}
							url={url}
							showTopBorder={true}
							// TODO: Review these props & provide the correct values
							ophanComponentName={'test'}
							containerName={'test'}
							toggleable={false}
							sectionId={'test'}
							pageId={tagFront.pageId}
							editionId={tagFront.editionId}
							canShowMore={false}
							ajaxUrl={tagFront.config.ajaxUrl}
							pagination={
								index === tagFront.groupedTrails.length - 1
									? tagFront.pagination
									: undefined
							}
						>
							<DecideContainerByTrails
								trails={groupedTrails.trails}
								speed={tagFront.speed}
							/>
						</FrontSection>
					);
				})}
			</main>
			<Section
				fullWidth={true}
				showTopBorder={false}
				data-component="trending-topics"
			>
				<TrendingTopics trendingTopics={tagFront.trendingTopics} />
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
					pageFooter={tagFront.pageFooter}
					pillar={format.theme}
					pillars={NAV.pillars}
					urls={tagFront.nav.readerRevenueLinks.header}
					editionId={tagFront.editionId}
					contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
				/>
			</Section>
		</>
	);
};
