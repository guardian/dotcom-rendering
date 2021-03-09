// ----- Imports ----- //

import { JSDOM } from 'jsdom';
import type { Image as CardImage } from '@guardian/apps-rendering-api-models/image';
import { parseCardImage, parseImage, Image } from 'image';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import { none, OptionKind, Role, some, withDefault } from '@guardian/types';
import { ImageElementFields } from '@guardian/content-api-models/v1/imageElementFields';
import { Context } from 'types/parserContext';
import { Asset } from '@guardian/content-api-models/v1/asset';
import { AssetFields } from '@guardian/content-api-models/v1/assetFields';

// ----- Mocks ----- //
let imageBlock: BlockElement;
let imageData: ImageElementFields;
let context: Context;
let asset: Asset;
let cardImage: CardImage;
let assetTypeData: AssetFields;
const assetWidth = 5;
const assetHeight = 5;
const imageDataCredit = 'Credit';
const defaultImage: Image = {
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
const roleTestCases = [
	{
		role: 'thumbnail',
		roleEnum: Role.Thumbnail,
	},
	{
		role: 'halfWidth',
		roleEnum: Role.HalfWidth,
	},
	{
		role: 'thumanyThingElsebnail',
		roleEnum: Role.Standard,
	},
];
const expectedSrcset =
	'https://i.guim.co.uk/img/theguardian/?width=140&quality=85&fit=bounds&s=ac6b008b5309f7949d1087af108c1d03 140w, https://i.guim.co.uk/img/theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b 500w, https://i.guim.co.uk/img/theguardian/?width=1000&quality=85&fit=bounds&s=9b5034dd81e916d352709a20f6635448 1000w, https://i.guim.co.uk/img/theguardian/?width=1500&quality=85&fit=bounds&s=2c439ea2daa935d4a2a268ef7a2a9146 1500w, https://i.guim.co.uk/img/theguardian/?width=2000&quality=85&fit=bounds&s=3877ef3c2ed016cccf1ab7b6e6001841 2000w';
const expectedDpr2Srcset =
	'https://i.guim.co.uk/img/theguardian/?width=140&quality=45&fit=bounds&s=7c3b49aa008fdd8970b8666fa745b172 140w, https://i.guim.co.uk/img/theguardian/?width=500&quality=45&fit=bounds&s=88ff17dc42cac7e76d0670385a7755ee 500w, https://i.guim.co.uk/img/theguardian/?width=1000&quality=45&fit=bounds&s=5a22db10fa466232189124d82bcb0ee5 1000w, https://i.guim.co.uk/img/theguardian/?width=1500&quality=45&fit=bounds&s=8214d581fb7adf78b3c6ff1aa780124d 1500w, https://i.guim.co.uk/img/theguardian/?width=2000&quality=45&fit=bounds&s=686301d1879e13b008002cf9b089aa74 2000w';

// ----- Tests ----- //

describe('parseImage', () => {
	beforeEach(() => {
		context = {
			docParser: JSDOM.fragment,
			salt: 'mockSalt',
		};
		imageData = {
			caption: 'Caption',
			credit: 'Credit',
			displayCredit: true,
			alt: 'someAlt',
		};

		assetTypeData = {
			isMaster: true,
			width: 5,
			height: 5,
		};

		asset = {
			type: AssetType.IMAGE,
			file: 'https://theguardian.com',
			typeData: assetTypeData,
		};

		imageBlock = {
			type: ElementType.IMAGE,
			assets: [asset],
			imageTypeData: imageData,
		};
	});
	test('returns none given no assets in element', () => {
		imageBlock.assets = [];
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns none given an asset with no typeData', () => {
		asset.typeData = undefined;
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns none given an asset typedata with falsey isMaster', () => {
		asset.typeData = {
			isMaster: false,
		};
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns none given an asset file is undefined', () => {
		asset.file = undefined;
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns none given an asset file is empty', () => {
		asset.file = '';
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns none given an asset typedata width is undefined', () => {
		asset.typeData = {
			isMaster: true,
			height: 5,
		};
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns none given an asset typedata height is undefined', () => {
		asset.typeData = {
			isMaster: true,
			width: 5,
		};
		expect(parseImage(context)(imageBlock)).toEqual(none);
	});
	test('returns image', () => {
		const expectedSrc =
			'https://i.guim.co.uk/img/theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b';
		let actual: Image = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);
		expect(actual.src).toMatch(
			/^https:\/\/i.guim.co.uk\/img\/theguardian\/\?width=500(.*)/,
		);
		expect(actual.src).toBe(expectedSrc);
		expect(actual.srcset).toBe(expectedSrcset);
		expect(actual.dpr2Srcset).toBe(expectedDpr2Srcset);
		expect(actual.alt).toEqual(some(imageData.alt));
		expect(actual.width).toEqual(assetWidth);
		expect(actual.height).toEqual(assetHeight);
		expect(actual.caption.kind).toEqual(OptionKind.Some);
		expect(actual.credit).toEqual(some(imageDataCredit));
		expect(actual.nativeCaption).toEqual(some(imageData.caption));
		expect(actual.role).toBe(Role.Standard);
	});
	test('uses secureFile rather than asset file for srcsets if it exists', () => {
		const expectedSecureDpr2Srcset =
			'https://i.guim.co.uk/img/secure-theguardian/?width=140&quality=45&fit=bounds&s=7c3b49aa008fdd8970b8666fa745b172 140w, https://i.guim.co.uk/img/secure-theguardian/?width=500&quality=45&fit=bounds&s=88ff17dc42cac7e76d0670385a7755ee 500w, https://i.guim.co.uk/img/secure-theguardian/?width=1000&quality=45&fit=bounds&s=5a22db10fa466232189124d82bcb0ee5 1000w, https://i.guim.co.uk/img/secure-theguardian/?width=1500&quality=45&fit=bounds&s=8214d581fb7adf78b3c6ff1aa780124d 1500w, https://i.guim.co.uk/img/secure-theguardian/?width=2000&quality=45&fit=bounds&s=686301d1879e13b008002cf9b089aa74 2000w';
		const expectedSecureSrcset =
			'https://i.guim.co.uk/img/secure-theguardian/?width=140&quality=85&fit=bounds&s=ac6b008b5309f7949d1087af108c1d03 140w, https://i.guim.co.uk/img/secure-theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b 500w, https://i.guim.co.uk/img/secure-theguardian/?width=1000&quality=85&fit=bounds&s=9b5034dd81e916d352709a20f6635448 1000w, https://i.guim.co.uk/img/secure-theguardian/?width=1500&quality=85&fit=bounds&s=2c439ea2daa935d4a2a268ef7a2a9146 1500w, https://i.guim.co.uk/img/secure-theguardian/?width=2000&quality=85&fit=bounds&s=3877ef3c2ed016cccf1ab7b6e6001841 2000w';

		assetTypeData.secureFile = 'https://secure-theguardian.com';
		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);
		expect(parsedImage.srcset).toEqual(expectedSecureSrcset);
		expect(parsedImage.dpr2Srcset).toEqual(expectedSecureDpr2Srcset);
	});
	test('returns image with no credit given displayCredit is false', () => {
		imageData.displayCredit = false;
		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);
		expect(parsedImage.credit).toEqual(none);
	});
	test('returns image with no caption given imageData caption is undefined', () => {
		imageData.caption = undefined;
		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);
		expect(parsedImage.caption).toEqual(none);
		expect(parsedImage.nativeCaption).toEqual(none);
	});
	test('returns image with no alt given imageData alt is undefined', () => {
		imageData.alt = undefined;
		const parsedImage = withDefault(defaultImage)(
			parseImage(context)(imageBlock),
		);
		expect(parsedImage.alt).toEqual(none);
	});
	roleTestCases.forEach((testCase) => {
		test('returns image with no alt given imageData alt is undefined', () => {
			imageData.role = testCase.role;
			const parsedImage = withDefault(defaultImage)(
				parseImage(context)(imageBlock),
			);
			expect(parsedImage.role).toEqual(testCase.roleEnum);
		});
	});
});

