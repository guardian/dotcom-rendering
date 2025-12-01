import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMiniMatchStats } from './FootballMiniMatchStats';

const meta = {
	title: 'Components/Football Mini Match Stats',
	component: FootballMiniMatchStats,
	decorators: [
		(Story) => (
			<div
				css={css`
					padding: ${space[4]}px;
					background-color: ${palette.neutral[97]};
				`}
			>
				<Story />
			</div>
		),
	],
	parameters: {
		viewport: {
			defaultViewport: 'mobileMedium',
		},
	},
} satisfies Meta<typeof FootballMiniMatchStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMiniMatchStatsMobile = {
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
				label: 'Possession',
				homeValue: 39,
				awayValue: 61,
				showPercentage: true,
			},
			{ label: 'Goal Attempts', homeValue: 7, awayValue: 4 },
		],
	},
} satisfies Story;
