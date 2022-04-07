import { brandBackground, brandLine } from '@guardian/source-foundations';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';

import { Lines } from '@guardian/source-react-components-development-kitchen';
import { SubNav } from '../components/SubNav.importable';
import { ElementContainer } from '../components/ElementContainer';
import { Nav } from '../components/Nav/Nav';

import { Island } from '../components/Island';
import { MostViewedFooterLayout } from '../components/MostViewedFooterLayout';
import { decidePalette } from '../lib/decidePalette';
import { ContainerLayout } from '../components/ContainerLayout';
import { Header } from '../components/Header';

interface Props {
	Front: FrontType;
	NAV: NavType;
}

export const FrontLayout = ({ Front, NAV }: Props) => {
	const {
		config: { isPaidContent },
	} = Front;

	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: ArticlePillar.News,
	};

	const palette = decidePalette(format);

	// const contributionsServiceUrl = getContributionsServiceUrl(Front);

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
							edition={Front.editionId}
							idUrl={Front.config.idUrl}
							mmaUrl={Front.config.mmaUrl}
							supporterCTA={
								Front.nav.readerRevenueLinks.header.supporter
							}
							discussionApiUrl={Front.config.discussionApiUrl}
							isAnniversary={
								Front.config.switches.anniversaryHeaderSvg
							}
							urls={Front.nav.readerRevenueLinks.header}
							remoteHeader={Front.config.switches.remoteHeader}
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
								Front.nav.readerRevenueLinks.header.subscribe
							}
							edition={Front.editionId}
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
				{Front.pressedPage.collections.map((collection, index) => {
					return (
						<ContainerLayout
							title={collection.displayName as string}
							showTopBorder={index !== 0}
							sideBorders={true}
							centralBorder="partial"
						/>
					);
				})}

				{!isPaidContent && (
					<ElementContainer data-print-layout="hide" element="aside">
						<MostViewedFooterLayout
							format={format}
							sectionName="" // {Front.sectionName}
							ajaxUrl={Front.config.ajaxUrl}
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
