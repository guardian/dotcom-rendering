import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source/foundations';
import type { Image } from 'image';
import { wideContentWidth } from 'styles';
import DefaultMainMediaImage, {
	defaultImgCss,
	defaultSizes,
} from './MainMediaImage.defaults';

const styles = css`
	margin: 0 0 ${remSpace[5]} 0;
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

interface Props {
	image: Image;
	format: ArticleFormat;
}

const CommentMainMediaImage = ({ image, format }: Props) => (
	<DefaultMainMediaImage
		image={image}
		sizes={defaultSizes}
		format={format}
		css={styles}
		imgCss={defaultImgCss(image)}
	/>
);

export default CommentMainMediaImage;
