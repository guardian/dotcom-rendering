import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCtaList } from './ProductCtaList';

const meta = preview.meta({
	component: ProductCtaList,
	title: 'Components/ProductCtaList',
	args: {
		products: [
			{
				productBlock: { ...exampleProduct, h2Id: 'h2-id' },
				ctaIndex: 0,
			},
		],
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
		title: 'At a glance',
	},
	decorators: [centreColumnDecorator],
});

export const Default = meta.story();
