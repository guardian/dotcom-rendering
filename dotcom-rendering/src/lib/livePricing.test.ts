import {
	exampleLivePricingProduct,
	exampleProduct,
} from '../../fixtures/manual/productBlockElement';
import type {
	FEElement,
	LinkBlockElement,
	ProductBlockElement,
} from '../types/content';
import { hasLivePricing } from './livePricing';

const textElement: FEElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	html: '<p>Some text</p>',
	elementId: 'text-element',
};

const linkElement: LinkBlockElement = {
	_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
	elementId: 'link-element',
	url: 'https://go.skimresources.com/?id=123&url=https://example.com',
	label: '£10 at Shop',
	linkType: 'ProductButton',
};

const productWithoutLivePrices: ProductBlockElement = {
	...exampleProduct,
	productCtas: exampleProduct.productCtas.map(
		({ url, text, retailer, price }) => ({ url, text, retailer, price }),
	),
	content: [textElement],
};

describe('hasLivePricing', () => {
	it('returns false when there are no product elements', () => {
		expect(hasLivePricing([])).toBe(false);
		expect(hasLivePricing([textElement])).toBe(false);
	});

	it('returns false when no product CTAs have a latest price', () => {
		expect(hasLivePricing([productWithoutLivePrices])).toBe(false);
	});

	it('returns true when a product CTA has a latest price', () => {
		expect(hasLivePricing([textElement, exampleLivePricingProduct])).toBe(
			true,
		);
	});

	it('returns false for a link block element without a latest price', () => {
		expect(hasLivePricing([linkElement])).toBe(false);
	});

	it('returns true for a link block element with a latest price', () => {
		expect(
			hasLivePricing([
				{
					...linkElement,
					latestPrice: { currencySymbol: '£', price: '8.00' },
				},
			]),
		).toBe(true);
	});

	it('returns true for a link block element with a latest price nested in a product', () => {
		expect(
			hasLivePricing([
				{
					...productWithoutLivePrices,
					content: [
						textElement,
						{
							...linkElement,
							latestPrice: { currencySymbol: '£', price: '8.00' },
						},
					],
				},
			]),
		).toBe(true);
	});
});
