import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source/foundations';
import { PlayIcon } from './PlayIcon';

export type ImagePositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';

export type ImageSizeType = 'small' | 'medium' | 'large' | 'jumbo' | 'carousel';

export type FixedImageSizeType = 'small' | 'medium' | 'large';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imageType?: CardImageType;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	showPlayIcon: boolean;
	fixedImageSizeOnMobile?: FixedImageSizeType;
	fixedImageSizeOnTablet?: FixedImageSizeType;
	fixedImageSizeOnDesktop?: FixedImageSizeType;
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
const getFixedImageWidth = (imageSize: FixedImageSizeType) => {
	switch (imageSize) {
		case 'small':
			return '86px';
		case 'medium':
			return '97.5px';
		case 'large':
			return '125px';
	}
};

const fixedImageWidth = (
	mobile: FixedImageSizeType,
	tablet?: FixedImageSizeType,
	desktop?: FixedImageSizeType,
) => css`
	${until.tablet} {
		width: ${getFixedImageWidth(mobile)};
		flex-shrink: 0;
		flex-basis: unset;
		align-self: flex-start;
	}
	${tablet &&
	`
	${between.tablet.and.desktop} {
		width: ${getFixedImageWidth(tablet)};
		flex-shrink: 0;
		flex-basis: unset;
		align-self: flex-start;
	}`}
	${desktop &&
	`
	${from.desktop} {
		width: ${getFixedImageWidth(desktop)};
		flex-shrink: 0;
		flex-basis: unset;
		align-self: flex-start;
	}`}
`;

export const ImageWrapper = ({
	children,
	imageSize,
	imageType,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	showPlayIcon,
	fixedImageSizeOnMobile = 'large',
	fixedImageSizeOnTablet,
	fixedImageSizeOnDesktop,
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
				isHorizontalOnMobile &&
					fixedImageWidth(
						fixedImageSizeOnMobile,
						fixedImageSizeOnTablet,
						fixedImageSizeOnDesktop,
					),

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