describe('parseCardImage', () => {
	beforeEach(() => {
		context = {
			docParser: JSDOM.fragment,
			salt: 'mockSalt',
		};
		cardImage = {
			url: 'https://theguardian.com',
			height: 20,
			width: 10,
			altText: 'someAltText',
		};
	});

	test('returns card image', () => {
		const expectedSrc =
			'https://i.guim.co.uk/img/theguardian/?width=500&quality=85&fit=bounds&s=4b9b01008452c65efcb547bd5f8ae12b';

		const parsed = withDefault(defaultImage)(
			parseCardImage(cardImage, context.salt),
		);

		expect(parsed.src).toMatch(
			/^https:\/\/i.guim.co.uk\/img\/theguardian\/\?width=500(.*)/,
		);
		expect(parsed.src).toEqual(expectedSrc);
		expect(parsed.srcset).toEqual(expectedSrcset);
		expect(parsed.dpr2Srcset).toEqual(expectedDpr2Srcset);
		expect(parsed.alt).toEqual(some(cardImage.altText));
		expect(parsed.width).toBe(cardImage.width);
		expect(parsed.height).toBe(cardImage.height);
		expect(parsed.caption).toBe(none);
		expect(parsed.credit).toBe(none);
		expect(parsed.nativeCaption).toBe(none);
		expect(parsed.role).toBe(Role.Standard);
	});

	test('returns none given image is undefined', () => {
		const parsed = parseCardImage(undefined, context.salt);
		expect(parsed).toEqual(none);
	});
});
