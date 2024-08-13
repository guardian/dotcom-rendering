import { render } from '@testing-library/react';
import type { CricketInnings, CricketMatch } from '../types/sport';
import { CricketInningsScores, cricketScore } from './CricketScoreboard';

const defaultInnings: CricketInnings = {
	order: 0,
	battingTeam: 'Test Team',
	runsScored: '26',
	declared: false,
	forfeited: false,
	fallOfWicket: [{ order: 0 }, { order: 1 }, { order: 2 }],
	overs: '10.5',
};

const defaultMatch: CricketMatch = {
	matchId: 'test',
	competitionName: 'test match',
	venueName: 'venue',
	gameDate: '2021-06-30T14:00:00',
	teams: [
		{
			name: 'Test Team 1',
			home: true,
		},
		{
			name: 'Test Team 2',
			home: false,
		},
	],
	innings: [],
};

describe('CricketScoreboard', () => {
	describe('cricketScore', () => {
		it('Should create the score for a declared innings', () => {
			const innings: CricketInnings = {
				...defaultInnings,
				declared: true,
			};

			expect(cricketScore({ innings })).toEqual('26 - 3 declared');
		});
		it('Should create the score for a foreited innings', () => {
			const innings: CricketInnings = {
				...defaultInnings,
				forfeited: true,
			};

			expect(cricketScore({ innings })).toEqual('26 - 3 forfeited');
		});
		it('Should create the score for an all out innings', () => {
			const innings: CricketInnings = {
				...defaultInnings,
				fallOfWicket: [
					{ order: 0 },
					{ order: 1 },
					{ order: 2 },
					{ order: 3 },
					{ order: 4 },
					{ order: 5 },
					{ order: 6 },
					{ order: 7 },
					{ order: 8 },
					{ order: 9 },
				],
			};

			expect(cricketScore({ innings })).toEqual('26 all out');
			expect(cricketScore({ innings, short: true })).toEqual('26');
		});
		it('Should create the score for an ongoing innings', () => {
			const innings: CricketInnings = {
				order: 0,
				battingTeam: 'Test Team',
				runsScored: '26',
				declared: false,
				forfeited: false,
				fallOfWicket: [{ order: 0 }, { order: 1 }, { order: 2 }],
				overs: '10.5',
			};

			expect(cricketScore({ innings })).toEqual('26 - 3');
		});
	});
	describe('CricketInnings component', () => {
		it('Renders a match with 1 innings for a team', () => {
			const match: CricketMatch = {
				...defaultMatch,
				innings: [
					// Team 1 innings all out
					{
						...defaultInnings,
						battingTeam: 'Test Team 1',
						fallOfWicket: [
							{ order: 0 },
							{ order: 1 },
							{ order: 2 },
							{ order: 3 },
							{ order: 4 },
							{ order: 5 },
							{ order: 6 },
							{ order: 7 },
							{ order: 8 },
							{ order: 9 },
						],
					},
				],
			};
			const { getByText } = render(
				<CricketInningsScores match={match} home={true} />,
			);
			expect(getByText('26 all out (10.5 overs)')).toBeInTheDocument();
		});
		it('Renders a match with 2 innings for a team', () => {
			const match: CricketMatch = {
				...defaultMatch,
				innings: [
					// Team 1 innings all out
					{
						...defaultInnings,
						battingTeam: 'Test Team 1',
						fallOfWicket: [
							{ order: 0 },
							{ order: 1 },
							{ order: 2 },
							{ order: 3 },
							{ order: 4 },
							{ order: 5 },
							{ order: 6 },
							{ order: 7 },
							{ order: 8 },
							{ order: 9 },
						],
					},
					{
						...defaultInnings,
						battingTeam: 'Test Team 1',
						forfeited: true,
					},
				],
			};
			const { getByText } = render(
				<CricketInningsScores match={match} home={true} />,
			);
			expect(
				getByText('26 & 26 - 3 forfeited (10.5 overs)'),
			).toBeInTheDocument();
		});
	});
});
