import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { exampleSummaryProducts } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductCtaList } from './ProductCtaList';

const meta = preview.meta({
	component: ProductCtaList,
	title: 'Components/Product Cta List',
	args: {
		products: exampleSummaryProducts,
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
