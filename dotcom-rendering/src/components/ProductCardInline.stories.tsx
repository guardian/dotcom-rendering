import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { productImage } from '../../fixtures/manual/productImage';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCardInline } from './ProductCardInline';

const meta = preview.meta({
	component: ProductCardInline,
	title: 'Components/ProductCardInline',
	parameters: {
		chromatic: {
			modes: {
				'light mobile': allModes['light mobile'],
				'light desktop': allModes['light desktop'],
				'light wide': allModes['light wide'],
				'horizontal split': allModes['splitHorizontal'],
			},
		},
	},
	args: {
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
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
		brandName: 'AirCraft',
		productName: 'Lume',
		customAttributes: [
			{ name: 'What we love', value: 'It packs away pretty small' },
			{
				name: "What we don't love",
				value: 'There’s nowhere to stow the remote control',
			},
		],
		lowestPrice: '£89.99',
		isCardOnly: false,
	},
	decorators: [centreColumnDecorator],
});

export const Default = meta.story();

export const ProductCardNoCustomAttributes = meta.story({
	args: {
		...meta.input.args,
		customAttributes: [],
	},
});

export const ProductCardOnly = meta.story({
	args: {
		...meta.input.args,
		isCardOnly: true,
	},
});

export const ProductCardOnlyDisplayCredit = meta.story({
	args: {
		...meta.input.args,
		isCardOnly: true,
		image: { ...productImage, displayCredit: true },
	},
});
