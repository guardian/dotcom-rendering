import { palette } from '@guardian/source/foundations';
import { CricketScorecardPage } from '../components/CricketScorecardPage';
import { FootballMatchesPageWrapper } from '../components/FootballMatchesPageWrapper.importable';
import { FootballTablesPage } from '../components/FootballTablesPage';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import type { SportDataPage } from '../sportDataPage';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	sportData: SportDataPage;
}

const SportsPage = ({
	sportData,
	renderAds,
}: {
	sportData: SportDataPage;
	renderAds: boolean;
}) => {
	switch (sportData.kind) {
		case 'FootballFixtures':
		case 'FootballLiveScores':
		case 'FootballResults':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<FootballMatchesPageWrapper
						regions={sportData.regions}
						now={sportData.now}
						guardianBaseUrl={sportData.guardianBaseURL}
						ajaxUrl={sportData.config.ajaxUrl}
						kind={sportData.kind}
						initialDays={sportData.matchesList}
						secondPage={sportData.nextPage}
						edition={sportData.editionId}
						renderAds={renderAds}
						pageId={sportData.config.pageId}
					/>
				</Island>
			);

		case 'FootballTables':
			return (
				<FootballTablesPage
					regions={sportData.regions}
					pageId={sportData.config.pageId}
					tableCompetitions={sportData.tables}
					renderAds={renderAds}
					guardianBaseUrl={sportData.guardianBaseURL}
				/>
			);
		case 'CricketMatch':
			return (
				<CricketScorecardPage
					match={sportData.match}
					guardianBaseUrl={sportData.guardianBaseURL}
				/>
			);
	}
};

export const SportDataPageLayout = ({ sportData }: Props) => {
	const { nav } = sportData;
	const pageFooter = sportData.pageFooter;
	const renderAds = canRenderAds(sportData);

	const contributionsServiceUrl = getContributionsServiceUrl(sportData);

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
								isPaidContent={!!sportData.config.isPaidContent}
								shouldHideReaderRevenue={false}
							/>
						</Section>
					</Stuck>
				)}

				<Masthead
					nav={nav}
					editionId={sportData.editionId}
					idUrl={sportData.config.idUrl}
					mmaUrl={sportData.config.mmaUrl}
					discussionApiUrl={sportData.config.discussionApiUrl}
					idApiUrl={sportData.config.idApiUrl}
					contributionsServiceUrl={contributionsServiceUrl}
					showSubNav={true}
					showSlimNav={false}
					hasPageSkin={sportData.config.hasPageSkin}
					pageId={sportData.config.pageId}
				/>
			</div>

			<SportsPage sportData={sportData} renderAds={renderAds} />

			{nav.subNavSections && (
				<Section
					fullWidth={true}
					showTopBorder={true}
					data-print-layout="hide"
					padSides={false}
					element="aside"
				>
					<Island priority="enhancement" defer={{ until: 'visible' }}>
						<SubNav
							subNavSections={nav.subNavSections}
							currentNavLink={nav.currentNavLink}
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
					selectedPillar={nav.selectedPillar}
					pillars={nav.pillars}
					urls={nav.readerRevenueLinks.footer}
					editionId={sportData.editionId}
				/>
			</Section>
			<BannerWrapper data-print-layout="hide">
				<Island priority="feature" defer={{ until: 'idle' }}>
					<StickyBottomBanner
						contentType={sportData.config.contentType}
						contributionsServiceUrl={contributionsServiceUrl}
						idApiUrl={sportData.config.idApiUrl}
						isMinuteArticle={false}
						isPaidContent={!!sportData.config.isPaidContent}
						isPreview={sportData.config.isPreview}
						isSensitive={sportData.config.isSensitive}
						pageId={sportData.config.pageId}
						sectionId={sportData.config.section}
						shouldHideReaderRevenue={false}
						remoteBannerSwitch={
							!!sportData.config.switches.remoteBanner
						}
						tags={[]}
					/>
				</Island>
			</BannerWrapper>
		</>
	);
};
