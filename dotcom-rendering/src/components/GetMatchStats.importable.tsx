import { ArticleDesign } from '@guardian/libs';
import type { SWRConfiguration } from 'swr';
import { useApi } from '../lib/useApi';
import { MatchStats } from './MatchStats';
import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={800} />;

/**
 * # Get Match Stats
 *
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

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(error, 'match=stats');

		return null;
	}
	if (data) {
		return (
			<MatchStats
				home={data.homeTeam}
				away={data.awayTeam}
				format={format}
			/>
		);
	}

	return null;
};
