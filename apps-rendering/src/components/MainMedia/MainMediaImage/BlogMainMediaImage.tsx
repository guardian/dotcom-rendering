import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { between, remSpace } from '@guardian/source-foundations';
import { none } from '../../../../vendor/@guardian/types/index';
import type { Image } from 'image';
import type { Sizes } from 'image/sizes';
import type { FC } from 'react';
import DefaultMainMediaImage from './MainMediaImage.defaults';

const styles = css`
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
	format: ArticleFormat;
}

const BlogMainMediaImage: FC<Props> = ({ image, format }) => (
	<DefaultMainMediaImage
		image={image}
		sizes={sizes}
		format={format}
		css={styles}
		imgCss={none}
	/>
);

export default BlogMainMediaImage;
