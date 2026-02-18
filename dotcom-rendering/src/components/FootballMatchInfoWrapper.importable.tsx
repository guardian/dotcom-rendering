import { useApiWithFetcher } from '../lib/useApi';
import { FootballMatchInfo } from './FootballMatchInfo';
import { FootballMatchStats, parseMatchStats } from '../footballMatchStats';
import { error, fromValibot, ok, Result } from '../lib/result';
import { safeParse } from 'valibot';
import { feFootballMatchStatsSchema } from '../frontend/feFootballMatchInfoPage';
import { Placeholder } from './Placeholder';

const Loading = () => <Placeholder heights={new Map([['mobile', 40]])} />;

export const FootballMatchInfoWrapper = ({
	matchStatsUrl,
}: {
	matchStatsUrl: string;
}) => {
	const { data, error, loading } = useApiWithFetcher<
		FootballMatchStats,
		string
	>(matchStatsUrl, parse, {
		errorRetryCount: 1,
	});

	if (loading) return <Loading />;

	if (error) {
		// Send the error to Sentry and then prevent the element from rendering
		// window.guardian.modules.sentry.reportError(error, 'match-tabs');

		return null;
	}

	if (data) {
		return <FootballMatchInfo matchStats={data} />;
	}

	return null;
};

const parse: (json: unknown) => Result<string, FootballMatchStats> = (
	json: unknown,
) => {
	const feData = fromValibot(safeParse(feFootballMatchStatsSchema, json));

	if (!feData.ok) {
		return error('Failed to validate match stats json');
	}

	const parsedMatchStats = parseMatchStats(feData.value);

	if (!parsedMatchStats.ok) {
		return error('Failed to parse the match stats from the stats json');
	}

	return ok(parsedMatchStats.value);
};
