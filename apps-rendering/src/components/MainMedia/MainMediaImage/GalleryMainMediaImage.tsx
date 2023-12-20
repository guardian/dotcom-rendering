// ----- Imports ----- //

import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import { some } from '../../../../vendor/@guardian/types/index';
import Img from 'components/ImgAlt';
import { grid } from 'grid/grid';
import type { Image } from 'image';
import type { Sizes } from 'image/sizes';
import type { FC } from 'react';
import { immersiveCaptionId as captionId } from '../MainMedia.defaults';

// ----- Component ----- //

const imgStyles = css`
	width: 100%;
	object-fit: cover;

	${from.desktop} {
		width: 100%;
	}
`;

const styles = css`
	margin: 0;
	${grid.between('viewport-start', 'viewport-end')}
	grid-row: 1 / 6;
	height: 63vh;

	${from.desktop} {
		height: 100vh;
	}
`;

const getSizes = (image: Image): Sizes => ({
	mediaQueries: [
		{
			breakpoint: 'desktop',
			size: `${100 * (image.width / image.height)}vh`,
		},
	],
	default: `${63 * (image.width / image.height)}vh`,
});

interface Props {
	image: Image;
	format: ArticleFormat;
}

const GalleryMainMediaImage: FC<Props> = ({ image, format }) => (
	<figure css={styles} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={getSizes(image)}
			className={some(imgStyles)}
			format={format}
			lightbox={some({
				className: 'js-launch-slideshow',
				caption: image.nativeCaption,
				credit: image.credit,
			})}
		/>
	</figure>
);

// ----- Exports ----- //

export default GalleryMainMediaImage;
