import { palette } from '@guardian/source/foundations';
import { AdSlot } from '../components/AdSlot.web';
import { AppsFooter } from '../components/AppsFooter.island';
import { CricketScorecardPage } from '../components/CricketScorecardPage';
import { FootballMatchesPageWrapper } from '../components/FootballMatchesPageWrapper.island';
import { FootballMatchInfoPage } from '../components/FootballMatchInfoPage';
import { FootballTablesPage } from '../components/FootballTablesPage';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.island';
import { SubNav } from '../components/SubNav.island';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { palette as themePalette } from '../palette';
import type {
	AppSportDataPage,
	SportDataPage,
	WebSportDataPage,
} from '../sportDataPage';
import type { RenderingTarget } from '../types/renderingTarget';
import { BannerWrapper, Stuck } from './lib/stickiness';

const SportsPage = ({
	sportData,
	renderAds,
	renderingTarget,
}: {
	sportData: SportDataPage;
	renderAds: boolean;
	renderingTarget: RenderingTarget;
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
						nextPageNoJsUrl={sportData.nextPageNoJsUrl}
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
		case 'FootballMatchSummary':
			return (
				<FootballMatchInfoPage
					matchStats={sportData.matchStats}
					matchInfo={sportData.matchInfo}
					competitionName={sportData.competitionName}
					edition={sportData.editionId}
					matchHeaderUrl={sportData.matchHeaderUrl}
					table={sportData.group}
					renderingTarget={renderingTarget}
				/>
			);
	}
};

export const SportDataPageLayout = (
	props: AppSportDataPage | WebSportDataPage,
) => {
	const sportData = props.sportData;
	const {
		config: { hasSurveyAd },
	} = sportData;
	const isWeb = props.renderingTarget === 'Web';
	const isApps = props.renderingTarget === 'Apps';
	const pageFooter = sportData.pageFooter;
	const renderAds = canRenderAds(sportData);

	const contributionsServiceUrl = getContributionsServiceUrl(sportData);

	return (
		<>
			{isWeb && (
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
								<HeaderAdSlot />
							</Section>
						</Stuck>
					)}

					<Masthead
						nav={props.nav}
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
						sectionId={sportData.config.section}
						contentType={sportData.config.contentType}
					/>
				</div>
			)}

			{isWeb && renderAds && hasSurveyAd && <AdSlot position="survey" />}

			<SportsPage
				sportData={sportData}
				renderAds={renderAds}
				renderingTarget={props.renderingTarget}
			/>

			{isWeb && (
				<>
					{props.nav.subNavSections && (
						<Section
							fullWidth={true}
							showTopBorder={true}
							padSides={false}
							element="aside"
						>
							<Island
								priority="enhancement"
								defer={{ until: 'visible' }}
							>
								<SubNav
									subNavSections={props.nav.subNavSections}
									currentNavLink={props.nav.currentNavLink}
									position="footer"
								/>
							</Island>
						</Section>
					)}

					<Section
						fullWidth={true}
						padSides={false}
						backgroundColour={palette.brand[400]}
						borderColour={palette.brand[600]}
						showSideBorders={false}
						showTopBorder={false}
						element="footer"
					>
						<Footer
							pageFooter={pageFooter}
							selectedPillar={props.nav.selectedPillar}
							pillars={props.nav.pillars}
							urls={props.nav.readerRevenueLinks.footer}
							editionId={sportData.editionId}
						/>
					</Section>
					<BannerWrapper data-print-layout="hide">
						<Island priority="feature" defer={{ until: 'idle' }}>
							<StickyBottomBanner
								contentType={sportData.config.contentType}
								contributionsServiceUrl={
									contributionsServiceUrl
								}
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
			)}
			{isApps && (
				<>
					<Section
						fullWidth={true}
						backgroundColour={themePalette('--ad-background')}
						borderColour={themePalette('--article-border')}
						padSides={false}
						showSideBorders={false}
						element="footer"
					>
						<Island priority="critical">
							<AppsFooter />
						</Island>
					</Section>
				</>
			)}
		</>
	);
};
