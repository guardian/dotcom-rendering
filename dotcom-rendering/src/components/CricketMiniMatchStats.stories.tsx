import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import { palette } from '../palette';
import { CricketMiniMatchStats as CricketMiniMatchStatsComponent } from './CricketMiniMatchStats';

// For Development Purposes
import { object, string, Output } from 'valibot';

const feCricketMatchStatsSummarySchema = object({
	id: string(),
	currentBattingTeam: string(),
	matchStatus: string(),
	infoURL: string(),
});

type FECricketMatchStatsSummary = Output<
	typeof feCricketMatchStatsSummarySchema
>;
// End of Development Helpers

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
	id: '4540747',
	matchStatus: 'test',
	currentBattingTeam: 'England',
	infoURL:
		'https://www.theguardian.com/football/match/2026/feb/17/bristolcity-v-wrexham',
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
			'https://api.nextgen.guardianapps.co.uk/sport/cricket/match-header/2026-06-25/england-cricket-team.json',
		getMatchStatsData: () => getMockData(feMatchStatsSummaryData),
		refreshInterval: 16_000,
	},
});
