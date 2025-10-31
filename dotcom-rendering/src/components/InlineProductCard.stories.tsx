import { breakpoints } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { ProductImage } from '../types/content';
import type { InlineProductCardProps } from './InlineProductCard';
import { InlineProductCard } from './InlineProductCard';

const meta = {
	component: InlineProductCard,
	title: 'Components/InlineProductCard',
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
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
	decorators: [centreColumnDecorator],
} satisfies Meta<typeof InlineProductCard>;

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

const sampleProductCard: InlineProductCardProps = {
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
};

export const Default = () => <InlineProductCard {...sampleProductCard} />;

export const ProductCardOnly = () => (
	<InlineProductCard {...sampleProductCard} isCardOnly={true} />
);

export const ProductCardOnlyDisplayCredit = () => (
	<InlineProductCard
		{...sampleProductCard}
		image={{
			...productImage,
			displayCredit: true,
		}}
		isCardOnly={true}
	/>
);
