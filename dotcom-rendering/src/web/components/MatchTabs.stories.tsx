import { MatchTabs } from './MatchTabs';

export default {
	component: MatchTabs,
	title: 'Components/MatchTabs',
};

export const BothURLs = () => {
	return (
		<MatchTabs
			minByMinUrl="https://www.theguardian.com/football/live/2021/nov/03/manchester-city-v-club-brugge-champions-league-live-score-updates"
			matchUrl="https://www.theguardian.com/football/2021/nov/03/manchester-city-club-brugge-champions-league-match-report"
		/>
	);
};
BothURLs.story = { name: 'Both URLs' };

export const OnReportPage = () => {
	return (
		<MatchTabs minByMinUrl="https://www.theguardian.com/football/live/2021/nov/03/manchester-city-v-club-brugge-champions-league-live-score-updates" />
	);
};
OnReportPage.story = { name: 'On Report Page' };

export const OnBlogPage = () => {
	return (
		<MatchTabs matchUrl="https://www.theguardian.com/football/2021/nov/03/manchester-city-club-brugge-champions-league-match-report" />
	);
};
OnBlogPage.story = { name: 'On Blog Page' };
