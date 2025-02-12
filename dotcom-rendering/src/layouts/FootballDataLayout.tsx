// import { Masthead } from '../components/Masthead/Masthead';
// import type { NavType } from '../model/extract-nav';
import { palette } from '@guardian/source/foundations';
import { MatchReport } from '../../fixtures/generated/fe-articles/MatchReport';
import { AdSlot } from '../components/AdSlot.web';
import { FootballMatchesPage } from '../components/FootballMatchesPage.importable';
import { Footer } from '../components/Footer';
import { MerchandisingSlot } from '../components/FrontsAdSlots';
import { HeaderAdSlot } from '../components/HeaderAdSlot';
import { Island } from '../components/Island';
import { Masthead } from '../components/Masthead/Masthead';
import { Section } from '../components/Section';
import { SubNav } from '../components/SubNav.importable';
import type { FootballMatches } from '../footballMatches';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { extractNAV } from '../model/extract-nav';
import { Stuck } from './lib/stickiness';

// interface Props {
// 	NAV: NavType;
// }

const nations = [
	{
		name: 'England',
		competitions: [
			{ tag: 'football/premierleague', name: 'Premier League' },
			{ tag: 'football/championship', name: 'Championship' },
		],
	},
];
const initialDays: FootballMatches = [
	{
		date: new Date('2022-01-01T00:00:00Z'),
		competitions: [
			{
				competitionId: '635',
				tag: 'football/serieafootball',
				name: 'Serie A',
				nation: 'European',
				matches: [
					{
						kind: 'Live',
						dateTime: new Date('2022-01-01T11:11:00Z'),
						paId: '4482093',
						homeTeam: {
							name: 'Torino',
							score: 10,
						},
						awayTeam: {
							name: 'Cagliari',
							score: 0,
						},
						status: '1st',
					},
					{
						kind: 'Fixture',
						dateTime: new Date('2022-01-01T19:45:00Z'),
						paId: '4482890',
						homeTeam: 'Auxerre',
						awayTeam: 'St Etienne',
					},
				],
			},
			{
				competitionId: '650',
				tag: 'football/laligafootball',
				name: 'La Liga',
				nation: 'European',
				matches: [
					{
						kind: 'Result',
						dateTime: new Date('2022-01-01T20:00:00Z'),
						paId: '4482835',
						homeTeam: {
							name: 'Las Palmas',
							score: 2,
						},
						awayTeam: {
							name: 'Osasuna',
							score: 3,
						},
						comment: 'AET',
					},
				],
			},
			{
				competitionId: '651',
				tag: 'football/fa-cup',
				name: 'FA Cup',
				nation: 'European',
				matches: [
					{
						kind: 'Result',
						dateTime: new Date('2022-01-01T20:00:00Z'),
						paId: '4482836',
						homeTeam: {
							name: 'Brighton & Hove Albion Women',
							score: 1,
						},
						awayTeam: {
							name: 'Crystal Palace Women',
							score: 1,
						},
						comment:
							'Brighton & Hove Albion Women won 4 - 3 on penalties...',
					},
				],
			},
		],
	},
];

const goToCompetitionSpecificPage = () => {
	console.log('goToCompetitionSpecificPage');
	//window.location.replace('https://www.theguardian.com');
};

export const FootballDataLayout = () =>
	// { NAV }: Props
	{
		// const { darkModeAvailable } = useConfig();
		const NAV = extractNAV(MatchReport['nav']);
		const pageFooter = MatchReport['pageFooter'];
		const renderAds = true;
		const format = {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		};
		return (
			<>
				<div data-print-layout="hide" id="bannerandheader">
					{
						<Stuck>
							<Section
								fullWidth={true}
								showTopBorder={false}
								showSideBorders={false}
								padSides={false}
								shouldCenter={false}
							>
								<HeaderAdSlot
									isPaidContent={true}
									// isPaidContent={!!tagPage.config.isPaidContent}
									shouldHideReaderRevenue={false}
								/>
							</Section>
						</Stuck>
					}

					<Masthead
						nav={NAV}
						editionId={'UK'}
						//idUrl={tagPage.config.idUrl}
						//mmaUrl={tagPage.config.mmaUrl}
						discussionApiUrl={'tagPage.config.discussionApiUrl'}
						idApiUrl={'tagPage.config.idApiUrl'}
						contributionsServiceUrl={'contributionsServiceUrl'}
						showSubNav={true}
						showSlimNav={false}
						//hasPageSkin={hasPageSkin}
						//pageId={pageId}
					/>
				</div>

				{renderAds && (
					<AdSlot position="right" display={format.display} />
				)}

				<main id="maincontent">
					<Island priority="feature" defer={{ until: 'visible' }}>
						<FootballMatchesPage
							nations={nations}
							guardianBaseUrl={'https://www.theguardian.com'}
							kind={'Fixture'}
							initialDays={initialDays}
							edition={'UK'}
							goToCompetitionSpecificPage={
								goToCompetitionSpecificPage
							}
						/>
					</Island>
				</main>

				<MerchandisingSlot
					//renderAds={renderAds}
					renderAds={true}
					hasPageSkin={false}
					//hasPageSkin={hasPageSkin}
				/>

				{NAV.subNavSections && (
					<Section
						fullWidth={true}
						showTopBorder={true}
						data-print-layout="hide"
						padSides={false}
						element="aside"
					>
						<Island
							priority="enhancement"
							defer={{ until: 'visible' }}
						>
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
						editionId={'UK'}
					/>
				</Section>
			</>
		);
	};
