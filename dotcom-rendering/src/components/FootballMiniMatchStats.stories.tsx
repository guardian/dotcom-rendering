import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { FEFootballMatchStatsSummary } from '../frontend/feFootballMatchInfoPage';
import { palette } from '../palette';
import { FootballMiniMatchStats as FootballMiniMatchStatsComponent } from './FootballMiniMatchStats';

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

const containerCss = css`
	padding: 10px;
	${from.desktop} {
		padding-left: 20px;
		padding-right: 0;
	}
`;

const meta = {
	title: 'Components/Football Mini Match Stats',
	component: FootballMiniMatchStatsComponent,
	decorators: [
		(Story) => (
			<div css={gridCss}>
				<div css={containerCss}>
					<Story />
				</div>
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
} satisfies Meta<typeof FootballMiniMatchStatsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const feMatchStatsSummaryData: FEFootballMatchStatsSummary = {
	id: '4540747',
	homeTeam: {
		id: '49',
		name: 'Bristol City',
		possession: 53,
		shotsOn: 5,
		shotsOff: 3,
		colours: '#c70c23',
	},
	awayTeam: {
		id: '91',
		name: 'Wrexham',
		possession: 47,
		shotsOn: 3,
		shotsOff: 6,
		colours: '#d82529',
	},
	status: 'FT',
	infoURL:
		'https://www.theguardian.com/football/match/2026/feb/17/bristolcity-v-wrexham',
};

const getMockData = (data: FEFootballMatchStatsSummary) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(data);
		}, 1000);
	});

export const FootballMiniMatchStats = {
	args: {
		matchStatsUrl:
			'https://api.nextgen.guardianapps.co.uk/football/api/match-stats-summary/2026/02/17/49/91.json',
		getMatchStatsData: () => getMockData(feMatchStatsSummaryData),
		refreshInterval: 16_000,
	},
} satisfies Story;
