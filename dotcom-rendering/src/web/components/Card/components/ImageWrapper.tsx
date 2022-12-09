import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, brandAlt, from, until } from '@guardian/source-foundations';
import { SvgMediaControlsPlay } from '@guardian/source-react-components';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imageType?: CardImageType;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	showPlayIcon?: boolean;
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

const iconWrapperStyles = css`
	position: absolute;
	bottom: 2px;
	left: 4px;
`;

const iconStyles = (size: number, sizeOnMobile: number) => css`
	background-color: ${brandAlt[400]};
	border-radius: 50%;
	display: inline-block;

	width: ${sizeOnMobile}px;
	height: ${sizeOnMobile}px;
	${from.tablet} {
		width: ${size}px;
		height: ${size}px;
	}

	svg {
		/* Visual centering */
		transform: translateX(1px);
	}
`;

const hideOnMobile = css`
	${until.tablet} {
		display: none;
	}
`;

const PlayIcon = ({
	imageSize,
	imagePositionOnMobile,
	imagePosition,
}: {
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
	imagePosition: ImagePositionType;
}) => {
	const sizeOnMobile =
		(imagePosition === 'left' || imagePosition === 'right') &&
		imageSize === 'small'
			? 28
			: 40;
	const sizeOnDesktop =
		imageSize === 'jumbo'
			? 60
			: (imagePosition === 'left' || imagePosition === 'right') &&
			  imageSize === 'small'
			? 28
			: 40;

	return (
		<div css={iconWrapperStyles}>
			<span
				css={[
					iconStyles(sizeOnDesktop, sizeOnMobile),
					imagePositionOnMobile !== 'top' &&
						imagePositionOnMobile !== 'bottom' &&
						hideOnMobile,
				]}
			>
				<SvgMediaControlsPlay />
			</span>
		</div>
	);
};

export const ImageWrapper = ({
	children,
	imageSize,
	imageType,
	imagePosition,
	imagePositionOnMobile,
	showPlayIcon,
}: Props) => {
	const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
	const isHorizontalOnMobile =
		imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right';

	return (
		<div
			css={[
				imageType === 'mainMedia' &&
					isHorizontal &&
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
				/* Below tablet, we fix the size of the image and add a margin
				   around it. The corresponding content flex grows to fill the space */
				isHorizontalOnMobile &&
					css`
						${until.tablet} {
							width: 119px;
							flex-shrink: 0;
							margin-top: 4px;
							margin-right: 0;
							margin-bottom: 4px;
							margin-left: 4px;
							flex-basis: unset;
						}
					`,
				css`
					/* fit-content here prevents the overlay from stretching when the cards height is increased */
					height: fit-content;
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
				{imageType === 'mainMedia' && <div className="image-overlay" />}
				{imageType === 'mainMedia' && showPlayIcon && (
					<PlayIcon
						imageSize={imageSize}
						imagePositionOnMobile={imagePositionOnMobile}
						imagePosition={imagePosition}
					/>
				)}
			</>
		</div>
	);
};
