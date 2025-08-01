import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import type { CardImageType } from '../../../types/layout';

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

export type ImagePositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';
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
	imageSize: ImageSizeType;
	imageFixedSizes?: ImageFixedSizeOptions;
	imageType?: CardImageType;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	/**
	 * Forces hiding the image overlay added to pictures & slideshows on hover.
	 * This is to allow hiding the overlay on slideshow carousels where we don't
	 * want it to be shown whilst retaining it for existing slideshows.
	 */
	hideImageOverlay?: boolean;
	padImage?: boolean;
	isBetaContainer?: boolean;
};

const imageOverlayContainerStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

/**
 * There is no padding on the side of the image where the text is.
 */
const imagePaddingStyles = (
	imagePositionOnDesktop: ImagePositionType,
	imagePositionOnMobile: ImagePositionType,
) => css`
	${until.tablet} {
		padding-left: ${imagePositionOnMobile !== 'right' && `${space[2]}px`};
		padding-right: ${imagePositionOnMobile !== 'left' && `${space[2]}px`};
		padding-top: ${imagePositionOnMobile !== 'bottom' && `${space[2]}px`};
		padding-bottom: ${imagePositionOnMobile !== 'top' && `${space[2]}px`};
	}
	${from.tablet} {
		padding-left: ${imagePositionOnDesktop !== 'right' && `${space[2]}px`};
		padding-right: ${imagePositionOnDesktop !== 'left' && `${space[2]}px`};
		padding-top: ${imagePositionOnDesktop !== 'bottom' && `${space[2]}px`};
		padding-bottom: ${imagePositionOnDesktop !== 'top' && `${space[2]}px`};
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

export const ImageWrapper = ({
	children,
	imageSize,
	imageFixedSizes = { mobile: 'medium' },
	imageType,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	hideImageOverlay,
	padImage,
	isBetaContainer,
}: Props) => {
	const isHorizontalOnDesktop =
		imagePositionOnDesktop === 'left' || imagePositionOnDesktop === 'right';
	const isHorizontalOnMobile =
		imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right';

	return (
		<div
			css={[
				(imageType === 'slideshow' ||
					imageType === 'picture' ||
					imageType === 'video' ||
					imageType === 'loop-video') &&
					isHorizontalOnDesktop &&
					flexBasisStyles({
						imageSize,
						isBetaContainer: !!isBetaContainer,
					}),
				imageType === 'avatar' &&
					css`
						display: flex;
						justify-content: flex-end;
					`,
				/* If no image position for mobile is provided then hide the image */
				imagePositionOnMobile === 'none' &&
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
				padImage &&
					imagePaddingStyles(
						imagePositionOnDesktop,
						imagePositionOnMobile,
					),
			]}
		>
			<>
				{children}
				{/* This image overlay is styled when the CardLink is hovered */}
				{(imageType === 'picture' || imageType === 'slideshow') &&
					!hideImageOverlay && (
						<div
							css={[
								imageOverlayContainerStyles,
								padImage &&
									imagePaddingStyles(
										imagePositionOnDesktop,
										imagePositionOnMobile,
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
