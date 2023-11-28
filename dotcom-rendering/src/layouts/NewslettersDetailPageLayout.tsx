import { css } from '@emotion/react';
import {
	brandBackground,
	brandBorder,
	brandLine,
	palette,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Nav } from '../components/Nav/Nav';
import { Section } from '../components/Section';
import { SubNav } from '../components/SubNav.importable';
import { pillarFromCurrentLink } from '../lib/layoutHelpers';
import type { NavType } from '../model/extract-nav';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';
import { Stuck } from './lib/stickiness';

type Props = {
	newsletterDetailPage: DCRNewsletterDetailPageType;
	NAV: NavType;
};

export const NewsletterDetailPageLayout = ({
	newsletterDetailPage,
	NAV,
}: Props) => {
	const {
		subscribeUrl,
		editionId,
		pageFooter,
		contributionsServiceUrl: pageContributionsServiceUrl,
		config,
		isAdFreeUser,
	} = newsletterDetailPage;

	const renderAds = !isAdFreeUser;

	const contributionsServiceUrl =
		process.env.SDC_URL ?? pageContributionsServiceUrl;

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
							editionId={newsletterDetailPage.editionId}
							idUrl={newsletterDetailPage.config.idUrl}
							mmaUrl={newsletterDetailPage.config.mmaUrl}
							discussionApiUrl={
								newsletterDetailPage.config.discussionApiUrl
							}
							urls={
								newsletterDetailPage.nav.readerRevenueLinks
									.header
							}
							remoteHeader={
								!!newsletterDetailPage.config.switches
									.remoteHeader
							}
							contributionsServiceUrl={contributionsServiceUrl}
							idApiUrl={config.idApiUrl}
							headerTopBarSearchCapiSwitch={
								!!newsletterDetailPage.config.switches
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
							selectedPillar={pillarFromCurrentLink(
								NAV.currentNavLink,
							)}
							subscribeUrl={subscribeUrl}
							editionId={editionId}
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
								<Island
									priority="enhancement"
									defer={{ until: 'idle' }}
								>
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

			<main data-layout="NewsletterDetailPageLayout" id="maincontent">
				<Section>
					<h1>
						Newsletter name: {newsletterDetailPage.newsletter.name}
					</h1>
					<p>
						description:{' '}
						{newsletterDetailPage.newsletter.description}
					</p>
					<p>Current nav link: {NAV.currentNavLink}</p>

					<pre>{JSON.stringify(NAV)}</pre>
				</Section>
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
