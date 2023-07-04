import type { WeatherWidgetProps } from './WeatherWidget';
import { WeatherWidget } from './WeatherWidget';

export default {
	component: WeatherWidget,
	title: 'Components/WeatherWidget',
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
				metric: {
					value: 10,
					unit: 'C',
				},
				imperial: {
					value: 50,
					unit: 'F',
				},
			},
			link: 'https://www.accuweather.com/en/gb/llanfair-pwllgwyngyll/ll61-5/current-weather/328819?lang=en-us&partner=web_guardian_adc',
		},
		forecast: [
			{
				icon: 19,
				description: 'Sleet',
				temperature: {
					metric: {
						value: 20,
						unit: 'C',
					},
					imperial: {
						value: 68,
						unit: 'F',
					},
				},
				dateTime: '2023-06-27T00:00:00.000Z',
			},
			{
				icon: 25,
				description: 'Hail',
				temperature: {
					metric: {
						value: 25,
						unit: 'C',
					},
					imperial: {
						value: 77,
						unit: 'F',
					},
				},
				dateTime: '2023-06-27T04:00:00.000Z',
			},
			{
				icon: 32,
				description: 'Wind',
				temperature: {
					metric: {
						value: 30,
						unit: 'C',
					},
					imperial: {
						value: 89,
						unit: 'F',
					},
				},
				dateTime: '2023-06-27T08:00:00.000Z',
			},
			{
				icon: 44,
				description: 'Night snow',
				temperature: {
					metric: {
						value: 40,
						unit: 'C',
					},
					imperial: {
						value: 104,
						unit: 'F',
					},
				},
				dateTime: '2023-06-27T12:00:00.000Z',
			},
		],
	},
};

export const Mobile = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '320px', padding: '0 10px' }}>
		<WeatherWidget {...args} />
	</div>
);
Mobile.parameters = {
	viewport: {
		defaultViewport: 'mobile',
	},
};

export const MobileMedium = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '375px', padding: '0 10px' }}>
		<WeatherWidget {...args} />
	</div>
);
MobileMedium.parameters = {
	viewport: {
		defaultViewport: 'mobileMedium',
	},
};

export const MobileLandscape = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '480px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
	</div>
);
MobileLandscape.parameters = {
	viewport: {
		defaultViewport: 'mobileLandscape',
	},
};

export const Phablet = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '680px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
	</div>
);
Phablet.parameters = {
	viewport: {
		defaultViewport: 'phablet',
	},
};

export const Tablet = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '552px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
	</div>
);
Tablet.parameters = {
	viewport: {
		defaultViewport: 'tablet',
	},
};

export const Desktop = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '792px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
	</div>
);
Desktop.parameters = {
	viewport: {
		defaultViewport: 'desktop',
	},
};

export const LeftCol = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '180px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
	</div>
);
LeftCol.parameters = {
	viewport: {
		defaultViewport: 'leftCol',
	},
};

export const Wide = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '260px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
	</div>
);
Wide.parameters = {
	viewport: {
		defaultViewport: 'wide',
	},
};

// just checks US special case
export const US = (args: WeatherWidgetProps) => (
	<div style={{ maxWidth: '340px', padding: '0 20px' }}>
		<WeatherWidget {...args} />
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
