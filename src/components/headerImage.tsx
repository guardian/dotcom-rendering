// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types/Format';
import { Design, Display } from '@guardian/types/Format';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import Img from 'components/img';
import type { Image } from 'image';
import type { FC } from 'react';
import { wideContentWidth } from 'styles';

// ----- Subcomponents ----- //

interface CaptionProps {
	format: Format;
	image: Image;
}

const Caption: FC<CaptionProps> = ({ format, image }: CaptionProps) => {
	switch (format.display) {
		case Display.Immersive:
			return null;
		default:
			return (
				<HeaderImageCaption
					caption={image.nativeCaption}
					credit={image.credit}
				/>
			);
	}
};

// ----- Component ----- //

const styles = css`
	margin: 0 0 ${remSpace[2]} 0;
	position: relative;

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const liveStyles = css`
	${from.wide} {
		margin-left: 0;
		margin-right: 0;
	}
`;

const immersiveStyles = css`
	margin: 0;
	position: absolute;
	left: 0;
`;

const imgStyles = (width: number, height: number): SerializedStyles => css`
	display: block;
	width: 100%;
	height: calc(100vw * ${height / width});

	${from.wide} {
		width: ${wideContentWidth}px;
		height: ${(wideContentWidth * height) / width}px;
	}
`;

const immersiveImgStyles = css`
	display: block;
	height: 80vh;
	object-fit: cover;
	width: 100vw;
`;

const getStyles = ({ design, display }: Format): SerializedStyles => {
	switch (design) {
		case Design.Live:
			return css(styles, liveStyles);
		default:
			if (display === Display.Immersive) {
				return immersiveStyles;
			}

			return styles;
	}
};

const getImgStyles = (format: Format, image: Image): SerializedStyles => {
	switch (format.display) {
		case Display.Immersive:
			return immersiveImgStyles;
		default:
			return imgStyles(image.width, image.height);
	}
};

const getSizes = ({ display }: Format, image: Image): string => {
	switch (display) {
		case Display.Immersive:
			return `${(100 * image.width) / image.height}vh`;
		default:
			return `(min-width: ${breakpoints.wide}px) 620px, 100vw`;
	}
};

interface Props {
	image: Image;
	className?: SerializedStyles;
	format: Format;
}

const HeaderImage: FC<Props> = ({ className, image, format }: Props) => (
	<figure css={[getStyles(format), className]} aria-labelledby={captionId}>
		<Img
			image={image}
			sizes={getSizes(format, image)}
			className={getImgStyles(format, image)}
			format={format}
		/>
		<Caption format={format} image={image} />
	</figure>
);

// ----- Exports ----- //

export default HeaderImage;
