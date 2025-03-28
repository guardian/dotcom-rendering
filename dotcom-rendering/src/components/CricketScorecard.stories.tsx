import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { CricketScorecard as CricketScorecardComponent } from './CricketScorecard';

const meta = {
	component: CricketScorecardComponent,
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
} satisfies Meta<typeof CricketScorecardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CricketScorecard = {
	name: 'Cricket Scorecard',
	args: {
		allInnings: [
			{
				description: 'India first innings',
				inningsTotals: {
					runs: 254,
					overs: '49.0',
					extras: 8,
					wickets: 7,
				},
				extras: {
					byes: 1,
					legByes: 2,
					wides: 5,
					noBalls: 0,
					penalties: 0,
				},
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
				fallOfWickets: [
					{
						order: 1,
						name: 'Shubman Gill',
						runs: 105,
					},
					{
						order: 2,
						name: 'Virat Kohli',
						runs: 106,
					},
					{
						order: 3,
						name: 'Rohit Sharma',
						runs: 122,
					},
				],
			},
			{
				inningsTotals: {
					runs: 254,
					overs: '49.0',
					extras: 8,
					wickets: 7,
				},
				extras: {
					byes: 0,
					legByes: 3,
					noBalls: 0,
					penalties: 0,
					wides: 13,
				},
				description: 'New Zealand first innings',
				batters: [
					{
						name: 'Will Young',
						ballsFaced: 23,
						runs: 15,
						fours: 2,
						sixes: 0,
						howOut: 'lbw b Vinod',
					},
					{
						name: 'Rachin Ravindra',
						ballsFaced: 29,
						runs: 37,
						fours: 4,
						sixes: 1,
						howOut: 'b Yadav',
					},
					{
						name: 'Kane Williamson',
						ballsFaced: 14,
						runs: 11,
						fours: 1,
						sixes: 0,
						howOut: 'c & b Yadav',
					},
					{
						name: 'Daryl Mitchell',
						ballsFaced: 101,
						runs: 63,
						fours: 3,
						sixes: 0,
						howOut: 'c Sharma b Ahmed',
					},
				],
				bowlers: [
					{
						name: 'Mohammed Shami',
						overs: 9,
						maidens: 0,
						runs: 74,
						wickets: 1,
						balls: 54,
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
				],
				fallOfWickets: [
					{
						order: 1,
						name: 'Will Young',
						runs: 57,
					},
					{
						order: 2,
						name: 'Rachin Ravindra',
						runs: 69,
					},
				],
			},
		],
		officials: [
			'P R Reiffel',
			'R K Illingworth',
			'J S Wilson',
			'H D P K Dharmasena',
			'R S Madugalle',
		],
		homeTeam: {
			name: 'India',
			lineup: [
				'Rohit Sharma',
				'Shubman Gill',
				'Virat Kohli',
				'Shreyas Iyer',
				'Axar Patel',
				'Lokesh Rahul',
				'Hardik Pandya',
				'Ravindra Jadeja',
				'Mohammed Shami',
				'Kuldeep Yadav',
				'Varun Chakaravarthy',
			],
		},
		awayTeam: {
			name: 'New Zealand',
			lineup: [
				'Rachin Ravindra',
				'Will Young',
				'Kane Williamson',
				'Daryl Mitchell',
				'Tom Latham',
				'Glenn Phillips',
				'Michael Bracewell',
				'Mitchell Santner',
				'Nathan Smith',
				'Kyle Jamieson',
				"Will O'Rourke",
			],
		},
	},
} satisfies Story;
