import { css } from '@emotion/react';
import {
	brandBackground,
	brandBorder,
	brandLine,
	palette,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { Footer } from '../components/Footer.tsx';
import { GroupedNewslettersList } from '../components/GroupedNewsletterList.tsx';
import { Header } from '../components/Header.tsx';
import { HeaderAdSlot } from '../components/HeaderAdSlot.tsx';
import { Island } from '../components/Island.tsx';
import { ManyNewsletterSignUp } from '../components/ManyNewsletterSignUp.importable.tsx';
import { Nav } from '../components/Nav/Nav.tsx';
import { NewslettersPageHeading } from '../components/NewsletterPageHeading.tsx';
import { Section } from '../components/Section.tsx';
import { SubNav } from '../components/SubNav.importable.tsx';
import type { NavType } from '../model/extract-nav.ts';
import type { DCRNewslettersPageType } from '../types/newslettersPage.ts';
import { Stuck } from './lib/stickiness.tsx';

type Props = {
	newslettersPage: DCRNewslettersPageType;
	NAV: NavType;
};

export const AllEditorialNewslettersPageLayout = ({
	newslettersPage,
	NAV,
}: Props) => {
	const {
		subscribeUrl,
		editionId,
		pageFooter,
		contributionsServiceUrl: pageContributionsServiceUrl,
		config,
		isAdFreeUser,
	} = newslettersPage;

	const renderAds = !isAdFreeUser;

	const isInEuropeTest =
		config.abTests.europeNetworkFrontVariant === 'variant';

	const contributionsServiceUrl =
		process.env.SDC_URL ?? pageContributionsServiceUrl;

	const displayedNewslettersCount =
		newslettersPage.groupedNewsletters.groups.reduce<number>(
			(count, group) => count + group.newsletters.length,
			0,
		);

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
								<HeaderAdSlot />
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
							editionId={newslettersPage.editionId}
							idUrl={newslettersPage.config.idUrl}
							mmaUrl={newslettersPage.config.mmaUrl}
							discussionApiUrl={
								newslettersPage.config.discussionApiUrl
							}
							urls={newslettersPage.nav.readerRevenueLinks.header}
							remoteHeader={
								!!newslettersPage.config.switches.remoteHeader
							}
							contributionsServiceUrl={contributionsServiceUrl}
							idApiUrl={config.idApiUrl}
							isInEuropeTest={isInEuropeTest}
							headerTopBarSearchCapiSwitch={
								!!newslettersPage.config.switches
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
							headerTopBarSwitch={false}
							nav={NAV}
							subscribeUrl={subscribeUrl}
							editionId={editionId}
							isInEuropeTest={isInEuropeTest}
						/>
					</Section>
					{NAV.subNavSections && (
						<>
							<Section
								fullWidth={true}
								backgroundColour={palette.neutral[100]}
								padSides={false}
								element="aside"
							>
								<Island deferUntil="idle">
									<SubNav
										subNavSections={NAV.subNavSections}
										currentNavLink={NAV.currentNavLink}
										linkHoverColour={
											'palette.text.articleLinkHover'
										}
										borderColour={'palette.border.subNav'}
									/>
								</Island>
							</Section>
							<Section
								fullWidth={true}
								backgroundColour={palette.neutral[100]}
								padSides={false}
								showTopBorder={false}
							>
								<StraightLines
									count={4}
									cssOverrides={css`
										display: block;
									`}
									color={palette.brand[400]}
								/>
							</Section>
						</>
					)}
				</>
			</div>

			<main data-layout="NewsletterPageLayout" id="maincontent">
				<NewslettersPageHeading
					mmaUrl={newslettersPage.config.mmaUrl}
					newsletterCount={displayedNewslettersCount}
				/>
				<GroupedNewslettersList
					groupedNewsletters={newslettersPage.groupedNewsletters}
				/>

				<Island deferUntil="idle">
					<ManyNewsletterSignUp />
				</Island>
			</main>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={brandBackground.primary}
				borderColour={brandBorder.primary}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.header}
					editionId={editionId}
					contributionsServiceUrl={contributionsServiceUrl}
				/>
			</Section>
		</>
	);
};
