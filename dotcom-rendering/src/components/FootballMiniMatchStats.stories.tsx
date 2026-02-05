import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
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

export const FootballMiniMatchStats = {
	args: {
		homeTeam: {
			name: 'Manchester United',
			colour: '#da020e',
		},
		awayTeam: {
			name: 'Arsenal',
			colour: '#023474',
		},
		stats: [
			{
				heading: 'Possession',
				homeValue: 39,
				awayValue: 61,
				isPercentage: true,
			},
			{ heading: 'Goal Attempts', homeValue: 7, awayValue: 4 },
		],
	},
} satisfies Story;
