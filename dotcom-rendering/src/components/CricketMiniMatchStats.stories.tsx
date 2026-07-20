import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import type { FECricketMatchStatsSummary } from '../frontend/feCricketMatchPage';
import { palette } from '../palette';
import { CricketMiniMatchStats as CricketMiniMatchStatsComponent } from './CricketMiniMatchStats';

const gridCss = css`
	background-color: ${palette('--football-live-blog-background')};
	/**
	 * Extremely simplified live blog grid layout as we're only interested in
	 * the 240px wide left column added at the desktop breakpoint.
	 * dotcom-rendering/src/layouts/LiveLayout.tsx
	 */
	${from.desktop} {
		display: grid;
		grid-column-gap: 20px;
		grid-template-columns: 240px 1fr;
	}
`;

const meta = preview.meta({
	title: 'Components/Cricket Mini Match Stats',
	component: CricketMiniMatchStatsComponent,
	decorators: [
		(Story) => (
			<div css={gridCss}>
				<Story />
			</div>
		),
	],
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobileMedium,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
});

const feMatchStatsSummaryData: FECricketMatchStatsSummary = {
	status: 'abandoned',
	currentBattingTeam: 'England',
	notOutBatters: [
		{
			name: 'Tom Latham',
			order: 1,
			ballsFaced: 214,
			runs: 151,
			fours: 15,
			sixes: 0,
			out: false,
			howOut: 'not out',
			onStrike: false,
			nonStrike: true,
		},
		{
			name: 'Devon Conway',
			order: 2,
			ballsFaced: 224,
			runs: 157,
			fours: 22,
			sixes: 3,
			out: false,
			howOut: 'not out',
			onStrike: true,
			nonStrike: false,
		},
		{
			name: 'Devon Conway',
			order: 2,
			ballsFaced: 224,
			runs: 157,
			fours: 22,
			sixes: 3,
			out: false,
			howOut: 'not out',
			onStrike: false,
			nonStrike: false,
		},
	],
};

const getMockData = (data: FECricketMatchStatsSummary) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 1000);
	});

export const CricketMiniMatchStats = meta.story({
	args: {
		matchStatsUrl:
			'https://api.nextgen.guardianapps.co.uk/sport/cricket/match-stats/2026-06-25/england-cricket-team.json',
		getMatchStatsData: () => getMockData(feMatchStatsSummaryData),
		refreshInterval: 16_000,
	},
});
