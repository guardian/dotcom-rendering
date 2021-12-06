// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { breakpoints, remSpace } from '@guardian/source-foundations';
import Img from 'components/img';
import type { BodyImageProps as Props } from 'image';
import type { FC } from 'react';

// ----- Setup ----- //

const figureWidth = `calc(50% - ${remSpace[1]})`;
const size = `(min-width: ${breakpoints.phablet}px) 310px, 50vw`;

// ----- Component ----- //

const styles = css`
	margin: ${remSpace[1]} 0 0 0;
	display: inline-block;
	width: ${figureWidth};

	+ .halfWidth,
	+ .halfWidth + .halfWidth + .halfWidth {
		margin-left: ${remSpace[3]};
	}

	+ .halfWidth + .halfWidth {
		margin-left: 0;
	}
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
	height: calc(${figureWidth} * ${height / width});
	width: 100%;
`;

const BodyImageHalfWidth: FC<Props> = ({ image, format }: Props) => (
	<figure css={styles} className="halfWidth">
		<Img
			image={image}
			sizes={size}
			className={imgStyles(image.width, image.height)}
			format={format}
		/>
	</figure>
);

// ----- Exports ----- //

export default BodyImageHalfWidth;
