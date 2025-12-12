import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { palette } from '../palette';
import { FootballMatchStat } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Stat',
	component: FootballMatchStat,
	decorators: [
		(Story) => (
			<div
				css={css`
					padding: ${space[4]}px;
					background-color: ${palette(
						'--football-live-blog-background',
					)};
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

export const Default = {
	args: {
		label: 'Goal attempts',
		homeTeam: {
			name: 'Manchester United',
			colour: '#da020e',
		},
		awayTeam: {
			name: 'Arsenal',
			colour: '#023474',
		},
		homeValue: 7,
		awayValue: 4,
	},
} satisfies Story;

export const ShownAsPercentage = {
	args: {
		label: 'Possession',
		homeTeam: {
			name: 'West Ham',
			colour: '#722642',
		},
		awayTeam: {
			name: 'Newcastle',
			colour: '#383838',
		},
		homeValue: 39,
		awayValue: 61,
		showPercentage: true,
	},
} satisfies Story;

export const RaisedLabelOnDesktop = {
	args: {
		...Default.args,
		raiseLabelOnDesktop: true,
	},
} satisfies Story;

export const LargeNumbersOnDesktop = {
	args: {
		...Default.args,
		largeNumbersOnDesktop: true,
	},
} satisfies Story;
