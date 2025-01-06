import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imagePositionOnDesktop: ImagePositionType;
	imagePositionOnMobile: ImagePositionType;
	isBetaContainer: boolean;
};

const sideMarginStyles = css`
	margin-right: ${space[1]}px;
`;

const topMarginStyles = css`
	margin-top: ${space[1]}px;
`;

const largerTopMargin = css`
	${from.tablet} {
		margin-top: 50px;
	}
`;

const fairgroundSizingStyles = (
	imageSize: ImageSizeType,
	isVerticalOnDesktop: boolean,
	isVerticalOnMobile: boolean,
) => {
	if (isVerticalOnDesktop && isVerticalOnMobile) {
		return css`
			width: 90px;
			height: 90px;
			${until.desktop} {
				height: 80px;
				width: 80px;
			}
		`;
	}

	if (isVerticalOnDesktop && !isVerticalOnMobile) {
		return css`
			width: 90px;
			height: 90px;
			${between.tablet.and.desktop} {
				height: 70px;
				width: 70px;
			}
		`;
	}

	switch (imageSize) {
		case 'small':
			return css`
				width: 80px;
				height: 80px;
			`;
		case 'large':
			return css`
				width: 150px;
				height: 150px;
				${between.tablet.and.desktop} {
					height: 130px;
					width: 130px;
				}
			`;
		case 'jumbo':
			return css`
				width: 190px;
				height: 190px;
				${until.desktop} {
					height: 160px;
					width: 160px;
				}
				${until.tablet} {
					height: 180px;
					width: 180px;
				}
			`;
		case 'medium':
		default:
			return css`
				width: 90px;
				height: 90px;
				${until.tablet} {
					height: 80px;
					width: 80px;
				}
			`;
	}
};

const sizingStyles = (imageSize: ImageSizeType, isVertical: boolean) => {
	switch (imageSize) {
		case 'small':
			return css`
				${until.tablet} {
					height: 73px;
					width: 73px;
				}

				height: ${isVertical ? '132px' : '73px'};
				width: ${isVertical ? '132px' : '73px'};
			`;
		case 'jumbo':
			return css`
				height: ${isVertical ? '132px' : '180px'};
				width: ${isVertical ? '132px' : '180px'};
			`;
		default:
			return css`
				/* Below 980 */
				${until.desktop} {
					height: 108px;
					width: 108px;
				}
				/* Below 740 */
				${until.tablet} {
					height: 73px;
					width: 73px;
				}
				/* Otherwise */
				height: 132px;
				width: 132px;
			`;
	}
};

export const AvatarContainer = ({
	children,
	imageSize,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	isBetaContainer,
}: Props) => {
	const isVerticalOnDesktop =
		imagePositionOnDesktop === 'top' || imagePositionOnDesktop === 'bottom';
	const isVerticalOnMobile =
		imagePositionOnMobile === 'top' || imagePositionOnMobile === 'bottom';

	return (
		<div
			css={[
				sideMarginStyles,
				!isBetaContainer && topMarginStyles,
				!isBetaContainer && isVerticalOnDesktop && largerTopMargin,
				isBetaContainer
					? fairgroundSizingStyles(
							imageSize,
							isVerticalOnDesktop,
							isVerticalOnMobile,
					  )
					: sizingStyles(imageSize, isVerticalOnDesktop),
			]}
		>
			{children}
		</div>
	);
};
