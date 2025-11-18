import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import { getZIndex } from '../../../lib/getZIndex';
import type { CardMediaType } from '../../../types/layout';
import { VideoPlayerFormat } from '../../../types/content';

const mediaFixedSize = {
	tiny: 86,
	small: 122.5,
	medium: 125,
};

export type MediaPositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';
export type MediaSizeType =
	| 'small'
	| 'medium'
	| 'large'
	| 'xlarge'
	| 'jumbo'
	| 'carousel'
	| 'scrollable-small'
	| 'scrollable-medium'
	| 'podcast'
	| 'highlights-card'
	| 'feature'
	| 'feature-large'
	| 'feature-immersive';

type Props = {
	children: React.ReactNode;
	mediaSize: MediaSizeType;
	mediaType?: CardMediaType;
	videoStyle: VideoPlayerFormat | null;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	/**
	 * Forces hiding the image overlay added to pictures & slideshows on hover.
	 * This is to allow hiding the overlay on slideshow carousels where we don't
	 * want it to be shown whilst retaining it for existing slideshows.
	 */
	hideMediaOverlay?: boolean;
	isBetaContainer: boolean;
	isSmallCard: boolean;
	padMedia?: boolean;
};

const mediaOverlayContainerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: ${getZIndex('mediaOverlay')};
	cursor: pointer;
	pointer-events: none;
`;

/**
 * There is zero padding on the side of the media where the text is.
 */
const mediaPaddingStyles = (
	mediaPositionOnDesktop: MediaPositionType,
	mediaPositionOnMobile: MediaPositionType,
) => css`
	${until.tablet} {
		padding-left: ${mediaPositionOnMobile !== 'right' && `${space[2]}px`};
		padding-right: ${mediaPositionOnMobile !== 'left' && `${space[2]}px`};
		padding-top: ${mediaPositionOnMobile !== 'bottom' && `${space[2]}px`};
		padding-bottom: ${mediaPositionOnMobile !== 'top' && `${space[2]}px`};
	}
	${from.tablet} {
		padding-left: ${mediaPositionOnDesktop !== 'right' && `${space[2]}px`};
		padding-right: ${mediaPositionOnDesktop !== 'left' && `${space[2]}px`};
		padding-top: ${mediaPositionOnDesktop !== 'bottom' && `${space[2]}px`};
		padding-bottom: ${mediaPositionOnDesktop !== 'top' && `${space[2]}px`};
	}
`;

/**
 * This function works in partnership with its sibling in `ContentWrapper`.
 * If you change any values here be sure to update that file as well.
 */
const flexBasisStyles = ({
	mediaSize,
	mediaType,
	isSmallCard,
	isBetaContainer,
}: {
	mediaSize: MediaSizeType;
	mediaType: CardMediaType;
	isSmallCard: boolean;
	isBetaContainer: boolean;
}): SerializedStyles => {
	if (!isBetaContainer) {
		switch (mediaSize) {
			default:
			case 'small':
				return css`
					flex-basis: 25%;
					${between.tablet.and.desktop} {
						flex-basis: 40%;
					}
					${from.desktop} {
						flex-basis: 30%;
					}
				`;
			case 'medium':
				return css`
					flex-basis: 50%;
				`;
			case 'large':
				return css`
					flex-basis: 66%;
				`;
			case 'jumbo':
				return css`
					flex-basis: 75%;
				`;
		}
	}

	if (mediaType === 'podcast' && !isSmallCard) {
		return css`
			flex-basis: 120px;
			${from.desktop} {
				flex-basis: 168px;
			}
		`;
	}

	switch (mediaSize) {
		default:
		case 'small':
		case 'medium':
			return css`
				flex-basis: 50%;
			`;
		case 'large':
			return css`
				${from.tablet} {
					flex-basis: 460px;
				}
				${from.desktop} {
					flex-basis: 620px;
				}
			`;
		case 'xlarge':
			return css`
				${from.tablet} {
					flex-basis: 520px;
				}
				${from.desktop} {
					flex-basis: 700px;
				}
			`;
		case 'jumbo':
			return css`
				flex-basis: 100%;
			`;
	}
};

/**
 * Below tablet, we fix the size of the media and add a margin around it.
 * The corresponding content flex grows to fill the space.
 *
 * Fixed media sizes can optionally be applied at tablet and desktop.
 */
const fixMediaWidthStyles = (width: number) => css`
	width: ${width}px;
	flex-shrink: 0;
	flex-basis: unset;
	align-self: flex-start;
`;

const fixMobileMediaWidth = (
	isBetaContainer: boolean,
	isSmallCard: boolean,
) => {
	if (!isBetaContainer) {
		return css`
			${until.tablet} {
				${fixMediaWidthStyles(mediaFixedSize.medium)}
			}
		`;
	}

	const size = isSmallCard ? mediaFixedSize.tiny : mediaFixedSize.small;

	return css`
		${until.tablet} {
			${fixMediaWidthStyles(size)}
		}
	`;
};

const fixDesktopMediaWidth = () => {
	return css`
		${from.tablet} {
			${fixMediaWidthStyles(mediaFixedSize.small)}
		}
	`;
};

export const MediaWrapper = ({
	children,
	mediaSize,
	mediaType,
	videoStyle,
	mediaPositionOnDesktop,
	mediaPositionOnMobile,
	hideMediaOverlay,
	isBetaContainer,
	isSmallCard,
	padMedia,
}: Props) => {
	const isHorizontalOnMobile =
		mediaPositionOnMobile === 'left' || mediaPositionOnMobile === 'right';
	const isHorizontalOnDesktop =
		mediaPositionOnDesktop === 'left' || mediaPositionOnDesktop === 'right';

	return (
		<div
			css={[
				(mediaType === 'slideshow' ||
					mediaType === 'picture' ||
					mediaType === 'youtube-video' ||
					mediaType === 'loop-video' ||
					mediaType === 'podcast') &&
					isHorizontalOnDesktop &&
					flexBasisStyles({
						mediaSize,
						mediaType,
						isSmallCard,
						isBetaContainer,
					}),
				mediaType === 'avatar' &&
					css`
						display: flex;
						justify-content: flex-end;
					`,
				/* If no media position for mobile is provided then hide the media */
				mediaPositionOnMobile === 'none' &&
					css`
						${until.tablet} {
							display: none;
						}
					`,
				isHorizontalOnMobile &&
					mediaType !== 'podcast' &&
					fixMobileMediaWidth(isBetaContainer, isSmallCard),
				isSmallCard && fixDesktopMediaWidth(),
				isHorizontalOnDesktop &&
					css`
						${from.tablet} {
							align-self: flex-start;
						}
					`,
				css`
					/* position relative is required here to bound the image overlay */
					position: relative;
					img {
						width: 100%;
						display: block;
					}
				`,
				padMedia &&
					mediaPaddingStyles(
						mediaPositionOnDesktop,
						mediaPositionOnMobile,
					),
			]}
		>
			<>
				{children}
				{/* This overlay is styled when the CardLink is hovered */}
				{(mediaType === 'picture' ||
					mediaType === 'slideshow' ||
					videoStyle === 'Cinemagraph') &&
					!hideMediaOverlay && (
						<div
							css={[
								mediaOverlayContainerStyles,
								padMedia &&
									mediaPaddingStyles(
										mediaPositionOnDesktop,
										mediaPositionOnMobile,
									),
							]}
						>
							{/* This child div is needed as the hover background colour covers the padded
							    area around the image when the hover styles are applied to the top-level div */}
							<div className="media-overlay" />
						</div>
					)}
			</>
		</div>
	);
};
