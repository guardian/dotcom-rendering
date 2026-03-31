import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import preview from '../../.storybook/preview';
import { exampleAtAGlanceProductArray } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { StackedProducts } from './StackedProducts.island';

const meta = preview.meta({
	title: 'Components/Stacked Horizontal Summary Product Cards',
	component: StackedProducts,
	args: {
		products: exampleAtAGlanceProductArray,
		heading: 'At a glance',
		format: {
			design: ArticleDesign.Review,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
		showAllProducts: false,
	},
	decorators: [centreColumnDecorator],
});

export const Default = meta.story();

export const FourProducts = meta.story({
	args: {
		products: exampleAtAGlanceProductArray.slice(0, 4),
	},
} satisfies Story;

export const AllCardsExpanded = {
	args: {
		products: exampleAtAGlanceProductArray.slice(0, 7),
		showAllProducts: true,
	},
});
