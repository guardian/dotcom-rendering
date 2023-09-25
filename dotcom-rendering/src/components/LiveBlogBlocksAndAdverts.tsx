import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import {
	calculateApproximateBlockHeight,
	calculateApproximateElementHeight,
	shouldDisplayAd,
} from '../lib/liveblogAdSlots';
import type { Switches } from '../types/config';
import type { FEElement } from '../types/content';
import { AdSlot } from './AdSlot.web';
import { LiveBlock } from './LiveBlock';

type PageElementData = {
	elementType: string;
	height: number;
};

type LiveblogSections =
	| 'australia-news'
	| 'business'
	| 'environment'
	| 'football'
	| 'politics'
	| 'science'
	| 'sport'
	| 'tv-and-radio'
	| 'us-news';

type Props = {
	format: ArticleFormat;
	blocks: Block[];
	pinnedPost?: Block;
	host?: string;
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	switches: Switches;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	isLiveUpdate?: boolean;
	isInLiveblogAdSlotTest?: boolean;
};

export const LiveBlogBlocksAndAdverts = ({
	format,
	blocks,
	pinnedPost,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	switches,
	isAdFreeUser,
	isSensitive,
	isLiveUpdate,
	isInLiveblogAdSlotTest = false,
}: Props) => {
	if (!isInLiveblogAdSlotTest) {
		return (
			<>
				{blocks.map((block) => (
					<LiveBlock
						key={block.id}
						format={format}
						block={block}
						pageId={pageId}
						webTitle={webTitle}
						host={host}
						ajaxUrl={ajaxUrl}
						isLiveUpdate={isLiveUpdate}
						switches={switches}
						isAdFreeUser={isAdFreeUser}
						isSensitive={isSensitive}
						isPinnedPost={false}
						pinnedPostId={pinnedPost?.id}
					/>
				))}
			</>
		);
	}

	let pxSinceAdMobile = 0;
	let mobileAdCounter = 0;

	let pxSinceAdDesktop = 0;
	let desktopAdCounter = 0;

	// Change this dependent on the screen size for element testing
	const IS_MOBILE = false;

	const pageElementData: PageElementData[] = [];

	const resultsDir = 'results';
	if (!existsSync(resultsDir)) {
		mkdirSync(resultsDir);
	}

	return (
		<>
			{blocks.map((block, i) => {
				const heightEstimates = estimateElementSizes(
					block.elements,
					IS_MOBILE,
				);
				pageElementData.push(...heightEstimates);

				pxSinceAdMobile += calculateApproximateBlockHeight(
					block.elements,
					true,
				);
				const willInsertAdMobile =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						mobileAdCounter,
						pxSinceAdMobile,
						true,
					);
				if (willInsertAdMobile) {
					mobileAdCounter++;
					pxSinceAdMobile = 0;
				}

				pxSinceAdDesktop += calculateApproximateBlockHeight(
					block.elements,
					false,
				);
				const willInsertAdDesktop =
					!isAdFreeUser &&
					shouldDisplayAd(
						i + 1,
						blocks.length,
						desktopAdCounter,
						pxSinceAdDesktop,
						false,
					);
				if (willInsertAdDesktop) {
					desktopAdCounter++;
					pxSinceAdDesktop = 0;
				}

				return (
					<>
						<LiveBlock
							key={block.id}
							format={format}
							block={block}
							pageId={pageId}
							webTitle={webTitle}
							host={host}
							ajaxUrl={ajaxUrl}
							isLiveUpdate={isLiveUpdate}
							switches={switches}
							isAdFreeUser={isAdFreeUser}
							isSensitive={isSensitive}
							isPinnedPost={false}
							pinnedPostId={pinnedPost?.id}
						/>
						{willInsertAdMobile && (
							<AdSlot
								position="liveblog-inline-mobile"
								index={mobileAdCounter}
							/>
						)}
						{willInsertAdDesktop && (
							<AdSlot
								position="liveblog-inline"
								index={desktopAdCounter}
							/>
						)}
					</>
				);
			})}
			{writeFile(pageId, pageElementData)}
		</>
	);
};

