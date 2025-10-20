import type { Meta } from '@storybook/react';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { ProductImage } from '../types/content';
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

const productImage: ProductImage = {
	url: 'https://media.guimcode.co.uk/cb193848ed75d40103eceaf12b448de2330770dc/0_0_725_725/725.jpg',
	caption: 'Filter-2 test image for live demo',
	height: 1,
	width: 1,
	alt: 'Bosch Sky kettle',
	credit: 'Photograph: Rachel Ogden/The Guardian',
	displayCredit: false,
};

const sampleProductCard: LeftColProductCardProps = {
	format,
	brandName: 'AirCraft',
	productName: 'Lume',
	image: productImage,
	productCtas: [
		{
			url: 'https://www.theguardian.com',
			label: '£89.99 at Amazon',
		},
		{
			url: 'https://www.theguardian.com',
			label: '£99.99 at John Lewis',
		},
	],
	customAttributes: [
		{ name: 'What we love', value: 'It packs away pretty small' },
		{
			name: "What we don't love",
			value: 'there’s nowhere to stow the remote control',
		},
	],
};

export const Default = () => <LeftColProductCard {...sampleProductCard} />;

export const WithButtonOverride = () => (
	<LeftColProductCard
		{...sampleProductCard}
		productCtas={[
			{
				url: 'https://www.theguardian.com',
				label: '£29.99 at Amazon',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£23.66 at John Lewis',
			},
		]}
	></LeftColProductCard>
);

export const WithNoCustomAttributes = () => (
	<LeftColProductCard {...sampleProductCard} customAttributes={[]} />
);
