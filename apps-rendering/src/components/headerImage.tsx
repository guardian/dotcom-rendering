// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import ImageDetails from '@guardian/common-rendering/src/components/imageDetails';
import Img from '@guardian/common-rendering/src/components/img';
import type { Sizes } from '@guardian/common-rendering/src/sizes';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { between, from, remSpace } from '@guardian/source-foundations';
import { some } from '@guardian/types';
import type { Image } from 'image';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';

// ----- Setup ----- //

const captionId = 'header-image-caption';

// ----- Subcomponents ----- //

interface CaptionProps {
	format: ArticleFormat;
	image: Image;
}

const Caption: FC<CaptionProps> = ({ format, image }: CaptionProps) => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return null;
		default:
			return (
				<ImageDetails
					caption={image.nativeCaption}
					credit={image.credit}
					supportsDarkMode
					id={captionId}
				/>
			);
	}
};

// ----- Component ----- //

const styles = css`
	margin: 0 0 ${remSpace[1]} 0;
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const liveStyles = css`
	margin-bottom: ${remSpace[4]};
	position: relative;

	${between.tablet.and.desktop} {
		margin-top: ${remSpace[3]};
	}
`;

const immersiveStyles = css`
	margin: 0;
	position: absolute;
	left: 0;
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
	display: block;
	width: 100%;
	height: calc(100vw * ${height / width});

	${from.wide} {
		width: ${wideContentWidth}px;
		height: ${(wideContentWidth * height) / width}px;
	}
`;

const immersiveImgStyles = css`
	display: block;
	height: 80vh;
	object-fit: cover;
	width: 100vw;
`;

const getStyles = ({ design, display }: ArticleFormat): SerializedStyles => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return liveStyles;
		default:
			if (display === ArticleDisplay.Immersive) {
				return immersiveStyles;
			}

			return styles;
	}
};

const getImgStyles = (
	format: ArticleFormat,
	image: Image,
): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css();
		default:
			switch (format.display) {
				case ArticleDisplay.Immersive:
					return immersiveImgStyles;
				default:
					return imgStyles(image.width, image.height);
			}
	}
};

const getSizes = ({ display, design }: ArticleFormat, image: Image): Sizes => {
	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog:
			return {
				mediaQueries: [{ breakpoint: 'tablet', size: '700px' }],
				default: '100vw',
			};
	}
	switch (display) {
		case ArticleDisplay.Immersive:
			return {
				mediaQueries: [],
				default: `${(100 * image.width) / image.height}vh `,
			};
		default:
			return {
				mediaQueries: [{ breakpoint: 'wide', size: '620px' }],
				default: '100vw',
			};
	}
};

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: ArticleFormat;
}

const HeaderImage: FC<Props> = ({ className, image, format }: Props) => (
	<figure css={[getStyles(format), className]} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={getSizes(format, image)}
			className={some(getImgStyles(format, image))}
			format={format}
			supportsDarkMode
			lightbox={some({
				className: 'js-launch-slideshow',
				caption: image.nativeCaption,
				credit: image.credit,
			})}
		/>
		<Caption format={format} image={image} />
	</figure>
);

// ----- Exports ----- //

export default HeaderImage;