const estimateElementSizes = (elements: FEElement[], isMobile: boolean) => {
	const heightEstimates = [];
	for (const element of elements) {
		heightEstimates.push({
			elementType: element._type,
			height: calculateApproximateElementHeight(element, isMobile),
		});
	}
	return heightEstimates;
};

const writeFile = (pageId: string, pageElementData: unknown) => {
	const page = pageId.split('/')[0];
	if (!page) return;

	const index = getIndex(pageId);
	if (index === -1) return;

	writeFileSync(
		`results/${page}-${index}.json`,
		JSON.stringify({ path: pageId, elements: pageElementData }),
		{
			flag: 'w',
		},
	);
};

const getIndex = (path: string): number => {
	const section = path.split('/')[0];
	if (!section) return -1;

	const pages = liveblogs[section as LiveblogSections];
	const pageIndex = pages.indexOf(`/${path}`);

	return pageIndex + 1;
};

const liveblogs = {
	'australia-news': [
		'/australia-news/live/2022/nov/04/australia-news-live-floods-politics-labor-coalition-cybercrime-qantas',
		'/australia-news/live/2022/nov/05/australia-news-live-flood-forbes-nsw-lachlan-river-70-year-peak-victoria-murray-river-energy-anthony-albanese-politics-weather',
		'/australia-news/live/2022/nov/07/australian-politics-live-labor-and-crossbench-clash-over-industrial-relations-cop27-under-way-climate-crisis-egypt-workplace-relations-budget-estimates',
		'/australia-news/live/2022/nov/08/australia-politics-news-live-updates-albanese-dutton-labor-cop27-floods-emergency-warnings-energy-coalition-ir-bill-covid-weather',
		'/australia-news/live/2022/nov/09/australia-live-news-peter-reith-sri-lanka-parliament-senate-estimates-defence-industrial-relations-workplace-laws-anthony-albanese-peter-dutton-environment-cop-peter-reith',
		'/australia-news/live/2022/nov/10/australia-news-live-rba-energy-prices-windfall-profits-tax-cost-of-living-politics-anthony-albanese-peter-dutton-reserve-bank',
		'/australia-news/live/2022/nov/11/australia-news-live-anthony-albanese-politics-china-xi-jinping-summit-g20-workplace-ir-cost-of-living-gas-energy-prices',
		'/australia-news/live/2022/nov/12/australia-live-news-cruise-ship-with-800-covid-positive-passengers-docks-in-sydney-albanese-at-cambodia-summit',
		'/australia-news/live/2022/nov/13/australia-news-live-anthony-albanese-politics-summit-cambodia-xi-jinping-tanya-plibersek-weather-storms-environment-cop-climate-change',
		'/australia-news/live/2022/nov/14/australia-news-live-weather-flooding-albanese-bali-summit-housing-health-gambling-economy-nsw-victoria-qld',
		'/australia-news/live/2022/nov/15/australia-live-news-anthony-albanese-china-dialogue-xi-jinping-flood-warnings-nsw-weather-g20-cop27-climate-change-chris-bowen',
		'/australia-news/live/2022/nov/16/australia-live-news-albanese-to-meet-leaders-of-uk-france-and-india-flood-cleanup-begins-in-nsw',
		'/australia-news/live/2022/nov/17/australia-news-live-flood-weather-economy-defence-housing-health-albanese-summit-police-qld-vic-nsw',
		'/australia-news/live/2022/nov/18/australia-live-news-mh17-anthony-albanese-peter-dutton-labor-coalition-sean-turnell-myanmar',
		'/australia-news/live/2022/nov/19/australia-live-news-anthony-albanese-trade-apec-flood-alerts-nsw-cop27-chris-bowen-victorian-election-daniel-andrews-covid-hospitals',
	],
	business: [
		'/business/live/2022/nov/03/bank-of-england-interest-rates-inflation-pound-recession-ftse-stock-market-business-live',
		'/business/live/2022/nov/04/twitter-sued-layoffs-sizewell-nuclear-plant-uk-recession-us-jobs-business-live',
		'/business/live/2022/nov/07/uk-house-prices-fall-ceo-pay-made-ryanair-twitter-meta-business-live',
		'/business/live/2022/nov/08/primark-higher-costs-cost-of-living-squeeze-supermarkets-christmas-food-business-live',
		'/business/live/2022/nov/09/ms-warns-more-challenging-2024-madecom-enters-administration-us-markets-midterm-elections-business-live',
		'/business/live/2022/nov/10/next-ceo-lord-wolfson-brexit-foreign-workers-uk-economy-us-inflation-ftx-bitcoin-business-live',
		'/business/live/2022/nov/11/uk-economy-gdp-recession-trade-hunt-stock-markets-ftse-pound-business-live',
		'/business/live/2022/nov/14/joules-administrators-cost-of-living-business-confidence-recession-rightmove-business-live',
		'/business/live/2022/nov/15/uk-unemployment-rate-rises-real-wages-strikes-vacancies-business-live',
		'/business/live/2022/nov/16/uk-inflation-high-energy-food-house-prices-bank-of-england-business-live',
		'/business/live/2022/nov/17/jeremy-hunt-excessive-austerity-markets-autumn-statement-city-pound-gilts-recession-business-live',
		'/business/live/2022/nov/18/retail-sales-uk-grim-outlook-autumn-statement-hunt-ifs-recession-business-live',
		'/business/live/2022/nov/21/cbi-uk-economy-growth-jeremy-hunt-ftse-oil-covid-business-live',
		'/business/live/2022/nov/22/uk-borrowing-october-energy-bill-support-oecd-uk-economy-business-live',
	],
	environment: [
		'/environment/live/2022/nov/06/australia-live-news-update-nsw-flood-water-emergency-warnings-floods-canberra-missing-boy-cop27-tony-burke-ir-politics-covid-cases-omicron',
		'/environment/live/2022/nov/07/cop27-egypt-climate-summit-boris-johnson-net-zero-live',
		'/environment/live/2022/nov/08/cop27-un-climate-conference-day-two-crisis-live',
		'/environment/live/2022/nov/09/cop27-egypt-negotiations-and-protests-begin-in-sharm-el-sheikh-live',
		'/environment/live/2022/nov/10/cop27-egypt-climate-crisis-environment-fossil-fuel-lobbyists-latest-live',
		'/environment/live/2022/nov/11/cop27-egypt-joe-biden-climate-conference-decarbonisation-live-updates',
		'/environment/live/2022/nov/12/cop27-latest-news-protests-sharm-el-sheikh-egpyt-climate',
		'/environment/live/2022/nov/14/cop27-egypt-lula-brazil-rainforests-climate-conference-live',
		'/environment/live/2022/nov/15/cop27-egypt-news-organisations-climate-justice-live',
		'/environment/live/2022/nov/16/cop27-paris-agreement-deal-nature-biodiversity-brazil-lula-live',
		'/environment/live/2022/nov/17/cop27-draft-cover-text-published-fears-lack-ambition-live',
		'/environment/live/2022/nov/18/cop27-egypt-eu-finance-fund-poorer-countries-climate-conference-live',
		'/environment/live/2022/nov/19/cop27-fears-15c-target-danger-negotiations-overrun-live',
	],
	football: [
		'/football/live/2022/nov/03/arsenal-v-fc-zurich-europa-league-live',
		'/football/live/2022/nov/03/real-sociedad-v-manchester-united-europa-league-live',
		'/football/live/2022/nov/04/premier-league-fa-cup-wsl-news-world-cup-injury-latest-football-countdown-live',
		'/football/live/2022/nov/05/everton-v-leicester-premier-league-live',
		'/football/live/2022/nov/05/premier-league-clockwatch-manchester-city-fulham-fa-cup-efl-clockwatch-live',
		'/football/live/2022/nov/06/chelsea-v-arsenal-premier-league-live',
		'/football/live/2022/nov/06/manchester-united-v-chelsea-womens-super-league-live',
		'/football/live/2022/nov/06/tottenham-hotspur-v-liverpool-premier-league-live',
		'/football/live/2022/nov/07/champions-league-europa-draw-updates-manchester-city-chelsea-liverpool-tottenham-united-live',
		'/football/live/2022/nov/08/leicester-v-newport-bournemouth-v-everton-and-more-carabao-cup-clockwatch-live',
		'/football/live/2022/nov/09/arsenal-v-brighton-nottingham-forest-v-tottenham-liverpool-derby-newcastle-crystal-palacecarabao-cup-live',
		'/football/live/2022/nov/09/manchester-city-chelsea-carabao-cup-third-round-live-score-updates',
		'/football/live/2022/nov/10/manchester-united-v-aston-villa-carabao-cup-third-round-live',
		'/football/live/2022/nov/11/england-v-japan-womens-international-football-friendly-live',
		'/football/live/2022/nov/11/premier-league-team-news-and-world-cup-latest-football-countdown-live',
	],
	politics: [
		'/politics/live/2022/jan/31/uk-politics-live-omicron-nhs-workers-coronavirus-vaccines-no-10-sue-gray-report',
		'/politics/live/2022/nov/03/home-office-denies-blame-asylum-seekers-stranded-london-manston-suella-braverman-rishi-sunak-uk-politics-live',
		'/politics/live/2022/nov/04/brexit-interest-rates-rishi-sunak-immigration-uk-economy-uk-politics-live-news',
		'/politics/live/2022/nov/07/rishi-sunak-gavin-williamson-texts-uk-politics-live',
		'/politics/live/2022/nov/08/gavin-williamson-rishi-sunak-uk-politics-latest-live-news',
		'/politics/live/2022/nov/09/rishi-sunak-gavin-williamson-resignation-keir-starmer-pmqs-uk-politics-live',
		'/politics/live/2022/nov/10/rishi-sunak-nicola-sturgeon-mark-drakeford-politics-live-latest-updates',
		'/politics/live/2022/nov/11/jeremy-hunt-kwasi-kwarteng-mini-budget-economy-liz-truss-uk-politics-latest',
		'/politics/live/2022/nov/14/james-cleverly-uk-france-channel-asylum-seekers-rishi-sunak-g20-uk-politics-latest',
		'/politics/live/2022/nov/15/iain-duncan-smith-rishi-sunak-china-g20-jeremy-hunt-uk-politics-latest',
		'/politics/live/2022/nov/16/rishi-sunak-joe-biden-g20-ukraine-china-xi-jinping-uk-politics-live',
		'/politics/live/2022/nov/17/autumn-statement-2022-live-jeremy-hunt-to-unveil-budget-plans-as-labour-says-12-years-of-tory-economic-failure-holding-uk-back-rishi-sunak-latest-updates',
		'/politics/live/2022/nov/18/jeremy-hunt-warns-of-two-challenging-years-after-autumn-statement-budget-uk-politics-live',
		'/politics/live/2022/nov/21/brexit-rishi-sunak-swiss-deal-cbi-chief-uk-politics-live-latest-updates',
		'/politics/live/2022/nov/22/keir-starmer-labour-cbi-immigration-conservatives-dominic-raab-uk-politics-latest',
	],
	science: [
		'/science/live/2022/nov/16/artemis-1-nasa-rocket-launch-moon-mission-space-live-updates',
	],
	sport: [
		'/sport/live/2022/nov/03/world-series-game-5-philadelphia-phillies-v-houston-astros-live-latest-score',
		'/sport/live/2022/nov/04/t20-world-cup-cricket-australia-vs-afghanistan-live-scores-updates-2022-super-12-12s-scorecard-aus-v-afg-latest-score',
		'/sport/live/2022/nov/05/australia-v-lebanon-rugby-league-world-cup-quarter-final-live',
		'/sport/live/2022/nov/05/canada-england-womens-rugby-world-cup-semi-final-live',
		'/sport/live/2022/nov/05/england-papua-new-guinea-rugby-league-world-cup-quarter-final-live',
		'/sport/live/2022/nov/05/france-v-australia-rugby-union-test-match-live',
		'/sport/live/2022/nov/05/horse-racing-breeders-cup-day-two-live-updates',
		'/sport/live/2022/nov/05/ireland-v-south-africa-rugby-autumn-nations-series-live',
		'/sport/live/2022/nov/05/new-zealand-france-womens-rugby-world-cup-semi-final-live',
		'/sport/live/2022/nov/05/sri-lanka-v-england-t20-world-cup-super-12s-live',
		'/sport/live/2022/nov/05/wales-v-new-zealand-rugby-autumn-nations-series-live',
		'/sport/live/2022/nov/05/world-series-game-5-philadelphia-phillies-v-houston-astros-live-latest-score',
		'/sport/live/2022/nov/06/england-v-argentina-autumn-nations-series-live',
		'/sport/live/2022/nov/09/new-zealand-v-pakistan-t20-world-cup-semi-final-live',
		'/sport/live/2022/nov/10/cricket-india-england-t20-world-cup-semi-final-live-updates',
	],
	'tv-and-radio': [
		'/tv-and-radio/live/2022/nov/05/strictly-come-dancing-week-seven-live',
		'/tv-and-radio/live/2022/nov/08/the-great-british-bake-off-2022-semi-final-live',
		'/tv-and-radio/live/2022/nov/12/strictly-come-dancing-week-eight-live',
		'/tv-and-radio/live/2022/nov/15/the-great-british-bake-off-2022-final-live',
		'/tv-and-radio/live/2022/nov/19/strictly-come-dancing-week-nine-live',
	],
	'us-news': [
		'/us-news/live/2022/nov/03/midterms-2022-biden-speech-trump-election-politics-latest',
		'/us-news/live/2022/nov/04/us-midterms-elections-2022-fetterman-oprah-biden-harris-latest-updates',
		'/us-news/live/2022/nov/07/midterms-election-biden-trump-campaign-republicans-democrats-politics-latest-updates',
		'/us-news/live/2022/nov/08/midterm-elections-2022-polls-results-senate-house-us-midterm-voting-republicans-democrats-live-updates-latest-news',
		'/us-news/live/2022/nov/08/us-midterms-election-2022-house-senate-midterm-voting-republicans-democrats-live-news-latest-updates',
		'/us-news/live/2022/nov/09/midterm-elections-2022-results-senate-house-us-democrats-republicans-live-updates-latest-news',
		'/us-news/live/2022/nov/11/us-midterm-election-2022-senate-house-results-congress-democrats-republicans-politics-live-updates-latest',
		'/us-news/live/2022/nov/12/us-midterm-elections-latest-nevada-georgia-senate-democrats-republicans',
		'/us-news/live/2022/nov/13/us-midterm-elections-2022-democrats-retain-senate-control-house-undecided-live-updates-latest-news',
		'/us-news/live/2022/nov/14/us-midterm-elections-2022-house-control-democrats-republicans-results-latest-updates-live-news',
		'/us-news/live/2022/nov/15/donald-trump-2024-announcement-president-republican-nomination-speech-live-updates',
		'/us-news/live/2022/nov/15/us-midterm-elections-republicans-house-power-senate-trump-2024',
		'/us-news/live/2022/nov/16/us-midterms-donald-trump-house-congress-politics-live-updates',
		'/us-news/live/2022/nov/17/midterms-house-republican-majority-pelosi-future-mccarthy-biden-trump-election-latest',
		'/us-news/live/2022/nov/18/jan-6-trump-republicans-house-democrats-us-politics-latest',
	],
};
