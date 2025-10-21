import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import type { CardMediaType } from '../../../types/layout';

const mediaFixedSize = {
	tiny: 86,
	small: 122.5,
	medium: 125,
};

type MediaFixedSize = keyof typeof mediaFixedSize;

export type MediaFixedSizeOptions = {
	mobile?: MediaFixedSize;
	tablet?: MediaFixedSize;
	desktop?: MediaFixedSize;
};

export type MediaPositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';
export type MediaSizeType =
	| 'small'
	| 'medium'
	| 'large'
	| 'xlarge'
	| 'jumbo'
	| 'carousel'
	| 'podcast'
	| 'highlights-card'
	| 'feature'
	| 'feature-large'
	| 'feature-immersive';

type Props = {
	children: React.ReactNode;
	mediaSize: MediaSizeType;
	mediaFixedSizes?: MediaFixedSizeOptions;
	mediaType?: CardMediaType;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
	fixImageWidth: boolean;
	/**
	 * Forces hiding the image overlay added to pictures & slideshows on hover.
	 * This is to allow hiding the overlay on slideshow carousels where we don't
	 * want it to be shown whilst retaining it for existing slideshows.
	 */
	hideImageOverlay?: boolean;
	isBetaContainer?: boolean;
	padMedia?: boolean;
};

const imageOverlayContainerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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
	isBetaContainer,
}: {
	mediaSize: MediaSizeType;
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

const fixMediaWidth = ({
	mobile,
	tablet,
	desktop,
}: MediaFixedSizeOptions) => css`
	${mobile &&
	css`
		${until.tablet} {
			${fixMediaWidthStyles(mediaFixedSize[mobile])}
		}
	`}
	${tablet &&
	css`
		${between.tablet.and.desktop} {
			${fixMediaWidthStyles(mediaFixedSize[tablet])}
		}
	`}
	${desktop &&
	css`
		${from.desktop} {
			${fixMediaWidthStyles(mediaFixedSize[desktop])}
		}
	`}
`;

export const MediaWrapper = ({
	children,
	mediaSize,
	mediaFixedSizes = { mobile: 'medium' },
	mediaType,
	mediaPositionOnDesktop,
	mediaPositionOnMobile,
	fixImageWidth,
	hideImageOverlay,
	isBetaContainer = false,
	padMedia,
}: Props) => {
	const isHorizontalOnDesktop =
		mediaPositionOnDesktop === 'left' || mediaPositionOnDesktop === 'right';

	return (
		<div
			css={[
				(mediaType === 'slideshow' ||
					mediaType === 'picture' ||
					mediaType === 'youtube-video' ||
					mediaType === 'loop-video') &&
					isHorizontalOnDesktop &&
					flexBasisStyles({
						mediaSize,
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
				fixImageWidth && fixMediaWidth(mediaFixedSizes),
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
				{/* This image overlay is styled when the CardLink is hovered */}
				{(mediaType === 'picture' || mediaType === 'slideshow') &&
					!hideImageOverlay && (
						<div
							css={[
								imageOverlayContainerStyles,
								padMedia &&
									mediaPaddingStyles(
										mediaPositionOnDesktop,
										mediaPositionOnMobile,
									),
							]}
						>
							{/* This child div is needed as the hover background colour covers the padded
							    area around the image when the hover styles are applied to the top-level div */}
							<div className="image-overlay" />
						</div>
					)}
			</>
		</div>
	);
};
