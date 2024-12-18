import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space } from '@guardian/source/foundations';
import type { CardImageType } from '../../../types/layout';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

const sizingStyles = css`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
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

const paddingStyles = (
	imagePosition: ImagePositionType,
	isFlexibleContainer: boolean,
) => {
	/**
	 * If we're in a flexible container there is a 20px gap between the image
	 * and content. We don't apply padding to the content on the same edge as
	 * the image so the content is aligned with the grid.
	 */
	if (isFlexibleContainer && imagePosition === 'left') {
		return css`
			padding: ${space[1]}px ${space[1]}px ${space[1]}px 0;
		`;
	}

	if (isFlexibleContainer && imagePosition === 'right') {
		return css`
			padding: ${space[1]}px 0 ${space[1]}px ${space[1]}px;
		`;
	}

	return css`
		padding: ${space[1]}px;
	`;
};

type Props = {
	children: React.ReactNode;
	imageType?: CardImageType;
	imageSize: ImageSizeType;
	imagePositionOnDesktop: ImagePositionType;
	hasBackgroundColour?: boolean;
	isOnwardContent?: boolean;
	isFlexibleContainer?: boolean;
};

export const ContentWrapper = ({
	children,
	imageType,
	imageSize,
	imagePositionOnDesktop,
	hasBackgroundColour,
	isOnwardContent,
	isFlexibleContainer = false,
}: Props) => {
	const isHorizontalOnDesktop =
		imagePositionOnDesktop === 'left' || imagePositionOnDesktop === 'right';

	return (
		<div
			css={[
				sizingStyles,
				isHorizontalOnDesktop &&
					flexBasisStyles({ imageSize, imageType }),
				(!!hasBackgroundColour || !!isOnwardContent) &&
					paddingStyles(imagePositionOnDesktop, isFlexibleContainer),
			]}
		>
			{children}
		</div>
	);
};
