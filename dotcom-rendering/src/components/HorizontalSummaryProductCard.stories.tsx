import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { exampleProduct } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

const meta = preview.meta({
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
});

export const Default = meta.story();
