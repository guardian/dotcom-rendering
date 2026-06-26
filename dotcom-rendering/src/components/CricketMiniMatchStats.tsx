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
import type { CricketMatchStatsSummary } from '../cricketMatchV2';
import { parseMatchStatsSummary } from '../cricketMatchV2';
import { feCricketMatchStatsSummarySchema } from '../frontend/feCricketMatchPage';
import type { Result } from '../lib/result';
import { error, fromValibot, ok } from '../lib/result';
import { palette } from '../palette';
import { CricketMatchStat } from './CricketMatchStat';
import { Placeholder } from './Placeholder';

const containerCss = css`
	isolation: isolate; /* [1] */
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 10px;
	background-color: ${palette('--football-live-blog-background')};
	${from.mobileLandscape} {
		padding: 20px;
	}
	${from.desktop} {
		padding-top: 24px;
		padding-right: 0;
	}
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

export const CricketMiniMatchStats = (props: Props) => {
	const { data, error: swrError } = useSWR<CricketMatchStatsSummary, string>(
		props.matchStatsUrl,
		fetcher(props.getMatchStatsData),
		swrOptions(props.refreshInterval),
	);

	if (swrError != null) {
		return null;
	}

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

	return (
		<div css={containerCss}>
			<CricketMatchStat
				heading={'Match Status'}
				value={data.matchStatus}
			/>
			<CricketMatchStat
				heading={'Current Batting Team'}
				value={data.currentBattingTeam}
			/>
			<CricketMatchStat
				heading={'Not Out Batters'}
				// This data will need to be properly handled here or in CricketMatchStat
				value={data.notOutBatters?.at(0).name}
			/>
			<LinkButton
				href={'#'}
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
				<span css={buttonTextCss}>More match info</span>
				<span css={buttonTextShortCss}>More match info</span>
			</LinkButton>
		</div>
	);
};

const swrOptions = (
	refreshInterval: number,
): SWRConfiguration<CricketMatchStatsSummary> => ({
	errorRetryCount: 1,
	refreshInterval: (latestData: CricketMatchStatsSummary | undefined) =>
		latestData?.matchStatus === 'FT' ? 0 : refreshInterval,
});

const fetcher =
	(getMatchStatsData: Props['getMatchStatsData']) =>
	(url: string): Promise<CricketMatchStatsSummary> =>
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

const parseData = (json: unknown): Result<string, CricketMatchStatsSummary> => {
	const feData = fromValibot(
		safeParse(feCricketMatchStatsSummarySchema, json),
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
