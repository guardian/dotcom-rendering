import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { exampleAtAGlanceProductArray } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { StackedProducts } from './StackedProducts';

const meta = {
	title: 'Components/Stacked Horizontal Summary Product Cards',
	component: StackedProducts,
	args: {
		products: exampleAtAGlanceProductArray,
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Meta<typeof StackedProducts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const OnlyThreeProducts = {
	args: {
		products: exampleAtAGlanceProductArray.slice(0, 3),
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
} satisfies Story;
