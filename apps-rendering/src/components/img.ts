// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css, jsx as styledH } from '@emotion/react';
import { ArticleElementRole } from '@guardian/libs';
import { neutral } from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, withDefault } from '@guardian/types';
import type { Image } from 'image';
import { createElement as h } from 'react';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

interface Props {
	image: Image;
	sizes: string;
	className?: SerializedStyles;
	format: Format;
}

const styles = (role: ArticleElementRole, format: Format): SerializedStyles => {
	const backgroundColour = (format: Format): string => {
		switch (format.design) {
			case Design.Media:
				return neutral[20];
			case Design.Editorial:
			case Design.Letter:
			case Design.Comment:
				return neutral[86];
			default:
				return neutral[97];
		}
	};
	return role === ArticleElementRole.Thumbnail
		? css`
				color: ${neutral[60]};
		  `
		: css`
				background-color: ${backgroundColour(format)};
				${darkModeCss`background-color: ${neutral[20]};`}
				color: ${neutral[60]};
		  `;
};

const Img: FC<Props> = ({ image, sizes, className, format }) =>
	h('picture', null, [
		h('source', {
			key: `${image.src}-dpr2Srcset`,
			sizes,
			srcSet: image.dpr2Srcset,
			media: '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)',
		}),
		h('source', {
			key: `${image.src}-srcset`,
			sizes,
			srcSet: image.srcset,
		}),
		styledH('img', {
			key: `${image.src}-img`,
			src: image.src,
			alt: withDefault('')(image.alt),
			className: image.width > 620 ? 'js-launch-slideshow' : '',
			css: [styles(image.role, format), className],
			'data-ratio': image.height / image.width,
			'data-caption': withDefault('')(image.nativeCaption),
			'data-credit': withDefault('')(image.credit),
		}),
	]);

// ----- Exports ----- //

export default Img;
