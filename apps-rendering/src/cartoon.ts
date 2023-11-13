import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import type { Image as ImageData } from 'image/image';
import { fromNullable } from '@guardian/types';
import { Optional } from 'optional';
import type { Context } from 'parserContext';
import type { CartoonImage } from '@guardian/content-api-models/v1/cartoonImage';
import { ArticleElementRole } from '@guardian/libs';
import { ImageSubtype } from 'image/image';
import { Dpr, src, srcsets } from './image/srcsets';

type VariantSize = 'small' | 'large';
const DEFAULT_VARIANT_SIZE: VariantSize = 'small';

interface Cartoon {
	images: ImageData[];
}

const parseCartoonImageSubtype = (
	cartoonImage: CartoonImage,
): Optional<ImageSubtype> => {
	switch (cartoonImage.mimeType) {
		case 'image/jpeg':
			return Optional.some(ImageSubtype.Jpeg);
		case 'image/png':
			return Optional.some(ImageSubtype.Png);
		case 'image/svg+xml':
			return Optional.some(ImageSubtype.Svg);
		default:
			return Optional.none();
	}
};

const parseCartoonImage =
	(salt: string, alt?: string) =>
	(cartoonImage: CartoonImage): ImageData => {
		return {
			src: src(salt, cartoonImage.file, 900, Dpr.One),
			...srcsets(cartoonImage.file, salt),
			alt: fromNullable(alt),
			width: cartoonImage.width ?? 0,
			height: cartoonImage.height ?? 0,
			imageSubtype: parseCartoonImageSubtype(cartoonImage),
			role: ArticleElementRole.Standard,
		};
	};

const parseCartoon =
	({ salt }: Context) =>
	(element: BlockElement): Optional<Cartoon> => {
		const data = element.cartoonTypeData;
		if (data?.variants) {
			const cartoonVariant =
				data.variants.find(
					(v) => v.viewportSize === DEFAULT_VARIANT_SIZE,
				) ?? data.variants.find((v) => v.viewportSize === 'large');
			if (cartoonVariant) {
				return Optional.some({
					images: cartoonVariant.images.map(
						parseCartoonImage(salt, data.alt),
					),
				});
			}
		}
		return Optional.none();
	};

export { Cartoon, parseCartoon };
