import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { footballTeams } from '../../fixtures/manual/footballTeams';
import { FootballMatchGoalAttempts } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Goal Attempts',
	component: FootballMatchGoalAttempts,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof FootballMatchGoalAttempts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		homeTeam: {
			name: 'Manchester United',
			colour: '#da020e',
		},
		awayTeam: {
			name: 'Arsenal',
			colour: '#023474',
		},
		homeValues: {
			offTarget: 6,
			onTarget: 5,
		},
		awayValues: {
			offTarget: 6,
			onTarget: 2,
		},
	},
} satisfies Story;

export const TeamColours = {
	render: (args) => (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				gap: ${space[2]}px;
			`}
		>
			{footballTeams.map((match, index) => (
				<FootballMatchGoalAttempts
					{...args}
					homeTeam={{
						name: match.home.name,
						colour: match.home.colour,
					}}
					awayTeam={{
						name: match.away.name,
						colour: match.away.colour,
					}}
					key={index}
				/>
			))}
		</div>
	),
	args: {
		...Default.args,
	},
} satisfies Story;
