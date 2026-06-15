import type { ComponentProps } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor } from 'storybook/test';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { CricketScorecardPageNew as CricketScorecardPageNewComponent } from './CricketScorecardPageNew';

const meta = preview.meta({
	component: CricketScorecardPageNewComponent,
	title: 'Components/CricketScorecardPage',
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
});

const baseArgs = {
	match: {
		kind: 'Fixture',
		series: 'Ashes 2025–2026',
		competition: 'Second Test Match',
		venue: 'Bengaluru Cricket Ground',
		matchDate: new Date('2026-01-26'),
		homeTeam: {
			paID: 'f822b9f9-9fdc-399f-54f9-e621edaf0a28',
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
			paID: '110c70b5-c05f-3be7-6670-baecd50a8c6b',
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
		innings: [],
		officials: [
			'P R Reiffel',
			'R K Illingworth',
			'J S Wilson',
			'H D P K Dharmasena',
			'R S Madugalle',
		],
	},
	selectedTab: 'live' as 'info' | 'live' | 'report',
	liveURL: new URL(
		'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
	),
	edition: 'UK',
} satisfies ComponentProps<typeof CricketScorecardPageNewComponent>;

const liveArgs = {
	...baseArgs,
	selectedTab: 'info',

	liveURL: new URL(
		'https://www.theguardian.com/sport/live/2026/jan/27/australia-v-england-second-test-day-two-live-cricket',
	),

	match: {
		...baseArgs.match,
		kind: 'Live',
		day: 2,
		innings: [
			{
				description: 'India first innings',
				battingTeam: 'India',
				declared: false,
				forfeited: false,
				inningsTotals: {
					runs: 254,
					overs: '49.0',
					extras: 8,
					wickets: 3,
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
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Shubman Gill',
						ballsFaced: 50,
						runs: 31,
						fours: 0,
						sixes: 1,
						howOut: 'c Phillips b Santner',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Virat Kohli',
						ballsFaced: 2,
						runs: 1,
						fours: 0,
						sixes: 0,
						howOut: 'lbw b Bracewell',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Shreyas Iyer',
						ballsFaced: 62,
						runs: 48,
						fours: 2,
						sixes: 2,
						howOut: 'c Ravindra b Santner',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Lokesh Rahul',
						ballsFaced: 45,
						runs: 39,
						fours: 3,
						sixes: 0,
						howOut: 'run out (Williamson)',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Hardik Pandya',
						ballsFaced: 18,
						runs: 22,
						fours: 2,
						sixes: 1,
						howOut: 'c Bracewell b Smith',
						out: true,
						nonStrike: true,
						onStrike: false,
					},
					{
						name: 'Ravindra Jadeja',
						ballsFaced: 24,
						runs: 30,
						fours: 1,
						sixes: 0,
						howOut: 'not out',
						out: false,
						onStrike: true,
						nonStrike: true,
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
				description: 'New Zealand first innings',
				battingTeam: 'New Zealand',
				declared: false,
				forfeited: false,
				inningsTotals: {
					runs: 254,
					overs: '49.0',
					extras: 8,
					wickets: 2,
				},
				extras: {
					byes: 0,
					legByes: 3,
					noBalls: 0,
					penalties: 0,
					wides: 13,
				},
				batters: [
					{
						name: 'Will Young',
						ballsFaced: 23,
						runs: 15,
						fours: 2,
						sixes: 0,
						howOut: 'lbw b Vinod',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Rachin Ravindra',
						ballsFaced: 29,
						runs: 37,
						fours: 4,
						sixes: 1,
						howOut: 'b Yadav',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Kane Williamson',
						ballsFaced: 14,
						runs: 11,
						fours: 1,
						sixes: 0,
						howOut: 'c & b Yadav',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Daryl Mitchell',
						ballsFaced: 101,
						runs: 63,
						fours: 3,
						sixes: 0,
						howOut: 'c Sharma b Ahmed',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Tom Latham',
						ballsFaced: 56,
						runs: 44,
						fours: 4,
						sixes: 0,
						howOut: 'c Kohli b Shami',
						out: true,
						onStrike: false,
						nonStrike: true,
					},
					{
						name: 'Glenn Phillips',
						ballsFaced: 34,
						runs: 55,
						fours: 3,
						sixes: 3,
						howOut: 'not out',
						out: false,
						onStrike: true,
						nonStrike: true,
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
	},
} satisfies ComponentProps<typeof CricketScorecardPageNewComponent>;

export const CricketScorecardPageNewFixture = meta.story({
	name: 'Live',
	args: baseArgs,
});

export const CricketScorecardPageNewLive = meta.story({
	name: 'Scorecard',
	args: liveArgs,
});

export const ClickScorecardTab = meta.story({
	name: 'Live -> Scorecard',
	args: { ...liveArgs, selectedTab: 'live' },
	play: async ({ canvas }) => {
		// Click the Scorecard tab button
		const scorecardTab = canvas.getByRole('tab', { name: 'Scorecard' });
		await userEvent.click(scorecardTab);

		// Check that the scorecard renders in the main content element
		await expect(
			await canvas.findByRole('heading', {
				name: 'Lineups',
			}),
		).toBeInTheDocument();
	},
});
export const UpdateScorecardTab = meta.story({
	name: 'Scorecard Update',
	args: liveArgs,
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		// Simulates external data update
		const simulateUpdate = () =>
			updateArgs({
				...args,
				match: {
					...args.match,
					innings: [
						args.match.innings[0],
						{
							...args.match.innings[1],
							batters: [
								...args.match.innings[1]!.batters,
								{
									name: 'Michael Bracewell',
									ballsFaced: 8,
									runs: 5,
									fours: 0,
									sixes: 0,
									howOut: 'not out',
									out: false,
									onStrike: false,
									nonStrike: true,
								},
							],
						},
					],
				},
			});

		return (
			<>
				<button data-testid="simulate-update" onClick={simulateUpdate}>
					Simulate update
				</button>
				<CricketScorecardPageNewComponent {...args} />
			</>
		);
	},
	play: async ({ canvas }) => {
		await canvas.findByRole('heading', {
			name: 'Lineups',
		});

		await expect(
			canvas.queryByRole('rowheader', { name: /Michael Bracewell/ }),
		).toBeNull();

		const simulateUpdateButton = canvas.getByTestId('simulate-update');
		await userEvent.click(simulateUpdateButton);

		await waitFor(() =>
			expect(
				canvas.getByRole('rowheader', { name: /Michael Bracewell/ }),
			).toBeInTheDocument(),
		);
	},
});
