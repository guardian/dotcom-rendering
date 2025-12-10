import {
	enhanceProductCarousel,
	extractAtAGlanceUrls,
	findMatchingProducts,
	insertCarouselPlaceholder,
} from './enhance-product-carousel';

describe('test extractAtAGlanceUrls function', () => {
	it('extracts URLs from LinkBlockElements', () => {
		const elements = [
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://shop.tefal.co.uk/easy-fry-dual-xxl-ey942bg0-air-fryer-java-pepper-11l',
			},
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			},
			{
				_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
				url: 'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
			},
			{
				_type: 'model.dotcomrendering.pageElements.TextBlockElement',
				html: 'just text with no url',
			},
		];
		expect(extractAtAGlanceUrls(elements)).toEqual([
			'https://shop.tefal.co.uk/easy-fry-dual-xxl-ey942bg0-air-fryer-java-pepper-11l',
			'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
		]);
	});
});

describe('test findMatchingProducts function', () => {
	it('finds products with matching CTA URLs', () => {
		const products = [
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://casodesign.co.uk/product/caso-design-airfry-duo-chef/',
					},
				],
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://www.procook.co.uk/product/procook-12-in-1-air-fryer-grill-black',
					},
				],
			},
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
					},
				],
			},
		];
		expect(
			findMatchingProducts(products, [
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef/',
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
		).toHaveLength(2);
	});
});

describe('test insertCarouselPlaceholder function', () => {
	const atAGlanceHeading = {
		_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
		text: 'At a glance',
		elementId: 'at-a-glance',
		html: 'At a glance',
	};
	const linkElement = {
		_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
		url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
	};
	const productElement = {
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		productCtas: [
			{
				url: 'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			},
		],
	};
	const divider = {
		_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
	};

	it('inserts carousel after At a glance section', () => {
		const input = [atAGlanceHeading, linkElement, divider, productElement];
		const output = insertCarouselPlaceholder(input);
		expect(
			output.some(
				(el) =>
					el._type ===
					'model.dotcomrendering.pageElements.ProductCarouselElement',
			),
		).toBe(true);
	});

	it('does not insert carousel if no At a glance section', () => {
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

describe('test integration of enhanceProductCarousel', () => {
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
			},
			{ _type: 'model.dotcomrendering.pageElements.DividerBlockElement' },
			{
				_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
				productCtas: [
					{
						url: 'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
					},
				],
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
});
