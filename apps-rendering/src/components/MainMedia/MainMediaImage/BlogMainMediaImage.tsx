import { css } from '@emotion/react';
import type { Sizes } from '@guardian/common-rendering/src/sizes';
import type { ArticleFormat } from '@guardian/libs';
import { between, remSpace } from '@guardian/source-foundations';
import { some } from '@guardian/types';
import type { Image } from 'image';
import type { FC } from 'react';
import DefaultMainMediaImage from './MainMediaImage.defaults';

const blogStyles = css`
	margin-bottom: ${remSpace[4]};
	position: relative;

	${between.tablet.and.desktop} {
		margin-top: ${remSpace[3]};
	}
`;

const blogSizes: Sizes = {
	mediaQueries: [{ breakpoint: 'tablet', size: '700px' }],
	default: '100vw',
};

interface Props {
	image: Image;
	format: ArticleFormat;
}

const BlogMainMediaImage: FC<Props> = ({ image, format }) => (
	<DefaultMainMediaImage
		image={image}
		sizes={blogSizes}
		format={format}
		css={css(blogStyles)}
		imgCss={some(css())}
	/>
);
// <img className={some(css())}

export default BlogMainMediaImage;
