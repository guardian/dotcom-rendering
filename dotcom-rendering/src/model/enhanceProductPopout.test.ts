import type { Block } from '../types/blocks';
import type {
	EnhancedProductSummaryElement,
	FEElement,
	ProductBlockElement,
} from '../types/content';
import { enhanceProductPopout } from './enhanceProductPopout';

const product = (
	id: string,
	overrides: Partial<ProductBlockElement> = {},
): ProductBlockElement =>
	({
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		id,
		elementId: `element-${id}`,
		h2Id: `heading-${id}`,
		productName: `Product ${id}`,
		primaryHeadingText: `Best ${id}`,
		secondaryHeadingText: `The ${id}`,
		productCtas: [
			{
				url: `https://a.example/${id}`,
				text: '',
				retailer: 'A',
				price: '£1',
			},
			{
				url: `https://b.example/${id}`,
				text: '',
				retailer: 'B',
				price: '£2',
			},
			{
				url: `https://c.example/${id}`,
				text: '',
				retailer: 'C',
				price: '£3',
			},
		],
		...overrides,
	}) as ProductBlockElement;

const summary = (
	products: ProductBlockElement[],
	ctaIndex = 0,
): EnhancedProductSummaryElement =>
	({
		_type: 'model.dotcomrendering.pageElements.EnhancedProductSummaryElement',
		products: products.map((productBlock) => ({ productBlock, ctaIndex })),
	}) as EnhancedProductSummaryElement;

const blocks = (elements: FEElement[]): Block[] =>
	[{ id: 'block-1', elements }] as Block[];

describe('enhanceProductPopout', () => {
	it('returns undefined when the article has no products', () => {
		expect(enhanceProductPopout(blocks([]))).toBeUndefined();
	});

	it('prefers the curated summary over the products in the body', () => {
		const one = product('1');
		const two = product('2');

		const result = enhanceProductPopout(blocks([one, two, summary([two])]));

		expect(result?.map((p) => p.elementId)).toEqual(['element-2']);
	});

	it('falls back to every body product when there is no summary', () => {
		const result = enhanceProductPopout(
			blocks([product('1'), product('2')]),
		);

		expect(result?.map((p) => p.elementId)).toEqual([
			'element-1',
			'element-2',
		]);
	});

	it('keeps the first mention of a product listed in two summaries', () => {
		const one = product('1');

		const result = enhanceProductPopout(
			blocks([summary([one]), summary([one])]),
		);

		expect(result).toHaveLength(1);
	});

	it('drops products with nothing to buy', () => {
		const result = enhanceProductPopout(
			blocks([product('1', { productCtas: [] }), product('2')]),
		);

		expect(result?.map((p) => p.elementId)).toEqual(['element-2']);
	});

	it("leads on the editor's chosen retailer and carries at most two CTAs", () => {
		const result = enhanceProductPopout(
			blocks([summary([product('1')], 2)]),
		);

		expect(result?.[0]?.productCtas.map((cta) => cta.retailer)).toEqual([
			'C',
			'A',
		]);
	});

	it('anchors to the product heading so the jump link lands on it', () => {
		const result = enhanceProductPopout(blocks([product('1')]));

		expect(result?.[0]?.anchorId).toBe('heading-1');
	});

	it('falls back to the element id when a product has no heading anchor', () => {
		const result = enhanceProductPopout(
			blocks([product('1', { h2Id: undefined })]),
		);

		expect(result?.[0]?.anchorId).toBe('element-1');
	});

	it('does not carry the product body into the popout props', () => {
		const result = enhanceProductPopout(blocks([product('1')]));

		expect(result?.[0]).not.toHaveProperty('content');
	});
});
