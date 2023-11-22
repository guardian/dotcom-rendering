import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { Cartoon, parseCartoon } from './cartoon';
import { Context } from './parserContext';
import { JSDOM } from 'jsdom';
import { CartoonElementFields } from '@guardian/content-api-models/v1/cartoonElementFields';
import { Optional } from './optional';

const context: Context = {
	docParser: JSDOM.fragment,
	salt: 'mockSalt',
};

const cartoonElement = (
	cartoonTypeData?: CartoonElementFields,
): BlockElement => {
	return {
		type: ElementType.CARTOON,
		assets: [],
		cartoonTypeData,
	};
};

const mobileVariant = {
	viewportSize: 'small',
	images: [
		{
			file: 'https://media.guim.co.uk/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/27_16_951_842/master/951.jpg',
			mimeType: 'image/jpeg',
		},
		{
			file: 'https://media.guim.co.uk/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/982_24_946_837/master/946.jpg',
			mimeType: 'image/jpeg',
		},
	],
};
const desktopVariant = {
	viewportSize: 'large',
	images: [
		{
			file: 'https://media.guim.co.uk/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/0_0_1974_3413/master/1974.jpg',
			mimeType: 'image/jpeg',
		},
	],
};

const defaultCartoon: Cartoon = { images: [] };

describe('parseCartoon', () => {
	test('ignore elements with no cartoon data', () => {
		const result = parseCartoon(context)(cartoonElement());

		expect(result).toEqual(Optional.none());
	});

	test('ignore elements cartoon data but no images', () => {
		const cartoonTypeData: CartoonElementFields = {
			variants: [
				{
					viewportSize: 'small',
					images: [],
				},
			],
		};
		const result = parseCartoon(context)(cartoonElement(cartoonTypeData));

		expect(result).toEqual(Optional.none());
	});

	test('defaults to mobile images when present', () => {
		const cartoonTypeData: CartoonElementFields = {
			variants: [mobileVariant, desktopVariant],
		};
		const result = parseCartoon(context)(
			cartoonElement(cartoonTypeData),
		).withDefault(defaultCartoon);
		const expected = [
			'https://i.guim.co.uk/img/media/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/27_16_951_842/master/951.jpg?width=900&quality=85&fit=bounds&s=4a5b8216e7210a8125ce32c0ec739e0a',
			'https://i.guim.co.uk/img/media/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/982_24_946_837/master/946.jpg?width=900&quality=85&fit=bounds&s=5d2dde76e6cde880c77dea9756484d79',
		];

		expect(result.images.map((img) => img.src)).toEqual(expected);
	});

	test('falls back to desktop images when there is no mobile variant', () => {
		const cartoonTypeData: CartoonElementFields = {
			variants: [desktopVariant],
		};
		const result = parseCartoon(context)(
			cartoonElement(cartoonTypeData),
		).withDefault(defaultCartoon);
		const expected = [
			'https://i.guim.co.uk/img/media/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/0_0_1974_3413/master/1974.jpg?width=900&quality=85&fit=bounds&s=9c22e3f2151b348b175e2ba929a80dfd',
		];

		expect(result.images.map((img) => img.src)).toEqual(expected);
	});

	test('falls back to desktop images when there are no mobile images', () => {
		const cartoonTypeData: CartoonElementFields = {
			variants: [{ viewportSize: 'small', images: [] }, desktopVariant],
		};
		const result = parseCartoon(context)(
			cartoonElement(cartoonTypeData),
		).withDefault(defaultCartoon);
		const expected = [
			'https://i.guim.co.uk/img/media/63425e0763eb1acf30ad10dc4cdbc5963f3e0944/0_0_1974_3413/master/1974.jpg?width=900&quality=85&fit=bounds&s=9c22e3f2151b348b175e2ba929a80dfd',
		];

		expect(result.images.map((img) => img.src)).toEqual(expected);
	});
});
