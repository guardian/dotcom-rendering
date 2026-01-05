import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

const meta = {
	title: 'Components/Horizontal Summary Product Card',
	component: HorizontalSummaryProductCard,
	args: {
		product: { ...exampleProduct, h2Id: 'example-1' },
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		},
	},
	parameters: {
		chromatic: {
			modes: {
				'vertical mobile': allModes['vertical mobile'],
				'vertical wide': allModes['vertical wide'],
			},
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Meta<typeof HorizontalSummaryProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
