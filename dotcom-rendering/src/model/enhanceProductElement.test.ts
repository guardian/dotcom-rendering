import type {
	FEElement,
	ProductBlockElement,
	ProductImage,
} from '../types/content';
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

describe('enhanceProductBlockElements', () => {
	it('enhances the content of a ProductBlockElement', () => {
		const elementsEnhancer = (elements: FEElement[]): FEElement[] => [
			...elements,
		];

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
					_type: 'model.dotcomrendering.pageElements.TextBlockElement',
					html: '<p>This is a text block</p>',
					elementId: 'text-block-1',
				},
				{
					_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
					elementId: 'rich-link-1',
					url: 'https://example.com',
					text: 'Example Rich Link',
					prefix: 'Related',
					role: 'inline',
				},
				{
					_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
					elementId: 'image-1',
					media: {
						allImages: [
							{
								index: 0,
								fields: {
									height: '600',
									width: '800',
								},
								mediaType: 'Image',
								url: 'https://example.com/image.jpg',
							},
						],
					},
					data: {
						alt: 'Example image',
						credit: 'Photographer Name',
						caption: 'An example caption',
						copyright: 'Example Copyright',
					},
					imageSources: [
						{
							weighting: 'inline',
							srcSet: [
								{
									src: 'https://example.com/image.jpg',
									width: 800,
								},
							],
						},
					],
					displayCredit: true,
					role: 'inline',
					title: 'Example Image',
					starRating: 4,
					isAvatar: false,
					position: 1,
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
			],
		};

		const inputElements: FEElement[] = [productBlockElement];

		const outputElements: FEElement[] = [
			{
				...productBlockElement,
				content: [
					{
						_type: 'model.dotcomrendering.pageElements.TextBlockElement',
						html: '<p>This is a text block</p>',
						elementId: 'text-block-1',
					},
					{
						_type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
						elementId: 'rich-link-1',
						url: 'https://example.com',
						text: 'Example Rich Link',
						prefix: 'Related',
						role: 'inline',
					},
					{
						_type: 'model.dotcomrendering.pageElements.ImageBlockElement',
						elementId: 'image-1',
						media: {
							allImages: [
								{
									index: 0,
									fields: {
										height: '600',
										width: '800',
									},
									mediaType: 'Image',
									url: 'https://example.com/image.jpg',
								},
							],
						},
						data: {
							alt: 'Example image',
							credit: 'Photographer Name',
							caption: 'An example caption',
							copyright: 'Example Copyright',
						},
						imageSources: [
							{
								weighting: 'inline',
								srcSet: [
									{
										src: 'https://example.com/image.jpg',
										width: 800,
									},
								],
							},
						],
						displayCredit: true,
						role: 'inline',
						title: 'Example Image',
						starRating: 4,
						isAvatar: false,
						position: 1,
					},
				],
			},
		];

		expect(enhanceProductElement(elementsEnhancer)(inputElements)).toEqual(
			outputElements,
		);
	});
});
