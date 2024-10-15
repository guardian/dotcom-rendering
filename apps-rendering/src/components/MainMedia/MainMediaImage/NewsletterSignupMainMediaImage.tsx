import { css } from '@emotion/react';
import type { ArticleFormat } from '../../../articleFormat';
import { from, remSpace } from '@guardian/source/foundations';
import { none, some } from '../../../../vendor/@guardian/types/index';
import Img from 'components/ImgAlt';
import type { Image } from 'image';
import type { Sizes } from 'image/sizes';
import { wideContentWidth } from 'styles';

// ----- Component ----- //

const styles = css`
	margin-bottom: ${remSpace[2]};
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const sizes: Sizes = {
	mediaQueries: [],
	default: '100%',
};

interface Props {
	image: Image;
	format: ArticleFormat;
}

const NewsletterSignupMainMediaImage = ({ image, format }: Props) => (
	<figure role="presentation">
		<Img
			image={image}
			sizes={sizes}
			className={some(styles)}
			format={format}
			lightbox={none}
		/>
	</figure>
);

// ----- Exports ----- //

export default NewsletterSignupMainMediaImage;
