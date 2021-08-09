// ----- Imports ----- //

import { select, text, withKnobs } from '@storybook/addon-knobs';
import FootballScores, { MatchStatusKind } from 'components/footballScores';
import type { FC } from 'react';

// ----- Helpers ----- //

const matchStatusOptions = {
	KickOff: MatchStatusKind.KickOff,
	FirstHalf: MatchStatusKind.FirstHalf,
	HalfTime: MatchStatusKind.HalfTime,
	SecondHalf: MatchStatusKind.SecondHalf,
	FullTime: MatchStatusKind.FullTime,
	ExtraTime: MatchStatusKind.ExtraTime,
	Penalties: MatchStatusKind.Penalties,
	Suspended: MatchStatusKind.Suspended,
};

const selectMatchStatus = (): MatchStatusKind =>
	select('Match Status', matchStatusOptions, MatchStatusKind.KickOff);

// ----- Stories ----- //

const Default: FC = () => (
	<FootballScores
		league={text('League', 'Premier League')}
		stadium={text('Stadium', 'Etihad Stadium')}
		homeTeam={{
			id: '1006',
			name: 'Arsenal',
			shortCode: 'ARS',
			crestUri:
				'https://i.guim.co.uk/img/sport/football/crests/1006.png?w=#{width}&h=#{height}&q=#{quality}&fit=bounds&sig-ignores-params=true&s=245ccb3526331f781858849f18e80283',
			score: 0,
			scorers: [],
		}}
		awayTeam={{
			id: '11',
			name: 'Man City',
			shortCode: 'MNC',
			crestUri:
				'https://i.guim.co.uk/img/sport/football/crests/11.png?w=#{width}&h=#{height}&q=#{quality}&fit=bounds&sig-ignores-params=true&s=69570ed9a99d983d2d793a0f9855f205',
			score: 2,
			scorers: [
				{
					player: 'Sterling',
					timeInMinutes: 2,
					additionalInfo: '.g',
				},
				{
					player: 'Beckham',
					timeInMinutes: 30,
				},
			],
		}}
		status={{ kind: selectMatchStatus(), time: '20:00' }}
	/>
);

// ----- Exports ----- //

export default {
	component: FootballScores,
	title: 'FootballScores',
	decorators: [withKnobs],
};

export { Default };
