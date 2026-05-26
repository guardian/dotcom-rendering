import { css } from '@emotion/react';
import { between, space, until } from '@guardian/source/foundations';
import type { MediaPositionType, MediaSizeType } from './MediaWrapper';

type Props = {
	children: React.ReactNode;
	imageSize: MediaSizeType;
	imagePositionOnDesktop: MediaPositionType;
	imagePositionOnMobile: MediaPositionType;
};

const sideMarginStyles = css`
	margin-right: ${space[1]}px;
`;

const sizingStyles = (
	imageSize: MediaSizeType,
	isVerticalOnDesktop: boolean,
	isVerticalOnMobile: boolean,
) => {
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
		case 'scrollable-small':
			return css`
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
		case 'carousel':
		case 'scrollable-medium':
		case 'podcast':
		case 'highlights-card':
		case 'feature':
		case 'feature-large':
		case 'feature-immersive':
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
}: Props) => {
	const isVerticalOnDesktop =
		imagePositionOnDesktop === 'top' || imagePositionOnDesktop === 'bottom';
	const isVerticalOnMobile =
		imagePositionOnMobile === 'top' || imagePositionOnMobile === 'bottom';

	return (
		<div
			css={[
				sideMarginStyles,
				sizingStyles(
					imageSize,
					isVerticalOnDesktop,
					isVerticalOnMobile,
				),
			]}
		>
			{children}
		</div>
	);
};
