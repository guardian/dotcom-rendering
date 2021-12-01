// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import Img from 'components/img';
import type { BodyImageProps } from 'image';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Setup ----- //

const sizes = `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;

// ----- Component ----- //

const styles = css`
	margin: ${remSpace[4]} 0;
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
	height: calc((100vw - ${remSpace[4]}) * ${height / width});
	display: block;
	width: 100%;

	${from.phablet} {
		height: calc(620px * ${height / width});
	}

	${darkModeCss`
        color: ${neutral[60]};
        background-color: ${neutral[20]};
    `}
`;

const BodyImage: FC<BodyImageProps> = ({
	image,
	children,
	format,
}: BodyImageProps) => (
	<figure css={styles}>
		<Img
			image={image}
			sizes={sizes}
			className={imgStyles(image.width, image.height)}
			format={format}
		/>
		{children}
	</figure>
);

// ----- Exports ----- //

export default BodyImage;
