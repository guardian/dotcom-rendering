import { breakpoints } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { InlineProductCardProps } from './InlineProductCard';
import { InlineProductCard } from './InlineProductCard';

const meta = {
	component: InlineProductCard,
	title: 'Components/InlineProductCard',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.desktop,
			],
		},

		formats: [
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
		],
	},
} satisfies Meta<typeof InlineProductCard>;

export default meta;

const sampleProductCard: InlineProductCardProps = {
	format: {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.Lifestyle,
	},
	image: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg',
	primaryUrl: 'https://www.aircraft.com/lume',
	primaryCTA: 'Buy at AirCraft',
	primaryPrice: '£199.99',
	primaryRetailer: 'AirCraft',
	secondaryCTA: '£199.99 at Amazon',
	secondaryUrl:
		'https://www.amazon.co.uk/AirCraft-Home-Backlight-Oscillating-Circulator/dp/B0D8QNGB3M',
	brandName: 'AirCraft',
	productName: 'Lume',
	statistics: [
		{ name: 'What we love', value: 'It packs away pretty small' },
		{
			name: 'What we don\t love',
			value: 'there’s nowhere to stow the remote control',
		},
	],
};

export const Default = () => <InlineProductCard {...sampleProductCard} />;
