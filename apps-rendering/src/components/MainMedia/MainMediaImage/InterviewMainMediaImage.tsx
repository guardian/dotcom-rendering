import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from } from '@guardian/source-foundations';
import type { Image } from 'image';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';
import DefaultMainMediaImage, {
	defaultImgCss,
	defaultSizes,
} from './MainMediaImage.defaults';

const interviewStyles = css`
	position: relative;
	margin: 0;
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

const InterviewMainMediaImage: FC<Props> = ({ image, format }) => (
	<DefaultMainMediaImage
		image={image}
		sizes={defaultSizes}
		format={format}
		css={css(interviewStyles)}
		imgCss={defaultImgCss(image)}
	/>
);

export default InterviewMainMediaImage;
