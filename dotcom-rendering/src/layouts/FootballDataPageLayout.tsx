import { palette } from '@guardian/source/foundations';
import { FootballMatchesPageWrapper } from '../components/FootballMatchesPageWrapper.importable';
import { Footer } from '../components/Footer';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { StickyBottomBanner } from '../components/StickyBottomBanner.importable';
import { SubNav } from '../components/SubNav.importable';
import type {
	FootballMatchListPage,
	FootballTablesPage,
} from '../footballDataPage';
import { canRenderAds } from '../lib/canRenderAds';
import { getContributionsServiceUrl } from '../lib/contributions';
import { BannerWrapper, Stuck } from './lib/stickiness';

interface Props {
	footballData: FootballMatchListPage | FootballTablesPage;
}

const SportsPage = ({
	footballData,
	renderAds,
}: {
	footballData: FootballMatchListPage | FootballTablesPage;
	renderAds: boolean;
}) => {
	switch (footballData.kind) {
		case 'Fixture':
		case 'Live':
		case 'Result':
			return (
				<Island priority="feature" defer={{ until: 'visible' }}>
					<FootballMatchesPageWrapper
						regions={footballData.regions}
						guardianBaseUrl={footballData.guardianBaseURL}
						ajaxUrl={footballData.config.ajaxUrl}
						kind={footballData.kind}
						initialDays={footballData.matchesList}
						secondPage={footballData.nextPage}
						edition={footballData.editionId}
						renderAds={renderAds}
						pageId={footballData.config.pageId}
					/>
				</Island>
			);

		case 'Tables':
			return <></>;
	}
};

export const FootballDataPageLayout = ({ footballData }: Props) => {
	const { nav } = footballData;
	const pageFooter = footballData.pageFooter;
	const renderAds = canRenderAds(footballData);

	const contributionsServiceUrl = getContributionsServiceUrl(footballData);

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
					nav={nav}
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

			<SportsPage footballData={footballData} renderAds={renderAds} />

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
