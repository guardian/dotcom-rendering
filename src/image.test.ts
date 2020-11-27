// ----- Imports ----- //

import { JSDOM } from 'jsdom';

import { Dpr, parseImage, Image, srcset } from 'image';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import { none, withDefault } from '@guardian/types/option';
import { pipe3 } from 'lib';
import { Role } from '@guardian/image-rendering';

// ----- Mocks ----- //

const imageData = {
	caption: 'Caption',
	credit: 'Credit',
	displayCredit: true,
};

const imageBlock: BlockElement = {
	type: ElementType.IMAGE,
	assets: [
		{
			type: AssetType.IMAGE,
			file: 'https://theguardian.com',
			typeData: {
				isMaster: true,
				width: 5,
				height: 5,
			},
		},
	],
	imageTypeData: imageData,
};

const image: Image = {
	src: '',
	srcset: '',
	dpr2Srcset: '',
	alt: none,
	width: 0,
	height: 0,
	caption: none,
	credit: none,
	nativeCaption: none,
	role: Role.Standard,
};

// ----- Tests ----- //

describe('image', () => {
	test('includes credit when displayCredit is true', () => {
		const parsed = parseImage({
			docParser: JSDOM.fragment,
			salt: 'mockSalt',
		})(imageBlock);

		expect(
			pipe3(
				parsed,
				withDefault(image),
				(image: Image) => image.credit,
				withDefault(''),
			),
		).toBe('Credit');
	});

	test('does not include credit when displayCredit is false', () => {
		const parsed = parseImage({
			docParser: JSDOM.fragment,
			salt: 'mockSalt',
		})({
			...imageBlock,
			imageTypeData: {
				...imageData,
				displayCredit: false,
			},
		});

		expect(
			pipe3(
				parsed,
				withDefault(image),
				(image: Image) => image.credit,
				withDefault(''),
			),
		).toBe('');
	});

	test('show lower quality when DPR is 2', () => {
		const src = srcset(
			'https://media.guim.co.uk/img/media/948ad0a2ebe6d931d8827ea89ac184986af76c1b/0_22_1313_788/master/1313.jpg',
			'',
			Dpr.Two,
		);
		expect(src).toContain('quality=45');
	});

	test('show higher quality when DPR is 1', () => {
		const src = srcset(
			'https://media.guim.co.uk/img/media/948ad0a2ebe6d931d8827ea89ac184986af76c1b/0_22_1313_788/master/1313.jpg',
			'',
			Dpr.One,
		);
		expect(src).toContain('quality=85');
	});
});
