// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import { withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import type { Image } from 'image/image';
import { ImageSubtype } from 'image/image';
import type { Lightbox } from 'image/lightbox';
import { getCaption, getClassName, getCredit } from 'image/lightbox';
import { sizesAttribute, styles as sizeStyles } from 'image/sizes';
import type { Sizes } from 'image/sizes';
import type { Optional } from 'optional';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Functions ----- //

const backgroundColour = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
		case ArticleDesign.Picture:
			return neutral[20];
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
			return neutral[86];
		default:
			return neutral[97];
	}
};

// ----- Component ----- //

type Props = {
	image: Image;
	sizes: Sizes;
	className: Option<SerializedStyles>;
	format: ArticleFormat;
	lightbox: Option<Lightbox>;
};

/**
 * We provide placeholder background colours for images, to show that they
 * haven't loaded yet. This is particularly important for offline usage.
 *
 * However, some kinds of images can contain transparency (PNGs, SVGs), so we
 * don't set a background for these.
 */
const placeholderBackground = (
	format: ArticleFormat,
	imageSubtype: Optional<ImageSubtype>,
): SerializedStyles => {
	if (
		imageSubtype.isSome() &&
		(imageSubtype.value === ImageSubtype.Png ||
			imageSubtype.value === ImageSubtype.Svg)
	) {
		return css();
	}

	return css`
		background-color: ${backgroundColour(format)};
		${darkModeCss`
			background-color: ${neutral[20]};
		`}
	`;
};

const styles = (
	format: ArticleFormat,
	imageSubtype: Optional<ImageSubtype>,
): SerializedStyles => css`
	${placeholderBackground(format, imageSubtype)}
	color: ${neutral[60]};
	display: block;
`;

const Img: FC<Props> = ({ image, sizes, className, format, lightbox }) => (
	<picture>
		<source
			sizes={sizesAttribute(sizes)}
			srcSet={image.dpr2Srcset}
			media="(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)"
		/>
		<source sizes={sizesAttribute(sizes)} srcSet={image.srcset} />
		<img
			src={image.src}
			alt={withDefault('')(image.alt)}
			className={getClassName(image.width, lightbox)}
			css={[
				sizeStyles(sizes, image.width, image.height),
				styles(format, image.imageSubtype),
				withDefault<SerializedStyles | undefined>(undefined)(className),
			]}
			data-ratio={image.height / image.width}
			data-caption={getCaption(lightbox)}
			data-credit={getCredit(lightbox)}
		/>
	</picture>
);

// ----- Exports ----- //

export default Img;
