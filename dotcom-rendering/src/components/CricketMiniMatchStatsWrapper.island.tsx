import { CricketMiniMatchStats } from './CricketMiniMatchStats';

export const CricketMiniMatchStatsWrapper = ({
	matchStatsUrl,
}: {
	matchStatsUrl: string;
}) => (
	<CricketMiniMatchStats
		matchStatsUrl={matchStatsUrl}
		getMatchStatsData={getMatchStatsData}
		refreshInterval={16_000}
	/>
);

const getMatchStatsData = (url: string): Promise<unknown> => {
	return fetch(url).then((res) => res.json());
};
