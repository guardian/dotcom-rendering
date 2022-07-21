import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import {
	brandBackground,
	brandBorder,
	brandLine,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { DCRFrontType } from '../../types/front';
import { ContainerLayout } from '../components/ContainerLayout';
import { ElementContainer } from '../components/ElementContainer';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Island } from '../components/Island';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { Nav } from '../components/Nav/Nav';
import { ShowMore } from '../components/ShowMore.importable';
import { Snap } from '../components/Snap';
import { SubNav } from '../components/SubNav.importable';
import { DecideContainer } from '../lib/DecideContainer';
import { decidePalette } from '../lib/decidePalette';

interface Props {
	front: DCRFrontType;
	NAV: NavType;
}

const spaces = / /g;
/** TODO: Confirm with is a valid way to generate component IDs. */
const ophanComponentId = (name: string) =>
	name.toLowerCase().replace(spaces, '-');

export const FrontLayout = ({ front, NAV }: Props) => {
	const {
		config: { isPaidContent },
	} = front;

	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};

	const palette = decidePalette(format);

	// const contributionsServiceUrl = getContributionsServiceUrl(front);

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
				<>
					<ElementContainer
						showTopBorder={false}
						showSideBorders={false}
						padded={false}
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
							remoteHeader={front.config.switches.remoteHeader}
							contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
							idApiUrl="https://idapi.theguardian.com/" // TODO: read this from somewhere as in other layouts
						/>
					</ElementContainer>
					<ElementContainer
						showSideBorders={true}
						borderColour={brandLine.primary}
						showTopBorder={false}
						padded={false}
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
					</ElementContainer>
					{NAV.subNavSections && (
						<>
							<ElementContainer
								backgroundColour={palette.background.article}
								padded={false}
								element="aside"
							>
								<Island deferUntil="idle">
									<SubNav
										subNavSections={NAV.subNavSections}
										currentNavLink={NAV.currentNavLink}
										format={format}
									/>
								</Island>
							</ElementContainer>
							<ElementContainer
								backgroundColour={palette.background.article}
								padded={false}
								showTopBorder={false}
							>
								<StraightLines
									cssOverrides={css`
										display: block;
									`}
									count={4}
								/>
							</ElementContainer>
						</>
					)}
				</>
			</div>

			<main>
				{front.pressedPage.collections.map((collection, index) => {
					// TODO: We also need to support treats containers
					// Backfills should be added to the end of any curated content
					const trails = collection.curated.concat(
						collection.backfill,
					);
					// There are some containers that have zero trails. We don't want to render these
					if (trails.length === 0) return null;

					const ophanName = ophanComponentId(collection.displayName);
					const ophanComponentLink = `container-${
						index + 1
					} | ${ophanName}`;

					if (collection.collectionType === 'fixed/thrasher') {
						return (
							<ElementContainer
								padded={false}
								showTopBorder={false}
								showSideBorders={false}
								ophanComponentLink={ophanComponentLink}
								ophanComponentName={ophanName}
								element="section"
							>
								<Snap snapData={trails[0].snapData} />
							</ElementContainer>
						);
					}

					return (
						<ContainerLayout
							key={index}
							title={collection.displayName}
							// TODO: This logic should be updated, as this relies
							// on the first container being 'palette styles do not delete'
							showTopBorder={index > 1}
							sideBorders={true}
							padContent={false}
							centralBorder="partial"
							url={collection.href}
							// same as above re 'palette styles' for index increment
							ophanComponentLink={ophanComponentLink}
							ophanComponentName={ophanName}
							containerPalette={collection.containerPalette}
							showDateHeader={collection.config.showDateHeader}
							editionId={front.editionId}
						>
							<DecideContainer
								trails={trails}
								containerType={collection.collectionType}
								containerPalette={collection.containerPalette}
								showAge={collection.displayName === 'Headlines'}
								showMoreId={collection.showMoreId}
							/>
							{collection.showMoreId && (
								<Island deferUntil={'visible'}>
									<ShowMore
										pageId={front.pressedPage.id}
										showMoreId={collection.showMoreId}
										displayName={collection.displayName}
									/>
								</Island>
							)}
						</ContainerLayout>
					);
				})}

				{!isPaidContent && (
					<ElementContainer data-print-layout="hide" element="aside">
						<MostViewedFooterLayout
							format={format}
							sectionName="" // {front.sectionName}
							ajaxUrl={front.config.ajaxUrl}
						/>
					</ElementContainer>
				)}
			</main>

			{NAV.subNavSections && (
				<ElementContainer
					data-print-layout="hide"
					padded={false}
					element="aside"
				>
					<Island deferUntil="visible">
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							format={format}
						/>
					</Island>
				</ElementContainer>
			)}

			<ElementContainer
				data-print-layout="hide"
				padded={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
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
			</ElementContainer>
		</>
	);
};
