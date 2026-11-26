import { centreColumnDecorator } from '../../../.storybook/decorators/gridDecorators';
import { allModes } from '../../../.storybook/modes';
import preview from '../../../.storybook/preview';
import {
	exampleLivePricingProduct,
	exampleProduct,
} from '../../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import { HorizontalSummaryProductCard } from './HorizontalSummaryProductCard';

const meta = preview.meta({
	title: 'Components/Affiliate Products/Horizontal Summary Product Card',
	component: HorizontalSummaryProductCard,
	args: {
		product: {
			productBlock: { ...exampleProduct, h2Id: 'example-1' },
			ctaIndex: 0,
		},
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
export const WithLivePrice = meta.story({
	args: {
		...meta.input.args,
		product: {
			productBlock: { ...exampleLivePricingProduct, h2Id: 'example-1' },
			ctaIndex: 0,
		},
	},
});
