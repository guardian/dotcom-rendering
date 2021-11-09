import { MatchTabs } from './MatchTabs';

export default {
	component: MatchTabs,
	title: 'Components/MatchTabs',
};

export const Default = () => {
	return (
		<MatchTabs minByMinUrl="https://www.theguardian.com/football/live/2020/aug/10/manchester-united-v-fc-copenhagen-europa-league-quarter-final-live" />
	);
};
Default.story = { name: 'default' };
