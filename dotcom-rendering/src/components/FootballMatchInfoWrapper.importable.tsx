import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { safeParse } from 'valibot';
import type { FootballMatchStats } from '../footballMatchStats';
import { parseMatchStats } from '../footballMatchStats';
import { feFootballMatchStatsSchema } from '../frontend/feFootballMatchInfoPage';
import type { Result } from '../lib/result';
import { error, fromValibot, ok } from '../lib/result';
import { useApiWithParse } from '../lib/useApi';
import { FootballMatchInfo } from './FootballMatchInfo';
import { Placeholder } from './Placeholder';

const Loading = () => <Placeholder heights={new Map([['mobile', 40]])} />;

export const FootballMatchInfoWrapper = ({
	matchStatsUrl,
}: {
	matchStatsUrl: string;
}) => {
	const {
		data,
		error: apiError,
		loading,
	} = useApiWithParse<FootballMatchStats>(matchStatsUrl, parse, {
		errorRetryCount: 1,
	});

	if (loading) return <Loading />;

	if (apiError) {
		// Send the error to Sentry and then prevent the element from rendering
		window.guardian.modules.sentry.reportError(apiError, 'match-stats');

		log('dotcom', apiError);

		return null;
	}

	if (data) {
		return (
			<div
				css={css`
					padding-bottom: ${space[5]}px;
					padding-top: ${space[1]}px;
				`}
			>
				<FootballMatchInfo matchStats={data} />
			</div>
		);
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
