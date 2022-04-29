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

type BodyImageType = 'standard' | 'halfWidth' | 'thumbnail';

const getSizes = (type: BodyImageType): string => {
	switch (type) {
		case 'thumbnail':
			return '8.75rem';

		case 'halfWidth':
			return `(min-width: ${breakpoints.phablet}px) 310px, 50vw`;

		case 'standard':
		default:
			return `(min-width: ${breakpoints.phablet}px) 620px, 100vw`;
	}
};

const getFigureStyles = (
	type: BodyImageType,
	sizes: string,
): SerializedStyles => {
	const figureWidth = `calc(50% - ${remSpace[1]})`;

	switch (type) {
		case 'thumbnail':
			return css`
				display: block;
				float: left;
				clear: left;
				width: ${sizes};
				margin: 0 ${remSpace[3]} 0 0;

				${from.wide} {
					margin-left: calc(
						-${sizes} - ${remSpace[3]} - ${remSpace[3]}
					);
					margin-right: 0;
					padding: 0;
				}
			`;

		case 'halfWidth':
			return css`
				margin: ${remSpace[1]} 0 0 0;
				display: inline-block;
				width: ${figureWidth};

				+ &,
				+ & + & + & {
					margin-left: ${remSpace[3]};
				}

				+ & + & {
					margin-left: 0;
				}
			`;

		case 'standard':
		default:
			return css`
				margin: ${remSpace[4]} 0;
			`;
	}
};

const getImageStyles =
	(type: BodyImageType, sizes: string) =>
	(height: number, width: number): SerializedStyles => {
		const figureWidth = `calc(50% - ${remSpace[1]})`;

		switch (type) {
			case 'thumbnail':
				return css`
					height: calc(${sizes} * ${height / width});
				`;

			case 'halfWidth':
				return css`
					height: calc(${figureWidth} * ${height / width});
					width: 100%;
				`;

			case 'standard':
			default:
				return css`
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
		}
	};

// ----- Component ----- //

interface Props extends BodyImageProps {
	type: BodyImageType;
}

const BodyImage: FC<Props> = ({
	image,
	children,
	format,
	type = 'standard',
}) => {
	const sizes = getSizes(type);

	return (
		<figure css={getFigureStyles(type, sizes)}>
			<Img
				image={image}
				sizes={sizes}
				className={getImageStyles(type, sizes)(
					image.width,
					image.height,
				)}
				format={format}
			/>
			{children}
		</figure>
	);
};

// ----- Exports ----- //

export default BodyImage;
