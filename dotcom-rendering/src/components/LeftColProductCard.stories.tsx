import type { Meta, StoryObj } from '@storybook/react';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { ProductImage } from '../types/content';
import { LeftColProductCard } from './LeftColProductCard';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const productImage: ProductImage = {
	url: 'https://media.guimcode.co.uk/cb193848ed75d40103eceaf12b448de2330770dc/0_0_725_725/725.jpg',
	caption: 'Filter-2 test image for live demo',
	height: 1,
	width: 1,
	alt: 'Bosch Sky kettle',
	credit: 'Photograph: Rachel Ogden/The Guardian',
	displayCredit: false,
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
	args: {
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
		lowestPrice: '£89.99',
	},
} satisfies Meta<typeof LeftColProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNoCustomAttributes: Story = {
	args: {
		customAttributes: [],
	},
};

export const SingleCta: Story = {
	args: {
		productCtas: [
			{
				url: 'https://www.theguardian.com',
				label: '£89.99 at Amazon',
			},
		],
		lowestPrice: '£89.99',
	},
};

export const ShortCta: Story = {
	args: {
		productCtas: [
			{
				url: 'https://www.theguardian.com',
				label: '£8 at Z',
			},
		],
		lowestPrice: '£89.99',
	},
};

export const LotsOfCtas: Story = {
	args: {
		productCtas: [
			{
				url: 'https://www.theguardian.com',
				label: '£89.99 at Cotswolds Outdoors',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£89 at Zara',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£9 at Kenwood',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£70 at Amazon',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£12 for 10 at John Lewis',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£30 at eBay',
			},
			{
				url: 'https://www.theguardian.com',
				label: '£45 at Etsy',
			},
		],
		lowestPrice: '£89.99',
	},
};
