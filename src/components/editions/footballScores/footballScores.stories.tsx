// ----- Imports ----- //

import { text, withKnobs } from '@storybook/addon-knobs';
import type { FC } from 'react';
import FootballScores from './index';

// ----- Helpers ----- //

// ----- Stories ----- //

const Default: FC = () => (
	<FootballScores
		league={text('League', 'Premier League')}
		stadium="Elland road"
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
					player: 'Aguero',
					timeInMinutes: 30,
				},
			],
		}}
	/>
);

// ----- Exports ----- //

export default {
	component: FootballScores,
	title: 'AR/Editions/FootballScores',
	decorators: [withKnobs],
};

export { Default };
