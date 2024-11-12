import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source/foundations';
import type { CardImageType } from '../../../types/layout';
import { PlayIcon } from './PlayIcon';

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
	| 'feature'
	| 'feature-large';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imageFixedSizes?: ImageFixedSizeOptions;
	imageType?: CardImageType;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	showPlayIcon: boolean;
};

/**
 * This function works in partnership with its sibling in `ContentWrapper`. If you
 * change any values here be sure to update that file as well.
 *
 */
const flexBasisStyles = ({
	imageSize,
}: {
	imageSize: ImageSizeType;
}): SerializedStyles => {
	switch (imageSize) {
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
	showPlayIcon,
}: Props) => {
	const isHorizontalOnDesktop =
		imagePositionOnDesktop === 'left' || imagePositionOnDesktop === 'right';
	const isHorizontalOnMobile =
		imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right';
	return (
		<div
			css={[
				imageType === 'slideshow' &&
					isHorizontalOnDesktop &&
					flexBasisStyles({
						imageSize,
					}),
				(imageType === 'picture' || imageType === 'video') &&
					isHorizontalOnDesktop &&
					flexBasisStyles({
						imageSize,
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
			]}
		>
			<>
				{children}
				{/* This image overlay is styled when the CardLink is hovered */}
				{(imageType === 'picture' || imageType === 'slideshow') && (
					<div className="image-overlay" />
				)}
				{imageType === 'picture' && showPlayIcon && (
					<PlayIcon
						imageSize={imageSize}
						imagePositionOnMobile={imagePositionOnMobile}
					/>
				)}
			</>
		</div>
	);
};
