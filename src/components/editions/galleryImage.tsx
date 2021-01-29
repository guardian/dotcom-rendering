import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { remSpace } from '@guardian/src-foundations';
import type { Format } from '@guardian/types';
import { none } from '@guardian/types';
import type { Image } from 'bodyElement';
import type { FC } from 'react';
import React from 'react';

const width = '100%';

type Props = {
	image: Image;
	format: Format;
};

const sizes: Sizes = {
	mediaQueries: [],
	default: width,
};

const styles = css`
	margin: ${remSpace[4]} 0;
	width: ${width};
`;

const GalleryImage: FC<Props> = ({ image, format }) => {
	return (
		<figure css={styles}>
			<Img
				image={image}
				sizes={sizes}
				className={none}
				format={format}
				supportsDarkMode={false}
				lightbox={none}
			/>
		</figure>
	);
};

export default GalleryImage;
