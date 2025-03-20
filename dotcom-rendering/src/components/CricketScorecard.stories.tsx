import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { CricketScorecard } from './CricketScorecard';

const meta: Meta = {
	component: CricketScorecard,
	title: 'Components/CricketScorecard',
	decorators: [
		// To make the story not shoved in the corner.
		(Story) => (
			<>
				<div css={{ padding: 16 }}>
					<Story />
				</div>
			</>
		),
	],
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobileLandscape],
		},
	},
};

type Story = StoryObj<typeof CricketScorecard>;

export const defaultStory: Story = {
	name: 'Cricket Scorecard',
	args: {
		batters: [
			{
				name: 'Rohit Sharma',
				ballsFaced: 83,
				runs: 76,
				fours: 7,
				sixes: 3,
				howOut: 'st Latham b Ravindra',
			},
			{
				name: 'Shubman Gill',
				ballsFaced: 50,
				runs: 31,
				fours: 0,
				sixes: 1,
				howOut: 'c Phillips b Santner',
			},
			{
				name: 'Virat Kohli',
				ballsFaced: 2,
				runs: 1,
				fours: 0,
				sixes: 0,
				howOut: 'lbw b Bracewell',
			},
			{
				name: 'Shreyas Iyer',
				ballsFaced: 62,
				runs: 48,
				fours: 2,
				sixes: 2,
				howOut: 'c Ravindra b Santner',
			},
		],
		bowlers: [
			{
				name: 'Mohammed Shami',
				overs: 9,
				maidens: 0,
				runs: 74,
				wickets: 1,
				balls: 55,
			},
			{
				name: 'Hardik Pandya',
				overs: 3,
				maidens: 0,
				runs: 30,
				wickets: 0,
				balls: 18,
			},
			{
				name: 'Varun Chakaravarthy',
				overs: 10,
				maidens: 0,
				runs: 45,
				wickets: 2,
				balls: 60,
			},
			{
				name: 'Kuldeep Yadav',
				overs: 10,
				maidens: 0,
				runs: 40,
				wickets: 2,
				balls: 60,
			},
			{
				name: 'Axar Patel',
				overs: 8,
				maidens: 0,
				runs: 29,
				wickets: 0,
				balls: 48,
			},
			{
				name: 'Ravindra Jadeja',
				overs: 10,
				maidens: 0,
				runs: 30,
				wickets: 1,
				balls: 60,
			},
		],
	},
};

export default meta;
