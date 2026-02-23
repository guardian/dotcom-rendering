import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import { safeParse } from 'valibot';
import {
	type FootballMatchStatsSummary,
	parseMatchStatsSummary,
} from '../footballMatchStats';
import { feFootballMatchStatsSummarySchema } from '../frontend/feFootballMatchInfoPage';
import type { Result } from '../lib/result';
import { error, fromValibot, ok } from '../lib/result';
import { palette } from '../palette';
import { FootballMatchStat } from './FootballMatchStat';
import { Placeholder } from './Placeholder';

const containerCss = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const buttonTextCss = css`
	${from.desktop} {
		display: none;
	}
`;

const buttonTextShortCss = css`
	display: none;
	${from.desktop} {
		display: inline;
	}
`;

type Props = {
	matchStatsUrl: string;
	getMatchStatsData: (url: string) => Promise<unknown>;
	refreshInterval: number;
};

export const FootballMiniMatchStats = (props: Props) => {
	const { data } = useSWR<FootballMatchStatsSummary, string>(
		props.matchStatsUrl,
		fetcher(props.getMatchStatsData),
		swrOptions(props.refreshInterval),
	);

	if (data === undefined) {
		return (
			<Placeholder
				heights={
					new Map([
						['mobile', 159],
						['desktop', 197],
					])
				}
			/>
		);
	}

	const homeTeam = {
		name: data.homeTeam.name,
		colour: data.homeTeam.statsColour,
	};
	const awayTeam = {
		name: data.awayTeam.name,
		colour: data.awayTeam.statsColour,
	};

	return (
		<div css={containerCss}>
			<FootballMatchStat
				heading="Posession"
				homeTeam={homeTeam}
				awayTeam={awayTeam}
				homeValue={data.homeTeam.possession}
				awayValue={data.awayTeam.possession}
				isPercentage={true}
				layout="compact"
			/>
			<FootballMatchStat
				heading="Goal Attempts"
				homeTeam={homeTeam}
				awayTeam={awayTeam}
				homeValue={data.homeTeam.shotsTotal}
				awayValue={data.awayTeam.shotsTotal}
				layout="compact"
			/>
			<LinkButton
				href={data.infoURL}
				size="small"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				theme={{
					backgroundPrimary: palette(
						'--football-match-stat-button-background',
					),
					backgroundPrimaryHover: palette(
						'--football-match-stat-button-background-hover',
					),
				}}
			>
				<span css={buttonTextCss}>More stats, line-ups and tables</span>
				<span css={buttonTextShortCss}>Stats and line ups</span>
			</LinkButton>
		</div>
	);
};

const swrOptions = (
	refreshInterval: number,
): SWRConfiguration<FootballMatchStatsSummary> => ({
	errorRetryCount: 1,
	refreshInterval: (latestData: FootballMatchStatsSummary | undefined) =>
		latestData?.status === 'FT' ? 0 : refreshInterval,
});

const fetcher =
	(getMatchStatsData: Props['getMatchStatsData']) =>
	(url: string): Promise<FootballMatchStatsSummary> =>
		getMatchStatsData(url)
			.then(parseData)
			.then((result) => {
				if (!result.ok) {
					log('dotcom', result.error);
					throw new Error();
				} else {
					return result.value;
				}
			})
			.catch(() => {
				log('dotcom', 'Failed to fetch math stats summary data');
				throw new Error();
			});

const parseData = (
	json: unknown,
): Result<string, FootballMatchStatsSummary> => {
	const feData = fromValibot(
		safeParse(feFootballMatchStatsSummarySchema, json),
	);

	if (!feData.ok) {
		return error('Failed to validate match stats summary data');
	}

	const parsedMatchStats = parseMatchStatsSummary(feData.value);

	if (!parsedMatchStats.ok) {
		return error('Failed to parse match stats summary');
	}

	return ok(parsedMatchStats.value);
};
