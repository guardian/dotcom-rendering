import type { CartoonBlockElement, CartoonVariant } from '../types/content';

const variants: CartoonVariant[] = [
	{
		viewportSize: 'small',
		images: [
			{
				index: 0,
				mimeType: 'image/jpeg',
				url: 'https://media.guim.co.uk/964dc2a933f5ec64b8298e763735fe3628deb3fc/3319_0_810_628/810.jpg',
				fields: {
					height: '833',
					width: '622',
				},
				mediaType: 'Image',
			},
			{
				index: 1,
				mimeType: 'image/jpeg',
				url: 'https://media.guim.co.uk/964dc2a933f5ec64b8298e763735fe3628deb3fc/2487_0_833_622/833.jpg',
				fields: {
					height: '810',
					width: '628',
				},
				mediaType: 'Image',
			},
		],
	},
	{
		viewportSize: 'large',
		images: [
			{
				index: 0,
				mimeType: 'image/jpeg',
				url: 'https://media.guim.co.uk/964dc2a933f5ec64b8298e763735fe3628deb3fc/0_0_4129_1254/4129.jpg',
				fields: {
					height: '1254',
					width: '4129',
				},
				mediaType: 'Image',
			},
		],
	},
];

export const cartoon: CartoonBlockElement = {
	_type: 'model.dotcomrendering.pageElements.CartoonBlockElement',
	role: 'inline',
	caption: 'The Mary Poppins Method – cleaning house.',
	credit: 'Comic by: Simone Lia / The Observer',
	displayCredit: true,
	alt: 'The Mary Poppins Method',
	variants,
};

export const cartoonWithoutCreditOrCaption: CartoonBlockElement = {
	_type: 'model.dotcomrendering.pageElements.CartoonBlockElement',
	role: 'inline',
	variants,
};
