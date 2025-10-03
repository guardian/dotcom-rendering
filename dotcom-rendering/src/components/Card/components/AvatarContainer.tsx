import { css } from '@emotion/react';
import { between, from, space, until } from '@guardian/source/foundations';
import type { MediaPositionType, MediaSizeType } from './MediaWrapper';

type Props = {
	children: React.ReactNode;
	imageSize: MediaSizeType;
	imagePositionOnDesktop: MediaPositionType;
	imagePositionOnMobile: MediaPositionType;
	isBetaContainer: boolean;
	isFlexibleContainer: boolean;
	isInAllBoostsTest?: boolean;
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

const sizingStyles = (
	imageSize: MediaSizeType,
	isBetaContainer: boolean,
	isFlexibleContainer: boolean,
	isVerticalOnDesktop: boolean,
	isVerticalOnMobile: boolean,
	isInAllBoostsTest = false,
) => {
	if (!isBetaContainer) {
		switch (imageSize) {
			case 'small':
				return css`
					${until.tablet} {
						height: 73px;
						width: 73px;
					}

					height: ${isVerticalOnDesktop ? '132px' : '73px'};
					width: ${isVerticalOnDesktop ? '132px' : '73px'};
				`;
			case 'jumbo':
				return css`
					height: ${isVerticalOnDesktop ? '132px' : '180px'};
					width: ${isVerticalOnDesktop ? '132px' : '180px'};
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
			if (isInAllBoostsTest) {
				return isFlexibleContainer
					? css`
							width: 90px;
							height: 90px;
							${until.tablet} {
								height: 150px;
								width: 150px;
							}
					  `
					: css`
							width: 80px;
							height: 80px;
							${until.tablet} {
								height: 150px;
								width: 150px;
							}
					  `;
			}

			return isFlexibleContainer
				? css`
						width: 90px;
						height: 90px;
						${until.tablet} {
							height: 80px;
							width: 80px;
						}
				  `
				: css`
						width: 80px;
						height: 80px;
				  `;
		case 'large':
		case 'xlarge':
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

export const AvatarContainer = ({
	children,
	imageSize,
	imagePositionOnDesktop,
	imagePositionOnMobile,
	isBetaContainer,
	isFlexibleContainer,
	isInAllBoostsTest,
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
				sizingStyles(
					imageSize,
					isBetaContainer,
					isFlexibleContainer,
					isVerticalOnDesktop,
					isVerticalOnMobile,
					isInAllBoostsTest,
				),
			]}
		>
			{children}
		</div>
	);
};
