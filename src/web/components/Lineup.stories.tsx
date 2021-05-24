import { css } from '@emotion/react';

import { Lineup } from './Lineup';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 340px;
			padding: 20px;
			/* stylelint-disable-next-line color-no-hex */
			background: #d9edf6;
		`}
	>
		{children}
	</div>
);

const players: PlayerType[] = [
	{
		id: '457037',
		name: 'Jan Oblak',
		position: 'Goal Keeper',
		lastName: 'Oblak',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '13',
		events: [],
	},
	{
		id: '412131',
		name: 'Kieran Trippier',
		position: 'Defender',
		lastName: 'Trippier',
		substitute: false,
		timeOnPitch: '94:00',
		shirtNumber: '23',
		events: [],
	},
	{
		id: '436964',
		name: 'Stefan Savic',
		position: 'Defender',
		lastName: 'Savic',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '15',
		events: [],
	},
	{
		id: '489873',
		name: 'Augusto Felipe',
		position: 'Defender',
		lastName: 'Felipe',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '18',
		events: [],
	},
	{
		id: '575295',
		name: 'dos Santos Renan Lodi',
		position: 'Defender',
		lastName: 'Renan Lodi',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '12',
		events: [
			{
				eventTime: '110',
				eventType: 'booking',
			},
			{
				eventTime: '120',
				eventType: 'dismissal',
			},
		],
	},
	{
		id: '507071',
		name: 'Angel Correa',
		position: 'Midfielder',
		lastName: 'Correa',
		substitute: false,
		timeOnPitch: '109:00',
		shirtNumber: '10',
		events: [],
	},
	{
		id: '403345',
		name: 'Jorge Koke',
		position: 'Midfielder',
		lastName: 'Koke',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '6',
		events: [],
	},
	{
		id: '507070',
		name: 'Partey Thomas',
		position: 'Midfielder',
		lastName: 'Thomas',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '5',
		events: [
			{
				eventTime: '120',
				eventType: 'substitution',
			},
		],
	},
	{
		id: '449616',
		name: 'Niguez Saul',
		position: 'Midfielder',
		lastName: 'Saul',
		substitute: false,
		timeOnPitch: '125:47',
		shirtNumber: '8',
		events: [
			{
				eventTime: '120',
				eventType: 'booking',
			},
		],
	},
];

export default {
	component: Lineup,
	title: 'Components/Lineup',
};

export const Default = () => {
	return (
		<Container>
			<Lineup players={players} />
		</Container>
	);
};
Default.story = { name: 'default' };
