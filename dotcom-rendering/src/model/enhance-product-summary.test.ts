import { enhanceProductSummary } from './enhance-product-summary';
import {
	findEnhancedProductSummary,
	productElement,
	productSummaryElement,
} from './enhance-product-summary.test-helpers';

describe('enhanceProductSummary', () => {
	it('enhances product summary elements with its selected product elements', () => {
		const selectedIds = ['1', '2'];
		const input = [
			productElement(
				[
					'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
				],
				'1',
			),
			productElement(
				[
					'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				],
				'2',
			),
			productElement(
				[
					'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
				],
				'3',
			),
			productSummaryElement(selectedIds),
		];

		const output = enhanceProductSummary(input);

		const enhancedProductSummaryElement =
			findEnhancedProductSummary(output);

		expect(enhancedProductSummaryElement?.products).toHaveLength(2);
	});
});
