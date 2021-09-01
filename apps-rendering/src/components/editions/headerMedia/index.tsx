// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Sizes } from '@guardian/image-rendering';
import { Img } from '@guardian/image-rendering';
import { brandAltBackground } from '@guardian/src-foundations';
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
import { isPicture as checkIfPicture, getFormat } from 'item';
import { maybeRender } from 'lib';
import type { FC } from 'react';
import { getThemeStyles } from 'themeStyles';
import FootballScores from '../footballScores';
import { wideImageWidth } from '../styles';
import Video from '../video';

// ----- Styles ----- //

const styles = css`
	margin: 0;
	position: relative;

	${from.desktop} {
		width: ${wideImageWidth}px;
	}
`;

const fullWidthStyles = css`
	margin: 0;
	position: relative;
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
`;

const captionStyles = css`
	${from.tablet} {
		width: calc(100vw - 3.75rem);
	}

	${from.desktop} {
		width: ${wideImageWidth}px;
	}
`;

const fullWidthCaptionStyles = css`
	width: 100%;
	height: 100%;
`;

const footballWrapperStyles = (isVideo: boolean): SerializedStyles => css`
	${from.tablet} {
		width: ${isVideo ? `750px` : `calc(100vw - 3.75rem)`};
		background-color: ${brandAltBackground.primary};
	}
	${from.desktop} {
		width: ${isVideo ? `750px` : `inherit`};
	}
`;

const getImageStyle = (
	{ width, height }: Image,
	format: Format,
	isPicture: boolean,
): SerializedStyles => {
	const aspectRatio = width / height;
	const fixedSmMobileHeight = 414;
	const fixedLgMobileHeight = 536;

	if (isPicture) {
		return css`
			display: block;
			width: 100%;

			${from.tablet} {
				height: calc(100vw / ${aspectRatio});
				width: 100vw;
			}
		`;
	}

	if (isFullWidthImage(format)) {
		return css`
			height: ${fixedSmMobileHeight}px;
			width: ${fixedSmMobileHeight * aspectRatio}px;

			width: ${from.mobile} {
				height: ${fixedLgMobileHeight};
				width: ${fixedLgMobileHeight * aspectRatio}px;
			}

			${from.tablet} {
				height: calc(100vw / ${aspectRatio});
				width: 100vw;
			}
		`;
	}
	return css`
		display: block;
		width: 100%;

		${from.tablet} {
			width: calc(100vw - 3.75rem);
			height: calc((100vw - 3.75rem) * ${height / width});
		}

		${from.desktop} {
			width: ${wideImageWidth}px;
			height: ${(wideImageWidth * height) / width}px;
		}
	`;
};

const isFullWidthImage = (format: Format): boolean =>
	format.display === Display.Immersive ||
	format.design === Design.Interview ||
	format.design === Design.Media;

const getStyles = (format: Format, isPicture: boolean): SerializedStyles => {
	return isFullWidthImage(format) && !isPicture ? fullWidthStyles : styles;
};

const getCaptionStyles = (format: Format): SerializedStyles => {
	return isFullWidthImage(format) ? fullWidthCaptionStyles : captionStyles;
};

const getImageSizes = (
	format: Format,
	image: Image,
	isPicture: boolean,
): Sizes => {
	if (isFullWidthImage(format) && !isPicture) {
		return {
			mediaQueries: [],
			default: `${(100 * image.width) / image.height}vh `,
		};
	}

	return {
		mediaQueries: [{ breakpoint: 'wide', size: '620px' }],
		default: '100vw',
	};
};

// ----- Component ----- //

interface Props {
	item: Item;
}

const HeaderMedia: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const isPicture = checkIfPicture(item.tags);
	const {
		cameraIcon: iconColor,
		cameraIconBackground: iconBackgroundColor,
	} = getThemeStyles(format.theme);
	const matchScores = 'football' in item ? item.football : none;

	return maybeRender(item.mainMedia, (media) => {
		if (media.kind === MainMediaKind.Image) {
			const {
				image,
				image: { caption, credit },
			} = media;

			return (
				<figure
					css={[getStyles(format, isPicture)]}
					aria-labelledby={captionId}
				>
					{maybeRender(matchScores, (scores) => {
						return (
							<div css={footballWrapperStyles(false)}>
								<FootballScores
									league={scores.league}
									homeTeam={scores.homeTeam}
									awayTeam={scores.awayTeam}
								/>
							</div>
						);
					})}
					<Img
						image={image}
						sizes={getImageSizes(format, image, isPicture)}
						format={item}
						className={some(
							getImageStyle(image, format, isPicture),
						)}
						supportsDarkMode={false}
						lightbox={some({
							className: 'js-launch-slideshow js-main-image',
							caption: none,
							credit: none,
						})}
					/>
					<HeaderImageCaption
						caption={caption}
						credit={credit}
						styles={getCaptionStyles(format)}
						iconColor={iconColor}
						iconBackgroundColor={iconBackgroundColor}
						isFullWidthImage={isFullWidthImage(format)}
					/>
					<StarRating item={item} />
				</figure>
			);
		} else {
			const {
				video: { title, atomId },
			} = media;

			return (
				<>
					{maybeRender(matchScores, (scores) => {
						return (
							<div css={footballWrapperStyles(true)}>
								<FootballScores
									league={scores.league}
									homeTeam={scores.homeTeam}
									awayTeam={scores.awayTeam}
								/>
							</div>
						);
					})}
					<Video atomId={atomId} title={title} />
				</>
			);
		}
	});
};

// ----- Exports ----- //

export default HeaderMedia;
