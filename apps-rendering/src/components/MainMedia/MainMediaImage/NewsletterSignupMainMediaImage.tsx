import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import { none, some } from '@guardian/types';
import Img from 'components/ImgAlt';
import type { Image } from 'image';
import type { Sizes } from 'image/sizes';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';

// ----- Component ----- //

const styles = css`
	margin: ${remSpace[4]} 0;
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}

	border-radius: ${remSpace[2]};
	overflow: hidden;
`;

const sizes: Sizes = {
	mediaQueries: [{ breakpoint: 'wide', size: '620px' }],
	default: '100%',
};

interface Props {
	image: Image;
	format: ArticleFormat;
}

const NewsletterSignupMainMediaImage: FC<Props> = ({ image, format }) => (
	<figure role="presentation">
		<Img
			image={image}
			sizes={sizes}
			className={some(styles)}
			format={format}
			supportsDarkMode
			lightbox={none}
		/>
	</figure>
);

// ----- Exports ----- //

export default NewsletterSignupMainMediaImage;
