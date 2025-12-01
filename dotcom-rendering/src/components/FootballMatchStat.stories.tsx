import { css } from '@emotion/react';
import { palette, space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMatchStat } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Stat',
	component: FootballMatchStat,
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
} satisfies Meta<typeof FootballMatchStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Possession = {
	args: {
		label: 'Possession',
		home: {
			teamName: 'Manchester United',
			teamColour: '#da020e',
			value: 39,
		},
		away: {
			teamName: 'Arsenal',
			teamColour: '#023474',
			value: 61,
		},
		showPercentage: true,
	},
} satisfies Story;

export const GoalAttempts = {
	args: {
		label: 'Goal Attempts',
		home: {
			teamName: 'West Ham',
			teamColour: '#722642',
			value: 7,
		},
		away: {
			teamName: 'Newcastle',
			teamColour: '#383838',
			value: 4,
		},
		showPercentage: true,
	},
} satisfies Story;
