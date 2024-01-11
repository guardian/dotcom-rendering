import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import type { Option } from '../../../../vendor/@guardian/types/index';
import { some } from '../../../../vendor/@guardian/types/index';
import Img from 'components/ImgAlt';
import MainMediaCaption from 'components/MainMediaCaption';
import type { Image } from 'image';
import type { Sizes } from 'image/sizes';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';

// ----- Setup ----- //

const captionId = 'header-image-caption';

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
			lightbox={some({
				className: 'js-launch-slideshow',
				caption: image.nativeCaption,
				credit: image.credit,
			})}
		/>
		<MainMediaCaption
			caption={image.caption}
			credit={image.credit}
			format={format}
			id={captionId}
		/>
	</figure>
);

// ----- Exports ----- //

export default DefaultMainMediaImage;
export { defaultSizes, defaultStyles, imgStyles, defaultImgCss };
