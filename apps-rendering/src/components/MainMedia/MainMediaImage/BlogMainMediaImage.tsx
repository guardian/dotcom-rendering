import { css } from '@emotion/react';
import type { ArticleFormat } from '../../../articleFormat';
import { between, remSpace } from '@guardian/source/foundations';
import { none } from '../../../../vendor/@guardian/types/index';
import type { Image } from 'image';
import type { Sizes } from 'image/sizes';
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

const BlogMainMediaImage = ({ image, format }: Props) => (
	<DefaultMainMediaImage
		image={image}
		sizes={sizes}
		format={format}
		css={styles}
		imgCss={none}
	/>
);

export default BlogMainMediaImage;
