import type { WeatherProps } from './Weather';
import { Weather } from './Weather';

export default {
	component: Weather,
	title: 'Components/Weather',
	args: {
		edition: 'UK',
		location: {
			key: '328819',
			localizedName:
				'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
			country: {
				id: 'GB',
				localizedName: 'United Kingdom',
			},
			administrativeArea: {
				id: 'GWN',
				localizedName: 'Gwynedd',
			},
			type: 'city',
		},
		now: {
			icon: 1,
			description: 'Sunny',
			temperature: {
				metric: 10,
				imperial: 50,
			},
			link: 'https://www.accuweather.com/en/gb/llanfair-pwllgwyngyll/ll61-5/current-weather/328819?lang=en-us',
		},
		forecast: [
			{
				icon: 19,
				description: 'Sleet',
				temperature: {
					metric: 20,
					imperial: 68,
				},
				dateTime: '2023-06-27T00:00:00.000Z',
			},
			{
				icon: 19,
				description: 'Sleet',
				temperature: {
					metric: 20,
					imperial: 68,
				},
				dateTime: '2023-06-27T01:00:00.000Z',
			},
			{
				icon: 19,
				description: 'Sleet',
				temperature: {
					metric: 20,
					imperial: 68,
				},
				dateTime: '2023-06-27T02:00:00.000Z',
			},
			{
				icon: 19,
				description: 'Sleet',
				temperature: {
					metric: 20,
					imperial: 68,
				},
				dateTime: '2023-06-27T03:00:00.000Z',
			},
			{
				icon: 25,
				description: 'Hail',
				temperature: {
					metric: 25,
					imperial: 77,
				},
				dateTime: '2023-06-27T04:00:00.000Z',
			},
			{
				icon: 25,
				description: 'Hail',
				temperature: {
					metric: 25,
					imperial: 77,
				},
				dateTime: '2023-06-27T05:00:00.000Z',
			},
			{
				icon: 25,
				description: 'Hail',
				temperature: {
					metric: 25,
					imperial: 77,
				},
				dateTime: '2023-06-27T06:00:00.000Z',
			},
			{
				icon: 25,
				description: 'Hail',
				temperature: {
					metric: 25,
					imperial: 77,
				},
				dateTime: '2023-06-27T07:00:00.000Z',
			},
			{
				icon: 32,
				description: 'Wind',
				temperature: {
					metric: 30,
					imperial: 89,
				},
				dateTime: '2023-06-27T08:00:00.000Z',
			},
			{
				icon: 32,
				description: 'Wind',
				temperature: {
					metric: 30,
					imperial: 89,
				},
				dateTime: '2023-06-27T09:00:00.000Z',
			},
			{
				icon: 32,
				description: 'Wind',
				temperature: {
					metric: 30,
					imperial: 89,
				},
				dateTime: '2023-06-27T10:00:00.000Z',
			},
			{
				icon: 32,
				description: 'Wind',
				temperature: {
					metric: 30,
					imperial: 89,
				},
				dateTime: '2023-06-27T11:00:00.000Z',
			},
			{
				icon: 44,
				description: 'Night snow',
				temperature: {
					metric: 40,
					imperial: 104,
				},
				dateTime: '2023-06-27T12:00:00.000Z',
			},
			{
				icon: 44,
				description: 'Night snow',
				temperature: {
					metric: 40,
					imperial: 104,
				},
				dateTime: '2023-06-27T13:00:00.000Z',
			},
			{
				icon: 44,
				description: 'Night snow',
				temperature: {
					metric: 40,
					imperial: 104,
				},
				dateTime: '2023-06-27T14:00:00.000Z',
			},
			{
				icon: 44,
				description: 'Night snow',
				temperature: {
					metric: 40,
					imperial: 104,
				},
				dateTime: '2023-06-27T15:00:00.000Z',
			},
		],
		link: 'https://www.accuweather.com/en/gb/llanfair-pwllgwyngyll/ll61-5/current-weather/328819?lang=en-us&partner=web_guardian_adc',
	},
};

export const Mobile = (args: WeatherProps) => (
	<div style={{ maxWidth: '320px', padding: '0 10px' }}>
		<Weather {...args} />
	</div>
);
Mobile.parameters = {
	viewport: {
		defaultViewport: 'mobile',
	},
};

export const MobileMedium = (args: WeatherProps) => (
	<div style={{ maxWidth: '375px', padding: '0 10px' }}>
		<Weather {...args} />
	</div>
);
MobileMedium.parameters = {
	viewport: {
		defaultViewport: 'mobileMedium',
	},
};

export const MobileLandscape = (args: WeatherProps) => (
	<div style={{ maxWidth: '480px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
MobileLandscape.parameters = {
	viewport: {
		defaultViewport: 'mobileLandscape',
	},
};

export const Phablet = (args: WeatherProps) => (
	<div style={{ maxWidth: '680px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
Phablet.parameters = {
	viewport: {
		defaultViewport: 'phablet',
	},
};

export const Tablet = (args: WeatherProps) => (
	<div style={{ maxWidth: '552px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
Tablet.parameters = {
	viewport: {
		defaultViewport: 'tablet',
	},
};

export const Desktop = (args: WeatherProps) => (
	<div style={{ maxWidth: '792px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
Desktop.parameters = {
	viewport: {
		defaultViewport: 'desktop',
	},
};

export const LeftCol = (args: WeatherProps) => (
	<div style={{ maxWidth: '180px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
LeftCol.parameters = {
	viewport: {
		defaultViewport: 'leftCol',
	},
};

export const Wide = (args: WeatherProps) => (
	<div style={{ maxWidth: '260px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
Wide.parameters = {
	viewport: {
		defaultViewport: 'wide',
	},
};

// just checks US special case
export const US = (args: WeatherProps) => (
	<div style={{ maxWidth: '340px', padding: '0 20px' }}>
		<Weather {...args} />
	</div>
);
US.args = {
	edition: 'US',
};
// make it easy to see on most screens
US.parameters = {
	viewport: {
		defaultViewport: 'mobileLandscape',
	},
};
