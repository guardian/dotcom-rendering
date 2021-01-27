// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/core';
import { css } from '@emotion/core';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { from } from '@guardian/src-foundations/mq';
import { none, some } from '@guardian/types';
import StarRating from 'components/editions/starRating';
import HeaderImageCaption, { captionId } from 'components/headerImageCaption';
import { MainMediaKind } from 'headerMedia';
import type { Image } from 'image';
import type { Item } from 'item';
import { getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
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

const getImageStyle = ({ width, height }: Image): SerializedStyles => {
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
				<figure css={styles} aria-labelledby={captionId}>
					<Img
						image={image}
						sizes={sizes}
						format={item}
						className={some(getImageStyle(image))}
						supportsDarkMode
						lightbox={none}
					/>
					<HeaderImageCaption
						caption={nativeCaption}
						credit={credit}
						styles={captionStyles}
						iconColor={iconColor}
						iconBackgroundColor={iconBackgroundColor}
					/>
					<StarRating item={item} />
				</figure>
			);
		} else if (media.video.atomId !== undefined) {
			return (
				<div css={videoWrapperStyles}>
					<iframe
						title={media.video.title ?? ''}
						css={videoStyles}
						frameBorder="0"
						scrolling="no"
						allowFullScreen
						src={`https://embed.theguardian.com/embed/atom/media/${media.video.atomId}#noadsaf`}
					></iframe>
				</div>
			);
		}

		return null;
	});
};

// ----- Exports ----- //

export default HeaderMedia;
