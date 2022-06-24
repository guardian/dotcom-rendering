// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { darkModeCss } from '@guardian/common-rendering/src/lib';
import { ArticleDesign } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { neutral } from '@guardian/source-foundations';
import { withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import type { Image } from 'image/image';
import type { Lightbox } from 'image/lightbox';
import { getCaption, getClassName, getCredit } from 'image/lightbox';
import { sizesAttribute, styles as sizeStyles } from 'image/sizes';
import type { Sizes } from 'image/sizes';
import type { FC } from 'react';

// ----- Functions ----- //

const backgroundColour = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Gallery:
		case ArticleDesign.Audio:
		case ArticleDesign.Video:
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
	supportsDarkMode: boolean;
	lightbox: Option<Lightbox>;
};

const styles = (
	format: ArticleFormat,
	supportsDarkMode: boolean,
): SerializedStyles => css`
	background-color: ${backgroundColour(format)};
	color: ${neutral[60]};
	display: block;

	${darkModeCss(supportsDarkMode)`
        background-color: ${neutral[20]};
    `}
`;

const Img: FC<Props> = ({
	image,
	sizes,
	className,
	format,
	supportsDarkMode,
	lightbox,
}) => (
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
				styles(format, supportsDarkMode),
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
