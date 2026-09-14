import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Standard as ExampleArticle } from '../../fixtures/generated/fe-articles/Standard';
import { images } from '../../fixtures/generated/images';
import type { Block } from '../types/blocks';
import type {
	FEElement,
	MultiImageBlockElement,
	ProductBlockElement,
	ProductCta,
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

const productCtas: ProductCta[] = [
	{
		url: 'https://example.com/buy-1',
		text: '',
		retailer: 'Amazon',
		price: '£19.99',
	},
	{
		url: 'https://example.com/buy-2',
		text: '',
		retailer: 'John Lewis',
		price: '£21.00',
	},
];

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

void describe('buildLightboxImages', () => {
	void it("includes a product's own image when it is large enough", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: largeProductImage,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.equal(result.length, 1);
		assert.deepEqual(
			{
				masterUrl: result[0]?.masterUrl,
				elementId: result[0]?.elementId,
				width: result[0]?.width,
				height: result[0]?.height,
				position: result[0]?.position,
			},
			{
				masterUrl: largeProductImage.url,
				elementId: product.elementId,
				width: largeProductImage.width,
				height: largeProductImage.height,
				position: 1,
			},
		);
	});

	void it("excludes a product's own image when it is too small", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: smallProductImage,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.deepEqual(result, []);
	});

	void it('excludes a product with no image', () => {
		const result = buildLightboxImages(
			format,
			[buildBlock([baseProduct])],
			[],
		);

		assert.deepEqual(result, []);
	});

	void it("includes images nested inside a product's content", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			content: [largeImage],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.equal(result.length, 1);
		assert.deepEqual(result[0]?.elementId, largeImage.elementId);
	});

	void it('assigns positions in document order across regular and product images', () => {
		const product: ProductBlockElement = {
			...baseProduct,
			elementId: 'product-2',
			image: largeProductImage,
			content: [largeImage],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.deepEqual(
			result.map((image) => image.elementId),
			[largeImage.elementId, product.elementId],
		);
		assert.deepEqual(
			result.map((image) => image.position),
			[1, 2],
		);
	});

	void it("includes a product's own CTAs on its card image", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: largeProductImage,
			productCtas,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.deepEqual(result[0]?.productCtas, productCtas);
	});

	void it('omits productCtas entirely when a product has none', () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: largeProductImage,
			productCtas: [],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.equal(result[0]?.productCtas, undefined);
	});

	void it("includes the owning product's CTAs on an image nested inside its content", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			content: [largeImage],
			productCtas,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.equal(result.length, 1);
		assert.deepEqual(result[0]?.productCtas, productCtas);
	});

	void it("uses the innermost product's CTAs for an image nested inside a product nested in another product's content", () => {
		const innerCtas: ProductCta[] = [
			{
				url: 'https://example.com/inner',
				text: '',
				retailer: 'Inner',
				price: '£5',
			},
		];
		const outerCtas: ProductCta[] = [
			{
				url: 'https://example.com/outer',
				text: '',
				retailer: 'Outer',
				price: '£50',
			},
		];
		const innerProduct: ProductBlockElement = {
			...baseProduct,
			elementId: 'inner-product',
			content: [largeImage],
			productCtas: innerCtas,
		};
		const outerProduct: ProductBlockElement = {
			...baseProduct,
			elementId: 'outer-product',
			content: [innerProduct],
			productCtas: outerCtas,
		};

		const result = buildLightboxImages(
			format,
			[buildBlock([outerProduct])],
			[],
		);

		assert.equal(result.length, 1);
		assert.deepEqual(result[0]?.productCtas, innerCtas);
	});

	void it("falls back to the product's own caption for a content image with no caption of its own", () => {
		const product: ProductBlockElement = {
			...baseProduct,
			image: largeProductImage,
			content: [largeImage],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		const contentEntry = result.find(
			(image) => image.elementId === largeImage.elementId,
		);
		assert.deepEqual(contentEntry?.caption, largeProductImage.caption);
	});

	void it("keeps a content image's own caption instead of falling back to the product's", () => {
		const imageWithOwnCaption = {
			...largeImage,
			data: {
				...largeImage.data,
				caption: "The image's own caption",
			},
		};
		const product: ProductBlockElement = {
			...baseProduct,
			image: largeProductImage,
			content: [imageWithOwnCaption],
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		const contentEntry = result.find(
			(image) => image.elementId === largeImage.elementId,
		);
		assert.deepEqual(contentEntry?.caption, "The image's own caption");
	});

	void it("uses the innermost product's caption for an image nested inside a product nested in another product's content", () => {
		const innerProductImage: ProductImage = {
			...largeProductImage,
			caption: 'Inner product caption',
		};
		const outerProductImage: ProductImage = {
			...largeProductImage,
			caption: 'Outer product caption',
		};
		const innerProduct: ProductBlockElement = {
			...baseProduct,
			elementId: 'inner-product',
			content: [largeImage],
			image: innerProductImage,
		};
		const outerProduct: ProductBlockElement = {
			...baseProduct,
			elementId: 'outer-product',
			content: [innerProduct],
			image: outerProductImage,
		};

		const result = buildLightboxImages(
			format,
			[buildBlock([outerProduct])],
			[],
		);

		const contentEntry = result.find(
			(image) => image.elementId === largeImage.elementId,
		);
		assert.deepEqual(contentEntry?.caption, innerProductImage.caption);
	});

	void it("keeps a product's content image and card image adjacent, rather than grouping all content images before all card images", () => {
		const secondImage = images[1];

		const productA: ProductBlockElement = {
			...baseProduct,
			elementId: 'product-a',
			image: largeProductImage,
			content: [largeImage],
			productCtas,
		};
		const productB: ProductBlockElement = {
			...baseProduct,
			elementId: 'product-b',
			image: {
				...largeProductImage,
				url: 'https://media.guim.co.uk/large-product-b/900.jpg',
			},
			content: [secondImage],
			productCtas,
		};

		const result = buildLightboxImages(
			format,
			[buildBlock([productA, productB])],
			[],
		);

		assert.deepEqual(
			result.map((image) => image.elementId),
			[
				largeImage.elementId,
				productA.elementId,
				secondImage.elementId,
				productB.elementId,
			],
		);
		assert.deepEqual(
			result.map((image) => image.position),
			[1, 2, 3, 4],
		);
	});

	void it("gives every sub-image of a MultiImageBlockElement the owning product's CTAs", () => {
		const multiImage: MultiImageBlockElement = {
			_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
			elementId: 'multi-1',
			images: [largeImage, { ...largeImage, elementId: 'image-2' }],
		};
		const product: ProductBlockElement = {
			...baseProduct,
			content: [multiImage],
			productCtas,
		};

		const result = buildLightboxImages(format, [buildBlock([product])], []);

		assert.equal(result.length, 2);
		assert.equal(
			result.every((image) => image.productCtas === productCtas),
			true,
		);
	});
});
