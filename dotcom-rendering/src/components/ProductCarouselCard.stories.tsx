import { css } from '@emotion/react';
import preview from '../../.storybook/preview';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { extractHeadingText } from '../model/enhanceProductElement';
import { ProductCarouselCard } from './ProductCarouselCard';

const meta = preview.meta({
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
});

export const Default = meta.story();

export const WithLongHeadingProductNameAndCTA = meta.story({
	args: {
		product: {
			...exampleProduct,
			h2Id: 'h2-id',
			primaryHeadingHtml: 'Super long product category review name',
			primaryHeadingText: extractHeadingText(
				'<em>Super long product: category review name:</em>',
			),
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
});
