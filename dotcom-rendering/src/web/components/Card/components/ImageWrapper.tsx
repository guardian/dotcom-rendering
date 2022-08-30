import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source-foundations';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imageType?: CardImageType;
	imagePosition: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
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

export const ImageWrapper = ({
	children,
	imageSize,
	imageType,
	imagePosition,
	imagePositionOnMobile,
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
			</>
		</div>
	);
};
