import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCarouselCard } from './ProductCarouselCard';

const meta = {
	component: ProductCarouselCard,
	title: 'Components/ProductCarouselCard',
	args: {
		product: { ...exampleProduct, h2Id: 'h2-id' },
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
	render: (args) => (
		<div
			css={css`
				width: 280px;
			`}
		>
			<ProductCarouselCard {...args} />
		</div>
	),
} satisfies Meta<typeof ProductCarouselCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithLongHeadingProductNameAndCTA = {
	args: {
		product: {
			...exampleProduct,
			h2Id: 'h2-id',
			primaryHeadingHtml: 'Super long product category review name',
			productName:
				'Sky Kettle with a super duper long name that goes on and on',
			productCtas: [
				{
					url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
					text: '',
					retailer: 'John Lewis with a very long name',
					price: '£45.99',
				},
			],
		},
	},
} satisfies Story;
