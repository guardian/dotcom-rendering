import { brandBackground, brandLine } from '@guardian/source-foundations';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { DecideContainer } from '../lib/DecideContainer';

import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { Nav } from '../components/Nav/Nav';
import { Island } from '../components/Island';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { decidePalette } from '../lib/decidePalette';
import { Header } from '../components/Header';
import { ContainerLayout } from '../components/ContainerLayout';

interface Props {
	front: DCRFrontType;
	NAV: NavType;
}

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
							edition={front.editionId}
							idUrl={front.config.idUrl}
							mmaUrl={front.config.mmaUrl}
							discussionApiUrl={front.config.discussionApiUrl}
							isAnniversary={
								front.config.switches.anniversaryHeaderSvg
							}
							urls={front.nav.readerRevenueLinks.header}
							remoteHeader={front.config.switches.remoteHeader}
							contributionsServiceUrl="https://contributions.guardianapis.com" // TODO: Pass this in
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
							edition={front.editionId}
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
								<Lines count={4} effect="straight" />
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

					return (
						<ContainerLayout
							title={collection.displayName}
							// TODO: This logic should be updated, as this relies
							// on the first container being 'palette styles do not delete'
							showTopBorder={index > 1}
							sideBorders={true}
							padContent={false}
							centralBorder="partial"
							url={collection.href}
						>
							<DecideContainer
								trails={trails}
								containerType={collection.collectionType}
							/>
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
		</>
	);
};
