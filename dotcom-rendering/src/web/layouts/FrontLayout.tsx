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
import type { DCRCollectionType, DCRFrontType } from '../../types/front';
import { AdSlot } from '../components/AdSlot';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MostViewedFooter } from '../components/MostViewedFooter';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { Snap } from '../components/Snap';
import { SubNav } from '../components/SubNav.importable';
import { DecideContainer } from '../lib/DecideContainer';
import { decidePalette } from '../lib/decidePalette';
import { Stuck } from './lib/stickiness';

interface Props {
	front: DCRFrontType;
	NAV: NavType;
}

const spaces = / /g;
/** TODO: Confirm with is a valid way to generate component IDs. */
const ophanComponentId = (name: string) =>
	name.toLowerCase().replace(spaces, '-');

const shouldInsertMerchHigh = (
	index: number,
	isNetworkFront: boolean | undefined,
	collectionCount: number,
	isPaidContent: boolean | undefined,
) => {
	const minContainers = isPaidContent ? 1 : 2;
	if (collectionCount < minContainers) {
		return false;
	}
	let desiredPosition;
	if (collectionCount < 4) {
		desiredPosition = 2;
	} else if (isNetworkFront) {
		desiredPosition = 5;
	} else {
		desiredPosition = 4;
	}

	return index === desiredPosition;
};

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

export const FrontLayout = ({ front, NAV }: Props) => {
	const {
		config: { isPaidContent },
	} = front;

	const isInEuropeTest =
		front.config.abTests.europeNetworkFrontVariant === 'variant';

	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};

	const palette = decidePalette(format);

	// const contributionsServiceUrl = getContributionsServiceUrl(front);

	/**
	 * This property currently only applies to the header and merchandising slots
	 */
	const renderAds = !front.isAdFreeUser;

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
							supporterCTA={
								front.nav.readerRevenueLinks.header.supporter
							}
							discussionApiUrl={front.config.discussionApiUrl}
							urls={front.nav.readerRevenueLinks.header}
							remoteHeader={!!front.config.switches.remoteHeader}
							contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
							idApiUrl="https://idapi.theguardian.com/" // TODO: read this from somewhere as in other layouts
							isInEuropeTest={isInEuropeTest}
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

			<main data-layout="FrontLayout">
				{front.pressedPage.collections.map((collection, index) => {
					// Backfills should be added to the end of any curated content
					const trails = collection.curated.concat(
						collection.backfill,
					);
					// There are some containers that have zero trails. We don't want to render these
					if (trails.length === 0) return null;

					const ophanName = ophanComponentId(collection.displayName);
					const ophanComponentLink = `container-${index} | ${ophanName}`;

					if (collection.collectionType === 'fixed/thrasher') {
						return (
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
								<Snap snapData={trails[0].snapData} />
							</Section>
						);
					}

					if (
						collection.collectionType === 'news/most-popular' &&
						!isPaidContent &&
						front.config.switches.mostViewedFronts
					) {
						return (
							<Section
								key={collection.id}
								title="Most viewed"
								showTopBorder={index > 0}
								padContent={false}
								verticalMargins={false}
								url={collection.href}
								ophanComponentLink={ophanComponentLink}
								ophanComponentName={ophanName}
								containerName={collection.collectionType}
								containerPalette={collection.containerPalette}
								sectionId={collection.id}
								showDateHeader={
									collection.config.showDateHeader
								}
								editionId={front.editionId}
								treats={collection.treats}
								data-print-layout="hide"
								element="aside"
							>
								<MostViewedFooterLayout>
									<MostViewedFooter
										tabs={[
											{
												trails: trails.slice(0, 10),
											},
										]}
										sectionName="Most viewed"
										// TODO: Include mostCommented & mostShared once we have this data in the FE response
									/>
								</MostViewedFooterLayout>
							</Section>
						);
					}

					return (
						<>
							<Section
								key={collection.id}
								title={collection.displayName}
								showTopBorder={index > 0}
								padContent={false}
								centralBorder="partial"
								url={collection.href}
								ophanComponentLink={ophanComponentLink}
								ophanComponentName={ophanName}
								containerName={collection.collectionType}
								containerPalette={collection.containerPalette}
								toggleable={isToggleable(
									index,
									collection,
									front.isNetworkFront,
								)}
								sectionId={collection.id}
								showDateHeader={
									collection.config.showDateHeader
								}
								editionId={front.editionId}
								treats={collection.treats}
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
								/>
							</Section>
							{shouldInsertMerchHigh(
								index,
								front.isNetworkFront,
								front.pressedPage.collections.length,
								front.pressedPage.frontProperties.isPaidContent,
							) && (
								<AdSlot
									data-print-layout="hide"
									position="merchandising-high"
									display={format.display}
								/>
							)}
						</>
					);
				})}
			</main>

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
