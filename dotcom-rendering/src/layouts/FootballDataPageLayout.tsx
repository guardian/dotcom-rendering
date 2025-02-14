import { palette } from '@guardian/source/foundations';
import { initialDays, nations } from '../../fixtures/manual/footballData';
import { FootballMatchesPageWrapper } from '../components/FootballMatchesPageWrapper.importable';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import type { FEFootballDataPage } from '../feFootballDataPage';
import { extractNAV } from '../model/extract-nav';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	footballData: FEFootballDataPage;
}

/*
	Hardcoded data to test layout
*/
const nationsHardcoded = nations;
const initialDaysHardcoded = initialDays;

export const FootballDataPageLayout = ({ footballData }: Props) => {
	const NAV = extractNAV(footballData.nav);
	const pageFooter = footballData.pageFooter;
	// ToDo: call canRenderAds with matching type
	const renderAds = true;

	// ToDo: use getContributionsServiceUrl
	//const contributionsServiceUrl = getContributionsServiceUrl(footballData);
	const contributionsServiceUrl = footballData.contributionsServiceUrl;

	return (
		<>
			<div data-print-layout="hide" id="bannerandheader">
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
								isPaidContent={
									!!footballData.config.isPaidContent
								}
								shouldHideReaderRevenue={false}
							/>
						</Section>
					</Stuck>
				)}

				<Masthead
					nav={NAV}
					editionId={footballData.editionId}
					idUrl={footballData.config.idUrl}
					mmaUrl={footballData.config.mmaUrl}
					discussionApiUrl={footballData.config.discussionApiUrl}
					idApiUrl={footballData.config.idApiUrl}
					contributionsServiceUrl={contributionsServiceUrl}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={footballData.config.hasPageSkin}
					pageId={footballData.config.pageId}
				/>
			</div>

			<main id="maincontent" data-layout="FootballDataPageLayout">
				<Section fullWidth={true}>
					<Island priority="feature" defer={{ until: 'visible' }}>
						<FootballMatchesPageWrapper
							nations={nationsHardcoded}
							guardianBaseUrl={footballData.guardianBaseURL}
							// ToDo: determine based on URL
							kind={'Fixture'}
							initialDays={initialDaysHardcoded}
							edition={footballData.editionId}
						/>
					</Island>
				</Section>
			</main>

			{NAV.subNavSections && (
				<Section
					fullWidth={true}
					showTopBorder={true}
					data-print-layout="hide"
					padSides={false}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={NAV.subNavSections}
							currentNavLink={NAV.currentNavLink}
							position="footer"
						/>
					</Island>
				</Section>
			)}

			<Section
				fullWidth={true}
				data-print-layout="hide"
				padSides={false}
				backgroundColour={palette.brand[400]}
				borderColour={palette.brand[600]}
				showSideBorders={false}
				showTopBorder={false}
				element="footer"
			>
				<Footer
					pageFooter={pageFooter}
					selectedPillar={NAV.selectedPillar}
					pillars={NAV.pillars}
					urls={NAV.readerRevenueLinks.footer}
					editionId={footballData.editionId}
				/>
			</Section>
			<BannerWrapper data-print-layout="hide">
				<Island priority="feature" defer={{ until: 'idle' }}>
					<StickyBottomBanner
						contentType={footballData.config.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={footballData.config.idApiUrl}
						isMinuteArticle={false}
						isPaidContent={!!footballData.config.isPaidContent}
						isPreview={footballData.config.isPreview}
						isSensitive={footballData.config.isSensitive}
						pageId={footballData.config.pageId}
						sectionId={footballData.config.section}
						shouldHideReaderRevenue={false}
						remoteBannerSwitch={
							!!footballData.config.switches.remoteBanner
						}
						tags={[]}
					/>
				</Island>
			</BannerWrapper>
		</>
	);
};
