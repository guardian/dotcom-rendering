import type { Meta } from '@storybook/react';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { LeftColProductCardProps } from './LeftColProductCard';
import { LeftColProductCard } from './LeftColProductCard';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};
const meta = {
	component: LeftColProductCard,
	title: 'Components/LeftColProductCard',
	parameters: {
		layout: 'padded',
		formats: [
			{
				design: ArticleDesign.Standard,
				display: ArticleDesign.Standard,
				theme: Pillar.Lifestyle,
			},
		],
	},
} satisfies Meta<typeof LeftColProductCard>;

export default meta;

const sampleProductCard: LeftColProductCardProps = {
	format,
	brandName: 'AirCraft',
	productName: 'Lume',
	image: 'https://media.guim.co.uk/ed32f52c10d742be18c4ff1b218dce611e71f57e/500_0_3000_3000/master/3000.jpg',
	primaryCta: 'Buy at AirCraft',
	primaryUrl: 'https://www.aircraft.com/lume',
	primaryPrice: '£199.99',
	customAttributes: [
		{ name: 'What we love', value: 'It packs away pretty small' },
		{
			name: "What we don't love",
			value: 'there’s nowhere to stow the remote control',
		},
	],
	altText: 'A small fan on a table',
	displayCredit: true,
	credit: 'AirCraft Photography by John Smith',
};

export const Default = () => <LeftColProductCard {...sampleProductCard} />;

export const WithNoCustomAttributes = () => (
	<LeftColProductCard {...sampleProductCard} customAttributes={[]} />
);
