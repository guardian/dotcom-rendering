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
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { tabletContentWidth, wideContentWidth } from './styles';

// ----- Component ----- //

const styles = css`
	margin: 0;
	position: relative;

	${from.tablet} {
		width: ${tabletContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}

	${from.wide} {
		width: ${wideContentWidth}px;
		margin-left: auto;
		margin-right: auto;
	}
`;

const captionStyles = css`
	${from.tablet} {
		width: ${tabletContentWidth}px;
	}

	${from.wide} {
		width: ${wideContentWidth}px;
	}
`;

const getImageStyle = ({ width, height }: Image): SerializedStyles => {
	return css`
		display: block;
		width: 100%;
		height: calc(100vw * ${height / width});

		${from.tablet} {
			width: ${tabletContentWidth}px;
			height: ${(tabletContentWidth * height) / width}px;
		}

		${from.wide} {
			width: ${wideContentWidth}px;
			height: ${(wideContentWidth * height) / width}px;
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

const HeaderImage: FC<Props> = ({ item }) =>
	maybeRender(item.mainMedia, (media) => {
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
					/>
					<StarRating item={item} />
				</figure>
			);
		}

		return null;
	});

// ----- Exports ----- //

export default HeaderImage;
