import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source/foundations';
import { PlayIcon } from './PlayIcon';

export type ImagePositionType = 'left' | 'top' | 'right' | 'bottom' | 'none';

export type ImageSizeType = 'small' | 'medium' | 'large' | 'jumbo' | 'carousel';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imageType?: CardImageType;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	showPlayIcon: boolean;
	/** Flexible containers require different styling */
	isFlexibleContainer?: boolean;
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
/** Below tablet, we fix the size of the image and add a margin
around it. The corresponding content flex grows to fill the space */
const fixedImageWidth = (isFlexibleContainer: boolean) => css`
	${until.tablet} {
		width: ${isFlexibleContainer ? '97.5px' : '125px'};
		flex-shrink: 0;
		flex-basis: unset;
		align-self: flex-start;
	}
`;

export const ImageWrapper = ({
	children,
	imageSize,
	imageType,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	showPlayIcon,
	isFlexibleContainer = false,
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
				isHorizontalOnMobile && fixedImageWidth(isFlexibleContainer),

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
