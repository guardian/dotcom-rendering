import type { StoryFn } from '@storybook/react';
import type { WeatherWidgetProps } from './WeatherWidget';
import { WeatherWidget } from './WeatherWidget';

export default {
	component: WeatherWidget,
	title: 'Components/WeatherWidget',
	args: {
		edition: 'UK',
		location: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
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
				time: '2023-06-27T00:00:00.000Z',
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
				time: '2023-06-27T04:00:00.000Z',
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
				time: '2023-06-27T08:00:00.000Z',
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
				time: '2023-06-27T12:00:00.000Z',
			},
		],
	},
};

const Template: StoryFn<WeatherWidgetProps> = (args: WeatherWidgetProps) => (
	<WeatherWidget {...args} />
);

export const Mobile = Template.bind({});
Mobile.parameters = {
	viewport: {
		defaultViewport: 'mobile',
	},
};

export const MobileMedium = Template.bind({});
MobileMedium.parameters = {
	viewport: {
		defaultViewport: 'mobileMedium',
	},
};

export const MobileLandscape = Template.bind({});
MobileLandscape.parameters = {
	viewport: {
		defaultViewport: 'mobileLandscape',
	},
};

export const Phablet = Template.bind({});
Phablet.parameters = {
	viewport: {
		defaultViewport: 'phablet',
	},
};

export const Tablet = Template.bind({});
Tablet.parameters = {
	viewport: {
		defaultViewport: 'tablet',
	},
};

export const Desktop = Template.bind({});
Desktop.parameters = {
	viewport: {
		defaultViewport: 'desktop',
	},
};

export const LeftCol = Template.bind({});
LeftCol.parameters = {
	viewport: {
		defaultViewport: 'leftCol',
	},
};

export const Wide = Template.bind({});
Wide.parameters = {
	viewport: {
		defaultViewport: 'wide',
	},
};

// just checks US special case
export const US = Template.bind({});
US.args = {
	edition: 'US',
};
// make it easy to see on most screens
US.parameters = {
	viewport: {
		defaultViewport: 'mobileLandscape',
	},
};
