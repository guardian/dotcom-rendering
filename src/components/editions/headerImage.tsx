// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design, none, some } from '@guardian/types';
import StarRating from 'components/editions/starRating';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import { MainMediaKind } from 'headerMedia';
import type { Image } from 'image';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import Series from './series';
import { tabletImageWidth, wideImageWidth } from './styles';

// ----- Component ----- //

const styles = css`
	margin: 0;
	position: relative;

	${from.tablet} {
		width: ${tabletImageWidth}px;
		margin-left: auto;
		margin-right: auto;
	}

	${from.wide} {
		width: ${wideImageWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const fullWidthStyles = css`
	margin: 0;
	position: relative;
	width: 100%;
`;

const captionStyles = css`
	${from.tablet} {
		width: ${tabletImageWidth}px;
	}

	${from.wide} {
		width: ${wideImageWidth}px;
	}
`;

const fullWidthCaptionStyles = css`
	width: 100%;
`;

const getStyles = (format: Format): SerializedStyles => {
	switch (format.design) {
		case Design.Interview:
		case Design.Media:
			return fullWidthStyles;
		default:
			return styles;
	}
};

const getCaptionStyles = (format: Format): SerializedStyles => {
	return format.design === Design.Interview || format.design === Design.Media
		? fullWidthCaptionStyles
		: captionStyles;
};

const getImageStyle = (
	{ width, height }: Image,
	format: Format,
): SerializedStyles => {
	if (format.design === Design.Interview || format.design === Design.Media) {
		return css`
			display: block;
			width: 100%;
			height: calc(100vw * ${height / width});
		`;
	}
	return css`
		display: block;
		width: 100%;
		height: calc(100vw * ${height / width});

		${from.tablet} {
			width: ${tabletImageWidth}px;
			height: ${(tabletImageWidth * height) / width}px;
		}

		${from.wide} {
			width: ${wideImageWidth}px;
			height: ${(wideImageWidth * height) / width}px;
		}
	`;
};

interface Props {
	item: Item;
}

const sizes: Sizes = {
	mediaQueries: [
		{ breakpoint: 'tablet', size: '740px' },
		{ breakpoint: 'wide', size: '980px' },
	],
	default: '100vw',
};

const fullWidthSizes: Sizes = {
	mediaQueries: [],
	default: '100vw',
};

const getSizes = (format: Format): Sizes => {
	return format.design === Design.Interview || format.design === Design.Media
		? fullWidthSizes
		: sizes;
};

const HeaderImage: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const {
		cameraIcon: iconColor,
		cameraIconBackground: iconBackgroundColor,
	} = getThemeStyles(format.theme);

	return maybeRender(item.mainMedia, (media) => {
		if (media.kind === MainMediaKind.Image) {
			const {
				image,
				image: { nativeCaption, credit },
			} = media;
			return (
				<figure css={getStyles(format)} aria-labelledby={captionId}>
					<Img
						image={image}
						sizes={getSizes(format)}
						format={item}
						className={some(getImageStyle(image, format))}
						supportsDarkMode
						lightbox={some({
							className: 'js-launch-slideshow js-main-image',
							caption: none,
							credit: none,
						})}
					/>
					{item.design === Design.Interview && <Series item={item} />}
					<HeaderImageCaption
						caption={nativeCaption}
						credit={credit}
						styles={getCaptionStyles(format)}
						iconColor={iconColor}
						iconBackgroundColor={iconBackgroundColor}
					/>
					<StarRating item={item} />
				</figure>
			);
		}

		return null;
	});
};

// ----- Exports ----- //

export default HeaderImage;
