import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import Img from '@guardian/common-rendering/src/components/img';
import type { Sizes } from '@guardian/common-rendering/src/sizes';
import type { ArticleFormat } from '@guardian/libs';
import { between, remSpace } from '@guardian/source-foundations';
import { some } from '@guardian/types';
import type { Image } from 'image';
import type { FC } from 'react';
import { Caption } from './MainMediaImage.defaults';

const captionId = 'header-image-caption';

const blogStyles = css`
	margin-bottom: ${remSpace[4]};
	position: relative;

	${between.tablet.and.desktop} {
		margin-top: ${remSpace[3]};
	}
`;

const sizes: Sizes = {
	mediaQueries: [{ breakpoint: 'tablet', size: '700px' }],
	default: '100vw',
};

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: ArticleFormat;
}

const BlogMainMediaImage: FC<Props> = ({ className, image, format }) => (
	<figure css={[blogStyles, className]} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={sizes}
			className={some(css())}
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

export default BlogMainMediaImage;
