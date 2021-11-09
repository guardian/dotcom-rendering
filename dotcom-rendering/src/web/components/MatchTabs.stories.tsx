import { MatchTabs } from './MatchTabs';

export default {
	component: MatchTabs,
	title: 'Components/MatchTabs',
};

export const Default = () => {
	return (
		<MatchTabs
			minByMinUrl="https://www.theguardian.com/football/live/2021/nov/03/manchester-city-v-club-brugge-champions-league-live-score-updates"
			matchUrl="https://www.theguardian.com/football/2021/nov/03/manchester-city-club-brugge-champions-league-match-report"
		/>
	);
};
Default.story = { name: 'default' };
