import type { SWRConfiguration } from 'swr';
import { ArticleDesign, type ArticleFormat } from '../lib/format';
import { useApi } from '../lib/useApi';
import { useHydrated } from '../lib/useHydrated';
import type { TeamType } from '../types/sport';
import { MatchStats } from './MatchStats';
import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={800} />;

const cleanTeamCodes = ({
	name,
	codename,
}: Pick<TeamType, 'name' | 'codename'>): string => {
	// Need to check the team name as South Korea and South Africa both have SOU as their code
	switch (name) {
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
			return codename;
	}
};

/**
 * Ensure team codes are normalised
 *
 * See also [frontend implementation](https://github.com/guardian/frontend/blob/2715f1bf0123591076dc66503c6e2deebbb64a31/sport/app/football/model/GuTeamCode.scala)
 */
const cleanTeamData = <T extends { name: string; codename: string }>(
	team: T,
): T => ({
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
		competition: {
			fullName: string;
		};
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
				competition={data.competition.fullName}
				format={format}
			/>
		);
	}

	return null;
};
