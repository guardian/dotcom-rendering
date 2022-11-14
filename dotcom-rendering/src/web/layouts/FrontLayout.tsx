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
import { AdSlot } from '../components/AdSlot';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { MostViewedFooter } from '../components/MostViewedFooter';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { ShowMore } from '../components/ShowMore.importable';
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

const getMerchHighPosition = (
	collectionCount: number,
	isNetworkFront: boolean | undefined,
) => {
	if (collectionCount < 4) {
		return 2;
	} else if (isNetworkFront) {
		return 5;
	} else {
		return 4;
	}
};

/**
 * On mobile, we remove the first container if it is a thrasher
 * and remove a container if it, or the next sibling, is a commercial container
 * we also exclude any containers that are directly before a thrasher
 * then we take every other container, up to a maximum of 10, for targeting MPU insertion
 */

const getMobileAdPositions = (
	isNetworkFront: boolean | undefined,
	collections: DCRCollectionType[],
) => {
	const merchHighPosition = getMerchHighPosition(
		collections.length,
		isNetworkFront,
	);

	const positions: number[] = collections
		.map((collection, collectionIndex) => {
			const isThrasher = collection.collectionType === 'fixed/thrasher';
			const isFirst = collectionIndex === 0;
			const isNearMerchandising =
				collectionIndex === merchHighPosition ||
				collectionIndex + 1 === merchHighPosition;
			const isNearThrasher =
				collections[collectionIndex + 1]?.collectionType ===
				'fixed/thrasher';
			if (isFirst && isThrasher) return false;
			if (isNearMerchandising) return false;
			if (isNearThrasher) return false;
			else if (
				collectionIndex % 2 === 0 &&
				collectionIndex < collections.length - 1
			) {
				return true;
			}
			return false;
		})
		.map((shouldDisplayAd, collectionIndex) =>
			shouldDisplayAd ? collectionIndex : undefined,
		)
		.filter((index): index is number => typeof index === 'number')
		// Should insert no more than 10 ads
		.slice(0, 10);
	return positions;
};

const decideAdSlot = (
	index: number,
	isNetworkFront: boolean | undefined,
	collectionCount: number,
	isPaidContent: boolean | undefined,
	format: ArticleDisplay,
	mobileAdPositions: (number | undefined)[],
) => {
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

	const mobileAdPositions = front.isNetworkFront
		? getMobileAdPositions(
				front.isNetworkFront,
				front.pressedPage.collections,
		  )
		: [];

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
									<Snap snapData={trails[0].snapData} />
								</Section>
								{decideAdSlot(
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
						return (
							<>
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
									containerPalette={
										collection.containerPalette
									}
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
													trails: trails.slice(10),
												},
											]}
											sectionName="Most viewed"
											// TODO: Include mostCommented & mostShared once we have this data in the FE response
										/>
									</MostViewedFooterLayout>
								</Section>
								{decideAdSlot(
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
								{collection.canShowMore && (
									<Island deferUntil="interaction">
										<ShowMore
											containerTitle={
												collection.displayName
											}
											containerId={collection.id}
											path={front.pressedPage.id}
											baseUrl={front.config.ajaxUrl}
											containerPalette={
												collection.containerPalette
											}
											showAge={
												collection.displayName ===
												'Headlines'
											}
										/>
									</Island>
								)}
							</Section>
							{decideAdSlot(
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
