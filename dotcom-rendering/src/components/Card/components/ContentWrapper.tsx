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
	paddingWidth: 'small' | 'large',
) => {
	const paddingSize =
		paddingWidth === 'small' ? `${space[1]}` : `${space[2]}`;
	/**
	 * If we're in a flexible container there is a 20px gap between the image
	 * and content. We don't apply padding to the content on the same edge as
	 * the image so the content is aligned with the grid.
	 */
	if (isFlexibleContainer && imagePosition === 'left') {
		return css`
			padding: ${paddingSize}px ${paddingSize}px ${paddingSize}px 0;
		`;
	}

	if (isFlexibleContainer && imagePosition === 'right') {
		return css`
			padding: ${paddingSize}px 0 ${paddingSize}px ${paddingSize}px;
		`;
	}

	return css`
		padding: ${paddingSize}px;
	`;
};

type Props = {
	children: React.ReactNode;
	imageType?: CardImageType;
	imageSize: ImageSizeType;
	imagePositionOnDesktop: ImagePositionType;
	padContent?: 'small' | 'large';
	isFlexibleContainer?: boolean;
};

export const ContentWrapper = ({
	children,
	imageType,
	imageSize,
	imagePositionOnDesktop,
	padContent,
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
				padContent &&
					paddingStyles(
						imagePositionOnDesktop,
						isFlexibleContainer,
						padContent,
					),
			]}
		>
			{children}
		</div>
	);
};
