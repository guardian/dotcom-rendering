import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import ImageDetails from '@guardian/common-rendering/src/components/imageDetails';
import Img from 'components/ImgAlt';
import type { Sizes } from 'image/sizes';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDisplay } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import type { Option } from '@guardian/types';
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

export const Caption: FC<CaptionProps> = ({ format, image }: CaptionProps) => {
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

const defaultStyles = css`
	margin: 0 0 ${remSpace[1]} 0;
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const defaultSizes: Sizes = {
	mediaQueries: [{ breakpoint: 'wide', size: '620px' }],
	default: '100vw',
};

const defaultImgCss = (image: Image): Option<SerializedStyles> =>
	some(imgStyles(image.width, image.height));

const imgStyles = (width: number, height: number): SerializedStyles => css`
	display: block;
	width: 100%;
	height: calc(100vw * ${height / width});

	${from.wide} {
		width: ${wideContentWidth}px;
		height: ${(wideContentWidth * height) / width}px;
	}
`;

interface DefaultProps {
	image: Image;
	className?: string;
	css?: SerializedStyles;
	imgCss: Option<SerializedStyles>;
	sizes: Sizes;
	format: ArticleFormat;
}

const DefaultMainMediaImage: FC<DefaultProps> = ({
	className,
	image,
	imgCss,
	format,
	sizes,
}) => (
	<figure css={className} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={sizes}
			className={imgCss}
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

export default DefaultMainMediaImage;
export { defaultSizes, defaultStyles, imgStyles, defaultImgCss };
