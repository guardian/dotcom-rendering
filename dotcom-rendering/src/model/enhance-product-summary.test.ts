import { _testOnly, enhanceProductSummary } from './enhance-product-summary';
import {
	atAGlanceHeading,
	dividerElement,
	findCarousel,
	findStacked,
	linkElement,
	productElement,
	textElement,
} from './enhance-product-summary.test-helpers';

const { extractAtAGlanceUrls, findMatchingProducts, insertSummaryPlaceholder } =
	_testOnly;

describe('extractAtAGlanceUrls', () => {
	it('returns only URLs from LinkBlockElements', () => {
		const elements = [
			linkElement(
				'https://shop.tefal.co.uk/easy-fry-dual-xxl-ey942bg0-air-fryer-java-pepper-11l',
				'Buy now',
			),
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			linkElement(
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
				'Buy now',
			),
			textElement('just text with no url'),
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
			productElement([
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef/',
			]),
			productElement([
				'https://www.procook.co.uk/product/procook-12-in-1-air-fryer-grill-black',
			]),
			productElement([
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
		];

		const result = findMatchingProducts(products, [
			'https://casodesign.co.uk/product/caso-design-airfry-duo-chef/',
			'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
		]);

		expect(result).toHaveLength(3);
	});

	it('returns an empty array if no product CTA URLs match', () => {
		const products = [
			productElement([
				'https://ao.com/product/ec230bk-delonghi-stilosa-traditional-pump-espresso-coffee-machine-black-79705-66.aspx',
			]),
			productElement([
				'https://petertysonelectricals.co.uk/delonghi-ecam290-83-tb-magnifica-evo-fully-automatic-bean-to-cup-machine-titanium-black',
			]),
		];

		const result = findMatchingProducts(products, [
			'https://notfound.com/product-x',
			'https://another.com/product-y',
		]);

		expect(result).toEqual([]);
	});
});

describe('insertCarouselPlaceholder', () => {
	it('inserts a ProductCarouselElement after the At a glance section', () => {
		const input = [
			atAGlanceHeading(),
			linkElement(
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
				'Buy now',
			),
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			linkElement(
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
				'Buy now',
			),
			dividerElement(),
			productElement([
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
			]),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
			productElement([
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
		];

		const output = insertSummaryPlaceholder(input, 'carousel');

		const carousel = findCarousel(output);
		expect(carousel).toBeDefined();
	});

	it('does nothing when no At a glance section is present', () => {
		const input = [
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
		];

		const output = insertSummaryPlaceholder(input, 'carousel');

		const carousel = findCarousel(output);
		expect(carousel).toBeUndefined();
	});
});

describe('insertSummaryPlaceholder – edge cases', () => {
	it('does not insert a carousel when fewer than three products match', () => {
		const input = [
			atAGlanceHeading(),
			linkElement(
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
				'Buy now',
			),
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			linkElement(
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
				'Buy now',
			),
			dividerElement(),
			productElement([
				'https://casodesign.co.uk/product/caso-design-airfry-duo-chef',
			]),
		];

		const output = insertSummaryPlaceholder(input, 'carousel');
		const carousel = findCarousel(output);
		expect(carousel).toBeUndefined();
	});

	it('does not insert a summary if At a glance section has no LinkBlockElements', () => {
		const input = [
			atAGlanceHeading(),
			textElement('No links here'),
			dividerElement(),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
		];

		const output = insertSummaryPlaceholder(input, 'carousel');

		const carousel = findCarousel(output);
		expect(carousel).toBeUndefined();
	});

	it('returns an empty array for empty input', () => {
		expect(insertSummaryPlaceholder([], 'carousel')).toEqual([]);
	});
});

describe('enhanceProductSummary', () => {
	beforeAll(() => {
		_testOnly.allowedPageIds.push(
			'thefilter/test-article-example-for-product-summary',
		);
	});

	it('enhances elements with a product carousel for allowlisted pages', () => {
		const allowedPageId =
			'thefilter/test-article-example-for-product-summary';

		const input = [
			atAGlanceHeading(),
			linkElement(
				'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
				'Buy now',
			),
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			linkElement(
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
				'Buy now',
			),
			dividerElement(),
			productElement([
				'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
			]),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
			productElement([
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
		];

		const output = enhanceProductSummary({
			pageId: allowedPageId,
			serverSideABTests: { 'thefilter-at-a-glance-redesign': 'carousel' },
			renderingTarget: 'Web',
		})(input);

		const carousel = findCarousel(output);

		expect(carousel).toBeDefined();
	});

	it('enhances elements with a stacked product for allowlisted pages', () => {
		const allowedPageId =
			'thefilter/test-article-example-for-product-summary';

		const input = [
			atAGlanceHeading(),
			linkElement(
				'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
				'Buy now',
			),
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			linkElement(
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
				'Buy now',
			),
			dividerElement(),
			productElement([
				'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
			]),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
			productElement([
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
		];

		const output = enhanceProductSummary({
			pageId: allowedPageId,
			serverSideABTests: { 'thefilter-at-a-glance-redesign': 'stacked' },
			renderingTarget: 'Web',
		})(input);

		const stacked = findStacked(output);

		expect(stacked).toBeDefined();
	});

	it('does not return stacked cards when the rendering target is apps', () => {
		const allowedPageId =
			'thefilter/test-article-example-for-product-summary';

		const input = [
			atAGlanceHeading(),
			linkElement(
				'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
				'Buy now',
			),
			linkElement(
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
				'Buy now',
			),
			linkElement(
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
				'Buy now',
			),
			dividerElement(),
			productElement([
				'https://www.homebase.co.uk/en-uk/tower-airx-t17166-5l-grey-single-basket-air-fryer-digital-air-fryer/p/0757395',
			]),
			productElement([
				'https://www.lakeland.co.uk/27537/lakeland-slimline-air-fryer-black-8l',
			]),
			productElement([
				'https://ninjakitchen.co.uk/product/ninja-double-stack-xl-9-5l-air-fryer-sl400uk-zidSL400UK',
			]),
		];

		const output = enhanceProductSummary({
			pageId: allowedPageId,
			serverSideABTests: { 'thefilter-at-a-glance-redesign': 'stacked' },
			renderingTarget: 'Apps',
		})(input);

		const stacked = findStacked(output);

		expect(stacked).toBeUndefined();
	});
});
