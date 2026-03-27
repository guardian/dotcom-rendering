import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { productImage } from '../../fixtures/manual/productImage';
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCardLeftCol } from './ProductCardLeftCol';

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const meta = preview.meta({
	component: ProductCardLeftCol,
	title: 'Components/ProductCardLeftCol',
	parameters: {
		layout: 'padded',
		chromatic: {
			modes: {
				'horizontal split': allModes['splitHorizontal'],
			},
		},
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
});

export const Default = meta.story();

export const WithNoCustomAttributes = meta.story({
	args: {
		customAttributes: [],
	},
});

export const SingleCta = meta.story({
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
});

export const ShortCta = meta.story({
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
});

export const LotsOfCtas = meta.story({
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
				price: '£105.99',
				retailer: 'John Lewis',
				text: '',
			},
			{
				url: 'https://www.theguardian.com',
				price: '£105',
				retailer: 'Amazon',
				text: 'Override text',
			},
		],
		lowestPrice: '£89.99',
	},
});
