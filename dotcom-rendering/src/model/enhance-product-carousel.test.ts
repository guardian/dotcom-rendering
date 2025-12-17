import {
	enhanceProductCarousel,
	extractAtAGlanceUrls,
	findMatchingProducts,
	insertCarouselPlaceholder,
} from './enhance-product-carousel';

describe('extractAtAGlanceUrls', () => {
	it('returns only URLs from LinkBlockElements', () => {
		const elements = [
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://shop.tefal.co.uk/easy-fry-dual-xxl-ey942bg0-air-fryer-java-pepper-11l',
				elementId: '1',
			},
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				elementId: '2',
			},
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
				elementId: '3',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: 'just text with no url',
				elementId: '4',
			},
		];
		expect(extractAtAGlanceUrls(elements)).toEqual([
			'https://shop.tefal.co.uk/easy-fry-dual-xxl-ey942bg0-air-fryer-java-pepper-11l',
			'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
		]);
	});
});

describe('findMatchingProducts', () => {
	it('finds products with matching CTA URLs', () => {
		const products = [
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://casodesign.co.uk/product/caso-design-airfry-duo-chef/',
					},
				],
				elementId: '1',
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://www.procook.co.uk/product/procook-12-in-1-air-fryer-grill-black',
					},
				],
				elementId: '2',
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
					},
				],
				elementId: '3',
			},
		];
		expect(
			findMatchingProducts(products, [
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef/',
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
		).toHaveLength(2);
	});

	it('returns an empty array if no product CTA URLs match', () => {
		const products = [
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [{ url: 'https://example.com/product-1' }],
				elementId: '1',
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [{ url: 'https://example.com/product-2' }],
				elementId: '2',
			},
		];
		const result = findMatchingProducts(products, [
			'https://notfound.com/product-x',
			'https://another.com/product-y',
		]);
		expect(result).toEqual([]);
	});
});

describe('insertCarouselPlaceholder', () => {
	const atAGlanceHeading = {
		_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
		text: 'At a glance',
		elementId: 'at-a-glance',
		html: 'At a glance',
	};
	const divider = {
		_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
		elementId: 'divider-1',
	};

	it('inserts a ProductCarouselElement after the At a glance section when >2 products match', () => {
		const linkElement1 = {
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://product-1.com',
			elementId: '1',
		};
		const linkElement2 = {
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://product-2.com',
			elementId: '2',
		};
		const productElement1 = {
			_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
			productCtas: [{ url: 'https://product-1.com' }],
			elementId: '3',
		};
		const productElement2 = {
			_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
			productCtas: [{ url: 'https://product-2.com' }],
			elementId: '4',
		};
		const input = [
			atAGlanceHeading,
			linkElement1,
			linkElement2,
			divider,
			productElement1,
			productElement2,
		];
		const output = insertCarouselPlaceholder(input);
		expect(
			output.some(
				(el) =>
					el._type ===
					'model.dotcomrendering.pageElements.ProductCarouselElement',
			),
		).toBe(true);
	});

	it('does nothing when no At a glance section is present', () => {
		const linkElement = {
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			elementId: '1',
		};
		const productElement = {
			_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
			productCtas: [
				{
					url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				},
			],
			elementId: '2',
		};
		const input = [linkElement, productElement];
		const output = insertCarouselPlaceholder(input);
		expect(
			output.some(
				(el) =>
					el._type ===
					'model.dotcomrendering.pageElements.ProductCarouselElement',
			),
		).toBe(false);
	});
});

describe('insertCarouselPlaceholder - edge cases', () => {
	const atAGlanceHeading = {
		_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
		text: 'At a glance',
		elementId: 'at-a-glance',
		html: 'At a glance',
	};
	const divider = {
		_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
		elementId: 'divider-1',
	};

	it('does not insert a carousel when fewer than two products match', () => {
		const link1 = {
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://product-1.com',
			elementId: '1',
		};
		const link2 = {
			_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
			url: 'https://product-1.com',
			elementId: '2',
		};
		const product1 = {
			_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
			productCtas: [{ url: 'https://product-1.com' }],
			elementId: '3',
		};
		const input = [atAGlanceHeading, link1, link2, divider, product1];
		const output = insertCarouselPlaceholder(input);
		expect(
			output.some(
				(el) =>
					el._type ===
					'model.dotcomrendering.pageElements.ProductCarouselElement',
			),
		).toBe(false);
	});

	it('does not insert carousel if At a glance section has no LinkBlockElements', () => {
		const textElement = {
			_type: 'model.dotcomrendering.pageElements.TextBlockElement',
			html: 'No links here',
			elementId: '4',
		};
		const product1 = {
			_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
			productCtas: [{ url: 'https://product-1.com' }],
			elementId: '5',
		};
		const input = [atAGlanceHeading, textElement, divider, product1];
		const output = insertCarouselPlaceholder(input);
		expect(
			output.some(
				(el) =>
					el._type ===
					'model.dotcomrendering.pageElements.ProductCarouselElement',
			),
		).toBe(false);
		expect(output).toEqual(input);
	});

	it('returns an empty array for empty or invalid input', () => {
		expect(insertCarouselPlaceholder(undefined as any)).toEqual([]);
		expect(insertCarouselPlaceholder(null as any)).toEqual([]);
		expect(insertCarouselPlaceholder([])).toEqual([]);
	});
});

describe('enhanceProductCarousel (integration)', () => {
	it('enhances elements with a product carousel', () => {
		const allowedPageId = 'thefilter/2025/mar/02/best-air-fryers';
		const input = [
			{
				_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
				text: 'At a glance',
				elementId: 'at-a-glance',
				html: 'At a glance',
			},
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
				elementId: '1',
			},
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				elementId: '2',
			},
			{
				_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
				elementId: '3',
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
					},
				],
				elementId: '4',
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
					},
				],
				elementId: '5',
			},
		];
		const output = enhanceProductCarousel(allowedPageId)(input);
		expect(
			output.some(
				(el) =>
					el._type ===
					'model.dotcomrendering.pageElements.ProductCarouselElement',
			),
		).toBe(true);
	});

	it('returns input unchanged for non-allowlisted pageId', () => {
		const input = [
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: 'foo',
				elementId: '1',
			},
		];
		const output = enhanceProductCarousel('not-allowed-page')(input);
		expect(output).toEqual(input);
	});
});
