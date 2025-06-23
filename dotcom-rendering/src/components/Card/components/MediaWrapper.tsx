import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import type { CardMediaType } from '../../../types/layout';

const imageFixedSize = {
	tiny: 86,
	small: 122.5,
	medium: 125,
};

type ImageFixedSize = keyof typeof imageFixedSize;

export type ImageFixedSizeOptions = {
	mobile: ImageFixedSize;
	tablet?: ImageFixedSize;
	desktop?: ImageFixedSize;
};

export type MediaPositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';
export type ImageSizeType =
	| 'small'
	| 'medium'
	| 'large'
	| 'jumbo'
	| 'carousel'
	| 'podcast'
	| 'highlights-card'
	| 'feature'
	| 'feature-large'
	| 'feature-immersive';

type Props = {
	children: React.ReactNode;
	cardMediaType?: CardMediaType;
	imageSize: ImageSizeType;
	imageFixedSizes?: ImageFixedSizeOptions;
	mediaPositionOnDesktop: MediaPositionType;
	mediaPositionOnMobile: MediaPositionType;
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
 * There is no padding on the side of the media where the text is.
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
 * This function works in partnership with its sibling in `ContentWrapper`. If you
 * change any values here be sure to update that file as well.
 */
const flexBasisStyles = ({
	imageSize,
	isBetaContainer,
}: {
	imageSize: ImageSizeType;
	isBetaContainer: boolean;
}): SerializedStyles => {
	switch (imageSize) {
		default:
		case 'small':
			return isBetaContainer
				? css`
						flex-basis: 50%;
				  `
				: css`
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
};
/**
 * Below tablet, we fix the size of the image and add a margin around it.
 * The corresponding content flex grows to fill the space.
 *
 * Fixed images sizes can optionally be applied at tablet and desktop.
 */
const fixImageWidthStyles = (width: number) => css`
	width: ${width}px;
	flex-shrink: 0;
	flex-basis: unset;
	align-self: flex-start;
`;

const fixImageWidth = ({
	mobile,
	tablet,
	desktop,
}: ImageFixedSizeOptions) => css`
	${until.tablet} {
		${fixImageWidthStyles(imageFixedSize[mobile])}
	}
	${tablet &&
	css`
		${between.tablet.and.desktop} {
			${fixImageWidthStyles(imageFixedSize[tablet])}
		}
	`}
	${desktop &&
	css`
		${from.desktop} {
			${fixImageWidthStyles(imageFixedSize[desktop])}
		}
	`}
`;

export const MediaWrapper = ({
	children,
	imageSize,
	imageFixedSizes = { mobile: 'medium' },
	cardMediaType,
	mediaPositionOnDesktop,
	mediaPositionOnMobile,
	hideImageOverlay,
	isBetaContainer,
	padMedia,
}: Props) => {
	const isHorizontalOnDesktop =
		mediaPositionOnDesktop === 'left' || mediaPositionOnDesktop === 'right';
	const isHorizontalOnMobile =
		mediaPositionOnMobile === 'left' || mediaPositionOnMobile === 'right';

	return (
		<div
			css={[
				(cardMediaType === 'slideshow' ||
					cardMediaType === 'picture' ||
					cardMediaType === 'video' ||
					cardMediaType === 'loop-video') &&
					isHorizontalOnDesktop &&
					flexBasisStyles({
						imageSize,
						isBetaContainer: !!isBetaContainer,
					}),
				cardMediaType === 'avatar' &&
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
				isHorizontalOnMobile && fixImageWidth(imageFixedSizes),
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
				{(cardMediaType === 'picture' ||
					cardMediaType === 'slideshow') &&
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
