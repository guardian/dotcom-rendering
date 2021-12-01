// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, remSpace } from '@guardian/source-foundations';
import Img from 'components/img';
import type { BodyImageProps as Props } from 'image';
import type { FC } from 'react';

// ----- Setup ----- //

const size = '8.75rem';

// ----- Component ----- //

const styles = css`
	display: block;
	float: left;
	clear: left;
	width: ${size};
	margin: 0 ${remSpace[3]} 0 0;

	${from.wide} {
		margin-left: calc(-${size} - ${remSpace[3]} - ${remSpace[3]});
		margin-right: 0;
		padding: 0;
	}
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
	height: calc(${size} * ${height / width});
`;

const BodyImageThumbnail: FC<Props> = ({ image, children, format }: Props) => (
	<figure css={styles}>
		<Img
			image={image}
			sizes={size}
			className={imgStyles(image.width, image.height)}
			format={format}
		/>
		{children}
	</figure>
);

// ----- Exports ----- //

export default BodyImageThumbnail;
