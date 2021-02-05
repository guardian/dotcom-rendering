// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design, Display, none, some } from '@guardian/types';
import HeaderImageCaption, {
	captionId,
} from 'components/editions/headerImageCaption';
import StarRating from 'components/editions/starRating';
import { MainMediaKind } from 'headerMedia';
import type { Image } from 'image';
import type { Item } from 'item';
import { getFormat, isPicture } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import {
	sidePadding,
	tabletArticleMargin,
	tabletImageWidth,
	wideArticleMargin,
	wideImageWidth,
} from './styles';

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

const videoWrapperStyles = css`
	width: 100%;
	position: relative;
	padding-bottom: 56.25%;
`;

const videoStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const fullWidthCaptionStyles = css`
	width: 100%;
	height: 100%;

	${from.tablet} {
		width: 100%;
	}
`;

const isFullWidthImage = (format: Format): boolean =>
	format.display === Display.Immersive ||
	format.design === Design.Interview ||
	format.design === Design.Media;

const getStyles = (format: Format): SerializedStyles => {
	return isFullWidthImage(format) ? fullWidthStyles : styles;
};

const pictureStyles: SerializedStyles = css`
	width: calc(100% - ${remSpace[4]});
	${sidePadding}
	${from.tablet} {
		padding-left: ${tabletArticleMargin}px;
		padding-right: ${tabletArticleMargin}px;
		width: calc(100% - ${tabletArticleMargin}px - ${tabletArticleMargin}px);
	}

	${from.wide} {
		padding-left: ${wideArticleMargin}px;
		padding-right: ${wideArticleMargin}px;
		width: calc(100% - ${wideArticleMargin}px - ${wideArticleMargin}px);
	}
`;

const getCaptionStyles = (format: Format): SerializedStyles => {
	return isFullWidthImage(format) ? fullWidthCaptionStyles : captionStyles;
};

const getImageSizes = (format: Format): Sizes => {
	return isFullWidthImage(format) ? fullWidthSizes : sizes;
};

const getImageStyle = (
	{ width, height }: Image,
	format: Format,
): SerializedStyles => {
	if (isFullWidthImage(format)) {
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

const HeaderMedia: FC<Props> = ({ item }) => {
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
				<figure
					css={[
						getStyles(format),
						isPicture(item.tags) ? pictureStyles : null,
					]}
					aria-labelledby={captionId}
				>
					<Img
						image={image}
						sizes={getImageSizes(format)}
						format={item}
						className={some(getImageStyle(image, format))}
						supportsDarkMode
						lightbox={some({
							className: 'js-launch-slideshow js-main-image',
							caption: none,
							credit: none,
						})}
					/>
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
		} else {
			const {
				video: { title, atomId },
			} = media;
			return (
				<div css={videoWrapperStyles}>
					<iframe
						title={title}
						css={videoStyles}
						frameBorder="0"
						scrolling="no"
						allowFullScreen
						src={`https://embed.theguardian.com/embed/atom/media/${atomId}#noadsaf`}
					></iframe>
				</div>
			);
		}
	});
};

// ----- Exports ----- //

export default HeaderMedia;
