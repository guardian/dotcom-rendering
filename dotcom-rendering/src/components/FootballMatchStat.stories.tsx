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
			defaultViewport: 'mobile',
		},
	},
} satisfies Meta<typeof FootballMatchStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Possession = {
	args: {
		label: 'Possession',
		homeColour: '#da020e',
		awayColour: '#023474',
		homeValue: 39,
		awayValue: 61,
		showPercentage: true,
	},
} satisfies Story;

export const GoalAttempts = {
	args: {
		label: 'Goal Attempts',
		homeColour: '#722642',
		awayColour: '#383838',
		homeValue: 7,
		awayValue: 4,
	},
} satisfies Story;
