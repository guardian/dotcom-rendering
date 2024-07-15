import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { Footer } from '../components/Footer';
import { GroupedNewslettersList } from '../components/GroupedNewsletterList';
import { Header } from '../components/Header';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { ManyNewsletterSignUp } from '../components/ManyNewsletterSignUp.importable';
import { Masthead } from '../components/Masthead/Masthead';
import { Nav } from '../components/Nav/Nav';
import { NewslettersPageHeading } from '../components/NewsletterPageHeading';
import { Section } from '../components/Section';
import { SubNav } from '../components/SubNav.importable';
import type { NavType } from '../model/extract-nav';
import { palette as themePalette } from '../palette';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { Stuck } from './lib/stickiness';

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

	const contributionsServiceUrl =
		process.env.SDC_URL ?? pageContributionsServiceUrl;

	const displayedNewslettersCount =
		newslettersPage.groupedNewsletters.groups.reduce<number>(
			(count, group) => count + group.newsletters.length,
			0,
		);

	const inUpdatedHeaderABTest =
		newslettersPage.config.abTests.updatedHeaderDesignVariant === 'variant';

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
								<HeaderAdSlot
									isPaidContent={false}
									shouldHideReaderRevenue={false}
								/>
							</Section>
						</Stuck>
					)}
					{inUpdatedHeaderABTest ? (
						<Masthead
							nav={NAV}
							editionId={editionId}
							idUrl={newslettersPage.config.idUrl}
							mmaUrl={newslettersPage.config.mmaUrl}
							discussionApiUrl={
								newslettersPage.config.discussionApiUrl
							}
							idApiUrl={config.idApiUrl}
							contributionsServiceUrl={contributionsServiceUrl}
							showSubNav={true}
							isImmersive={false}
							hasPageSkin={false}
							hasPageSkinContentSelfConstrain={false}
						/>
					) : (
						<>
							<Section
								fullWidth={true}
								shouldCenter={false}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								backgroundColour={sourcePalette.brand[400]}
								element="header"
							>
								<Header
									editionId={newslettersPage.editionId}
									idUrl={newslettersPage.config.idUrl}
									mmaUrl={newslettersPage.config.mmaUrl}
									discussionApiUrl={
										newslettersPage.config.discussionApiUrl
									}
									urls={
										newslettersPage.nav.readerRevenueLinks
											.header
									}
									remoteHeader={
										!!newslettersPage.config.switches
											.remoteHeader
									}
									contributionsServiceUrl={
										contributionsServiceUrl
									}
									idApiUrl={config.idApiUrl}
									headerTopBarSearchCapiSwitch={
										!!newslettersPage.config.switches
											.headerTopBarSearchCapi
									}
								/>
							</Section>
							<Section
								fullWidth={true}
								borderColour={sourcePalette.brand[600]}
								showTopBorder={false}
								padSides={false}
								backgroundColour={sourcePalette.brand[400]}
								element="nav"
							>
								<Nav
									nav={NAV}
									subscribeUrl={subscribeUrl}
									editionId={editionId}
								/>
							</Section>
							{!!NAV.subNavSections && (
								<>
									<Section
										fullWidth={true}
										backgroundColour={themePalette(
											'--article-background',
										)}
										padSides={false}
										element="aside"
									>
										<Island
											priority="enhancement"
											defer={{ until: 'idle' }}
										>
											<SubNav
												subNavSections={
													NAV.subNavSections
												}
												currentNavLink={
													NAV.currentNavLink
												}
												position="header"
											/>
										</Island>
									</Section>
									<Section
										fullWidth={true}
										backgroundColour={themePalette(
											'--article-background',
										)}
										padSides={false}
										showTopBorder={false}
									>
										<StraightLines
											count={4}
											cssOverrides={css`
												display: block;
											`}
											color={themePalette(
												'--straight-lines',
											)}
										/>
									</Section>
								</>
							)}
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
				<Island priority="feature" defer={{ until: 'idle' }}>
					<ManyNewsletterSignUp
						useReCaptcha={
							!!newslettersPage.config.switches
								.emailSignupRecaptcha
						}
						captchaSiteKey={
							newslettersPage.config.googleRecaptchaSiteKey
						}
					/>
				</Island>
			</main>

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={sourcePalette.brand[400]}
				borderColour={sourcePalette.brand[600]}
				showSideBorders={false}
				element="footer"
			>
				<Footer
					pageFooter={pageFooter}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={editionId}
				/>
			</Section>
		</>
	);
};
