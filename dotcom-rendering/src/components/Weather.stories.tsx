import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Weather as WeatherComponent } from './Weather';

const meta: Meta<typeof WeatherComponent> = {
	title: 'Components/Weather',
	component: WeatherComponent,
};

type Story = StoryObj<typeof WeatherComponent>;
export const Weather: Story = {
	args: {
		edition: 'UK',
		location: {
			id: '712993',
			city: 'Ickleford',
			country: 'United Kingdom',
		},
		now: {
			description: 'Sunny',
			icon: 1,
			link: 'http://www.accuweather.com/en/gb/ickleford/sg5-3/current-weather/712993?lang=en-us',
			dateTime: null,
			temperature: { metric: 27, imperial: 81 },
		},
		forecast: {
			'3h': {
				description: 'Mostly sunny',
				icon: 2,
				link: '',
				dateTime: '2024-07-31T20:00:00+01:00',
				temperature: { metric: 23, imperial: 74 },
			},
			'6h': {
				description: 'Partly cloudy',
				icon: 35,
				link: '',
				dateTime: '2024-07-31T23:00:00+01:00',
				temperature: { metric: 18, imperial: 65 },
			},
			'9h': {
				description: 'Cloudy',
				icon: 7,
				link: '',
				dateTime: '2024-08-01T02:00:00+01:00',
				temperature: { metric: 15, imperial: 59 },
			},
			'12h': {
				description: 'Intermittent clouds',
				icon: 36,
				link: '',
				dateTime: '2024-08-01T05:00:00+01:00',
				temperature: { metric: 16, imperial: 61 },
			},
		},
	},
	decorators: [splitTheme()],
};

export const WeatherUS: Story = {
	...Weather,
	args: {
		...Weather.args,
		edition: 'US',
	},
};

export default meta;
