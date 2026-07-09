import { Standard as ExampleArticle } from '../../fixtures/generated/fe-articles/Standard';
import { images } from '../../fixtures/generated/images';
import type { Block } from '../types/blocks';
import type {
	FEElement,
	ProductBlockElement,
	ProductImage,
} from '../types/content';
import { buildLightboxImages } from './buildLightboxImages';

const format = ExampleArticle.format;

// Well above the 620px lightbox threshold
const largeImage = images[0];

const largeProductImage: ProductImage = {
	url: 'https://media.guim.co.uk/large-product/900.jpg',
	caption: 'A large product image',
	credit: 'Photograph: Test/The Guardian',
	alt: 'A large product',
	displayCredit: false,
	height: 900,
	width: 900,
};

const smallProductImage: ProductImage = {
	url: 'https://media.guim.co.uk/small-product/300.jpg',
	caption: 'A small product image',
	credit: 'Photograph: Test/The Guardian',
	alt: 'A small product',
	displayCredit: false,
	height: 300,
	width: 300,
};

const baseProduct: ProductBlockElement = {
	_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
	elementId: 'product-1',
	brandName: 'Acme',
	starRating: '5',
	productName: 'Widget',
	primaryHeadingHtml: '',
	secondaryHeadingHtml: '',
	customAttributes: [],
	content: [],
	id: '123',
	displayType: 'InlineOnly',
	productCtas: [],
};

const emptyAttributes = { pinned: false, summary: false, keyEvent: false };

const buildBlock = (elements: FEElement[]): Block => ({
	id: 'block-1',
	elements,
	attributes: emptyAttributes,
	primaryDateLine: '',
	secondaryDateLine: '',
});

describe('buildLightboxImages', () => {
	it("includes a product's own image when it is large enough", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: largeProductImage,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			masterUrl: largeProductImage.url,
			elementId: product.elementId,
			width: largeProductImage.width,
			height: largeProductImage.height,
			position: 1,
		});
	});

	it("excludes a product's own image when it is too small", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: smallProductImage,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		expect(result).toEqual([]);
	});

	it('excludes a product with no image', () => {
		const result = buildLightboxImages(
			format,
			[buildBlock([baseProduct])],
			[],
		);

		expect(result).toEqual([]);
	});

	it("includes images nested inside a product's content", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			content: [largeImage],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		expect(result).toHaveLength(1);
		expect(result[0]?.elementId).toEqual(largeImage.elementId);
	});

	it('assigns positions in document order across regular and product images', () => {
		const product: ProductBlockElement = {
			...baseProduct,
			elementId: 'product-2',
			image: largeProductImage,
			content: [largeImage],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		expect(result.map((image) => image.elementId)).toEqual([
			largeImage.elementId,
			product.elementId,
		]);
		expect(result.map((image) => image.position)).toEqual([1, 2]);
	});
});
