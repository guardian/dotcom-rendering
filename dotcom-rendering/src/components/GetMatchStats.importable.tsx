import { ArticleDesign } from '@guardian/libs';
import type { SWRConfiguration } from 'swr';
import { useApi } from '../lib/useApi';
import { useHydrated } from '../lib/useHydrated';
import { MatchStats } from './MatchStats';
import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={800} />;

const cleanTeamCodes = (team: TeamType): string => {
	// Need to check the team name as South Korea and South Africa both have SOU as their code
	switch (team.name) {
		case 'China PR':
			return 'CHN';
		case 'Costa Rica':
			return 'CRC';
		case 'Japan':
			return 'JPN';
		case 'Morocco':
			return 'MAR';
		case 'Netherlands':
			return 'NED';
		case 'New Zealand':
			return 'NZL';
		case 'Nigeria':
			return 'NGA';
		case 'Rep of Ireland':
			return 'IRL';
		case 'South Africa':
			return 'RSA';
		case 'South Korea':
			return 'KOR';
		case 'Spain':
			return 'ESP';
		case 'Switzerland':
			return 'SUI';
		default:
			return team.codename;
	}
};

export const cleanTeamData = (team: TeamType): TeamType => ({
	...team,
	codename: cleanTeamCodes(team),
});

/**
 * Wrapper around `MatchStats`.
 *
 * ## Why does this need to be an Island?
 *
 * It fetches data from the API.
 *
 * ---
 *
 * [`MatchStats` on Chromatic](https://www.chromatic.com/component?appId=63e251470cfbe61776b0ef19&csfId=components-matchstats)
 */
export const GetMatchStats = ({ matchUrl, format }: Props) => {
	const hydrated = useHydrated();
	const options: SWRConfiguration = {};
	// If this blog is live then poll for new stats
	if (format.design === ArticleDesign.LiveBlog) {
		options.refreshInterval = 14_000;
	}
	const { data, error, loading } = useApi<{
		id: string;
		homeTeam: TeamType;
		awayTeam: TeamType;
	}>(matchUrl, options);

	if (loading || !hydrated) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'match=stats');

		return null;
	}
	if (data) {
		return (
			<MatchStats
				home={cleanTeamData(data.homeTeam)}
				away={cleanTeamData(data.awayTeam)}
				format={format}
			/>
		);
	}

	return null;
};
