// typescript
import type { ArticleFormat } from '../lib/articleFormat';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type {
	FEElement,
	ProductBlockElement,
	ProductImage,
} from '../types/content';
import { enhanceElements } from './enhanceBlocks';
import { enhanceProductElement } from './enhanceProductElement';

const productImage: ProductImage = {
	url: 'https://media.guimcode.co.uk/cb193848ed75d40103eceaf12b448de2330770dc/0_0_725_725/725.jpg',
	caption: 'Filter-2 test image for live demo',
	height: 1,
	width: 1,
	alt: 'Bosch Sky kettle',
	credit: 'Photograph: Rachel Ogden/The Guardian',
	displayCredit: false,
};

const productBlockElement: ProductBlockElement = {
	_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
	elementId: 'product-1',
	brandName: 'Bosch',
	starRating: '5',
	productName: 'Sky Kettle',
	image: productImage,
	secondaryHeading: 'Best Kettle Overall',
	primaryHeading: 'Bosch Sky Kettle',
	customAttributes: [
		{ name: 'What we love', value: 'It packs away pretty small' },
		{
			name: "What we don't love",
			value: 'There’s nowhere to stow the remote control',
		},
	],
	content: [
		{
			_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
			elementId: 'mockId',
			html: '<h2>Unique Heading.</h2>',
		},
	],
	displayType: 'InlineOnly',
	productCtas: [
		{
			url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
			text: 'Buy now',
			retailer: 'John Lewis',
			price: '£79.99',
		},
		{
			url: 'https://www.johnlewis.com/bosch-twk7203gb-sky-variable-temperature-kettle-1-7l-black/p3228625',
			text: 'Buy now',
			retailer: 'John Lewis',
			price: '£29.99',
		},
	],
};

const expectedEnhancedContent = [
	{
		_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
		elementId: 'mockId',
		html: "<h2 id='unique-heading'>Unique Heading.</h2>",
	},
];

const format: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

const elementsEnhancer = enhanceElements(
	format,
	'block-id',
	{
		renderingTarget: 'Web',
		promotedNewsletter: undefined,
		imagesForLightbox: [],
		hasAffiliateLinksDisclaimer: false,
		shouldHideAds: false,
	},
	true,
);

describe('enhanceProductBlockElements', () => {
	const inputElements: FEElement[] = [productBlockElement];
	const result = enhanceProductElement(elementsEnhancer)(inputElements);

	expect(result).toHaveLength(1);

	const enhancedElements = result[0];
	if (enhancedElements === undefined || enhancedElements._type !== 'model.dotcomrendering.pageElements.ProductBlockElement') {
		throw new Error('Expected "enhancedElements" to be a ProductBlockElement');
	}

	it('enhances the content of a ProductBlockElement', () => {
		expect(enhancedElements.content).toEqual(expectedEnhancedContent);
	});

	it('adds the lowestPrice to a ProductBlockElement', () => {
		expect(enhancedElements.lowestPrice).toEqual('£29.99');
	});
});
