import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import type { CardMediaType } from '../../../types/layout';
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
	isBetaContainer,
}: {
	imageSize: ImageSizeType;
	imageType?: CardMediaType;
	isBetaContainer: boolean;
}): SerializedStyles => {
	if (imageType === 'avatar') {
		return css`
			flex-basis: 100%;
		`;
	}

	if (!isBetaContainer) {
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
	}

	switch (imageSize) {
		default:
		case 'small':
		case 'medium':
			return css`
				${from.tablet} {
					flex-basis: 50%;
				}
			`;
		case 'large':
			return css`
				${from.tablet} {
					flex-basis: 220px;
				}
				${from.desktop} {
					flex-basis: 300px;
				}
			`;
		case 'xlarge':
			return css`
				${from.tablet} {
					flex-basis: 160px;
				}
				${from.desktop} {
					flex-basis: 220px;
				}
			`;
		case 'jumbo':
			return css`
				flex-basis: 100%;
			`;
	}
};

type ImageDirection = 'vertical' | 'horizontal' | 'none';

/**
 * There is no padding on the side of the image where the text is.
 */
const paddingBetaContainerStyles = (
	imagePositionMobile: ImagePositionType,
	imagePositionDesktop: ImagePositionType,
	padding: 1 | 2,
) => css`
	${until.tablet} {
		padding-left: ${imagePositionMobile !== 'left' &&
		`${space[padding]}px`};
		padding-right: ${imagePositionMobile !== 'right' &&
		`${space[padding]}px`};
		padding-top: ${imagePositionMobile !== 'top' && `${space[padding]}px`};
		padding-bottom: ${imagePositionMobile !== 'bottom' &&
		`${space[padding]}px`};
	}
	${from.tablet} {
		padding-left: ${imagePositionDesktop !== 'left' &&
		`${space[padding]}px`};
		padding-right: ${imagePositionDesktop !== 'right' &&
		`${space[padding]}px`};
		padding-top: ${imagePositionDesktop !== 'top' && `${space[padding]}px`};
		padding-bottom: ${imagePositionDesktop !== 'bottom' &&
		`${space[padding]}px`};
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
	imageType?: CardMediaType;
	imageSize: ImageSizeType;
	isBetaContainer: boolean;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	padContent?: 'small' | 'large';
};

export const ContentWrapper = ({
	children,
	imageType,
	imageSize,
	isBetaContainer,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	padContent,
}: Props) => {
	const imageDirectionDesktop = getImageDirection(imagePositionOnDesktop);
	const paddingSpace = padContent === 'small' ? 1 : 2;

	return (
		<div
			css={[
				sizingStyles,
				imageDirectionDesktop === 'horizontal' &&
					flexBasisStyles({ imageSize, imageType, isBetaContainer }),
				padContent &&
					!isBetaContainer &&
					css`
						padding: ${space[paddingSpace]}px;
					`,
				padContent &&
					isBetaContainer &&
					paddingBetaContainerStyles(
						imagePositionOnMobile,
						imagePositionOnDesktop,
						paddingSpace,
					),
			]}
		>
			{children}
		</div>
	);
};
