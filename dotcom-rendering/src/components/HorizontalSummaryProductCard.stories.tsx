import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

const meta = {
	title: 'Components/Horizontal Summary Product Card',
	component: HorizontalSummaryProductCard,
	parameters: {
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
	args: {
		product: { ...exampleProduct, h2Id: 'example-1' },
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Meta<typeof HorizontalSummaryProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
