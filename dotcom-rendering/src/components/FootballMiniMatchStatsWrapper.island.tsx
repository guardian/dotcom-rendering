import { FootballMiniMatchStats } from './FootballMiniMatchStats';

export const FootballMiniMatchStatsWrapper = ({
	matchStatsUrl,
}: {
	matchStatsUrl: string;
}) => (
	<FootballMiniMatchStats
		matchStatsUrl={matchStatsUrl}
		getMatchStatsData={getMatchStatsData}
		refreshInterval={16_000}
	/>
);

const getMatchStatsData = (url: string): Promise<unknown> =>
	fetch(url).then((res) => res.json());
