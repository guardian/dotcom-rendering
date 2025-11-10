import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { productImage } from '../../fixtures/manual/productImage';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCardInline } from './ProductCardInline';

const meta = {
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
} satisfies Meta<typeof ProductCardInline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const ProductCardNoCustomAttributes = {
	args: {
		...meta.args,
		customAttributes: [],
	},
} satisfies Story;

export const ProductCardOnly = {
	args: {
		...meta.args,
		isCardOnly: true,
	},
} satisfies Story;

export const ProductCardOnlyDisplayCredit = {
	args: {
		...meta.args,
		isCardOnly: true,
		image: { ...productImage, displayCredit: true },
	},
} satisfies Story;
