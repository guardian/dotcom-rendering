import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import { decideCardContentPadding } from '../../../lib/decideCardContentPadding';
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

const negativeTopMargin = css`
	/**
	 * This ensures the top of the text is flush
	 * with the image for a horizontal card
	 */
	margin-top: calc(1px - ${space[1]}px);
`;
const negativeTopMarginDesktop = css`
	${from.tablet} {
		${negativeTopMargin}
	}
`;

const negativeTopMarginMobile = css`
	${until.tablet} {
		${negativeTopMargin}
	}
`;

type Props = {
	children: React.ReactNode;
	imageType?: CardImageType;
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
	imagePositionOnDesktop: ImagePositionType;
	addAdditionalPadding?: boolean;
};

export const ContentWrapper = ({
	children,
	imageType,
	imageSize,
	imagePositionOnMobile,
	imagePositionOnDesktop,
	addAdditionalPadding,
}: Props) => {
	const isHorizontalOnDesktop =
		imagePositionOnDesktop === 'left' || imagePositionOnDesktop === 'right';
	const isHorizontalOnMobile =
		imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right';

	const { mobilePadding, desktopPadding } = decideCardContentPadding({
		imagePositionOnMobile,
		imagePositionOnDesktop,
		addAdditionalPadding,
	});

	return (
		<div
			css={[
				sizingStyles,
				isHorizontalOnDesktop && [
					flexBasisStyles({ imageSize, imageType }),
					negativeTopMarginDesktop,
				],
				isHorizontalOnMobile && negativeTopMarginMobile,
				css`
					padding: ${mobilePadding};
					${from.tablet} {
						padding: ${desktopPadding};
					}
				`,
			]}
		>
			{children}
		</div>
	);
};
