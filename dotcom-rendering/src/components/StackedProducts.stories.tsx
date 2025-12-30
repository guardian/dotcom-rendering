import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { StackedProducts } from './StackedProducts';

const meta = {
	title: 'Components/Stacked Horizontal Summary Product Cards',
	component: StackedProducts,
	args: {
		products: [exampleProduct, exampleProduct, exampleProduct],
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
