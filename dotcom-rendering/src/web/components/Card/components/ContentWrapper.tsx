import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from } from '@guardian/source-foundations';

const sizingStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

/**
 * This function works in partnership with its sibling in `ImageWrapper`. If you
 * change any values here be sure to update that file as well.
 *
 */
const flexBasisStyles = ({
	imageSize,
	imageType,
}: {
	imageSize: ImageSizeType;
	imageType?: CardImageType;
}): SerializedStyles => {
	if (imageType === 'avatar') {
		return css`
			flex-basis: 100%;
		`;
	}
	switch (imageSize) {
		default:
		case 'small':
			return css`
				flex-basis: 75%;
				${between.tablet.and.desktop} {
					flex-basis: 60%;
				}
				${from.desktop} {
					flex-basis: 70%;
				}
			`;
		case 'medium':
			return css`
				${from.tablet} {
					flex-basis: 50%;
				}
			`;
		case 'large':
			return css`
				${from.tablet} {
					flex-basis: 34%;
				}
			`;
		case 'jumbo':
			return css`
				${from.tablet} {
					flex-basis: 25%;
				}
			`;
	}
};

type Props = {
	children: React.ReactNode;
	imageType?: CardImageType;
	imageSize: ImageSizeType;
	imagePosition: ImagePositionType;
};

export const ContentWrapper = ({
	children,
	imageType,
	imageSize,
	imagePosition,
}: Props) => {
	const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
	const isVertical = imagePosition === 'top' || imagePosition === 'bottom';
	return (
		<div
			css={[
				sizingStyles,
				isHorizontal && flexBasisStyles({ imageSize, imageType }),
				/* If the image is top or bottom positioned then it takes 100% of the width and
				   we want the content to grow into the remaining vertical space */
				isVertical &&
					css`
						flex-grow: 1;
					`,
			]}
		>
			{children}
		</div>
	);
};
