import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type Props = {
	children: React.ReactNode;
	imageSize: ImageSizeType;
	imagePositionOnDesktop: ImagePositionType;
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
	imageSize: ImageSizeType,
	imagePositionOnDesktop: ImagePositionType,
) => {
	const isVertical =
		imagePositionOnDesktop === 'top' || imagePositionOnDesktop === 'bottom';

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
}: Props) => {
	const isVertical =
		imagePositionOnDesktop === 'top' || imagePositionOnDesktop === 'bottom';

	return (
		<div
			css={[
				sideMarginStyles,
				topMarginStyles,
				isVertical && largerTopMargin,
				sizingStyles(imageSize, imagePositionOnDesktop),
			]}
		>
			{children}
		</div>
	);
};
