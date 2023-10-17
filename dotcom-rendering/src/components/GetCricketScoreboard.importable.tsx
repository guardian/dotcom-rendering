import { ArticleDesign } from '@guardian/libs';
import type { SWRConfiguration } from 'swr';
import { reportErrorToSentry } from '../lib/reportErrorToSentry';
import { useApi } from '../lib/useApi';
import { CricketScoreboard } from './CricketScoreboard';
import { Placeholder } from './Placeholder';

type Props = {
	matchUrl: string;
	format: ArticleFormat;
};

const Loading = () => <Placeholder height={172} />;

export const GetCricketScoreboard = ({ matchUrl, format }: Props) => {
	const options: SWRConfiguration = {
		errorRetryCount: 1,
	};
	// If this blog is live then poll for new stats
	if (format.design === ArticleDesign.LiveBlog) {
		options.refreshInterval = 14_000;
	}

	const { data, error, loading } = useApi<{
		match: CricketMatch;
		scorecardUrl: string;
	}>(matchUrl, options);

	if (loading) return <Loading />;
	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		reportErrorToSentry(error, 'cricket-scoreboard');

		return null;
	}
	if (data?.match.matchId) {
		return (
			<CricketScoreboard
				match={data.match}
				scorecardUrl={data.scorecardUrl}
				format={format}
			/>
		);
	}

	return null;
};
