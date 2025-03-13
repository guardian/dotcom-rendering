import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
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

type ImageDirection = 'vertical' | 'horizontal' | 'none';

const paddingBetaContainerStyles = (
	imageDirectionMobile: ImageDirection,
	imageDirectionDesktop: ImageDirection,
	imagePositionOnDesktop: ImagePositionType,
	paddingWidth: 1 | 2,
	isFlexibleContainer: boolean,
) => css`
	${until.tablet} {
		padding-left: ${imageDirectionMobile !== 'horizontal' &&
		`${space[paddingWidth]}px`};
		padding-right: ${imageDirectionMobile !== 'horizontal' &&
		`${space[paddingWidth]}px`};
		padding-top: ${imageDirectionMobile !== 'vertical' &&
		`${space[paddingWidth]}px`};
		padding-bottom: ${imageDirectionMobile !== 'vertical' &&
		`${space[paddingWidth]}px`};
	}
	${from.tablet} {
		padding-left: ${imageDirectionDesktop !== 'horizontal' &&
		`${space[paddingWidth]}px`};
		padding-right: ${imageDirectionDesktop !== 'horizontal' &&
		`${space[paddingWidth]}px`};
		padding-top: ${imageDirectionDesktop !== 'vertical' &&
		`${space[paddingWidth]}px`};
		padding-bottom: ${(imageDirectionDesktop !== 'vertical' ||
			(!isFlexibleContainer && imagePositionOnDesktop === 'top')) &&
		`${space[paddingWidth]}px`};
	}
`;

const padRightStyles = css`
	${from.tablet} {
		padding-right: ${space[5]}px;
	}
`;

const getImageDirection = (
	imagePosition: ImagePositionType,
): ImageDirection => {
	if (imagePosition === 'top' || imagePosition === 'bottom') {
		return 'vertical';
	}

	if (imagePosition === 'left' || imagePosition === 'right') {
		return 'horizontal';
	}

	return 'none';
};

type Props = {
	children: React.ReactNode;
	imageType?: CardImageType;
	imageSize: ImageSizeType;
	isBetaContainer: boolean;
	isFlexibleContainer: boolean;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	padContent?: 'small' | 'large';
	padRight?: boolean;
};

export const ContentWrapper = ({
	children,
	imageType,
	imageSize,
	isBetaContainer,
	isFlexibleContainer,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	padContent,
	padRight = false,
}: Props) => {
	const imageDirectionDesktop = getImageDirection(imagePositionOnDesktop);
	const imageDirectionMobile = getImageDirection(imagePositionOnMobile);
	const paddingSpace = padContent === 'small' ? 1 : 2;

	return (
		<div
			css={[
				sizingStyles,
				imageDirectionDesktop === 'horizontal' &&
					flexBasisStyles({ imageSize, imageType }),
				padContent &&
					!isBetaContainer &&
					css`
						padding: ${space[paddingSpace]}px;
					`,
				padContent &&
					isBetaContainer &&
					paddingBetaContainerStyles(
						imageDirectionMobile,
						imageDirectionDesktop,
						imagePositionOnDesktop,
						paddingSpace,
						isFlexibleContainer,
					),
				padRight && padRightStyles,
			]}
		>
			{children}
		</div>
	);
};
