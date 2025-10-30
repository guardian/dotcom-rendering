import type { Meta, StoryObj } from '@storybook/react-webpack5';
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
				price: '£89.99',
				retailer: 'Amazon',
				text: '',
			},
			{
				url: 'https://www.theguardian.com',
				price: '£95.99',
				retailer: 'John Lewis',
				text: '',
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
				price: '£89.99',
				retailer: 'at Amazon',
				text: '',
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
				price: '£8',
				retailer: 'Z',
				text: '',
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
				price: '£89.99',
				retailer: 'Cotswold Outdoor',
				text: '',
			},
			{
				url: 'https://www.theguardian.com',
				price: '£95',
				retailer: 'REI',
				text: '',
			},
			{
				url: 'https://www.theguardian.com',
				price: '£99.99',
				retailer: 'John Lewis',
				text: '',
			},
			{
				url: 'https://www.theguardian.com',
				price: '£105',
				retailer: 'Amazon',
				text: '',
			},
		],
		lowestPrice: '£89.99',
	},
};
