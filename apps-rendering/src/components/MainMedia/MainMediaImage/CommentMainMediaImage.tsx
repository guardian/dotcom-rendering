import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import Img from '@guardian/common-rendering/src/components/img';
import type { Sizes } from '@guardian/common-rendering/src/sizes';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import { some } from '@guardian/types';
import type { Image } from 'image';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';
import { Caption, imgStyles } from './MainMediaImage.defaults';

const captionId = 'header-image-caption';

const commentStyles = css`
	margin: 0 0 ${remSpace[5]} 0;
	position: relative;
	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const sizes: Sizes = {
	mediaQueries: [{ breakpoint: 'wide', size: '620px' }],
	default: '100vw',
};

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: ArticleFormat;
}

const CommentMainMediaImage: FC<Props> = ({ className, image, format }) => (
	<figure css={[commentStyles, className]} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={sizes}
			className={some(imgStyles(image.width, image.height))}
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

export default CommentMainMediaImage;
