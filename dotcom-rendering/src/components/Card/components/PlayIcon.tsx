import { css } from '@emotion/react';
import { from, palette } from '@guardian/source-foundations';
import { SvgMediaControlsPlay } from '@guardian/source-react-components';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type PlayButtonSize = keyof typeof sizes;

const sizes = {
	small: { button: 28, icon: 26 },
	medium: { button: 44, icon: 36 },
	large: { button: 48, icon: 40 },
	xlarge: { button: 60, icon: 54 },
} as const satisfies Record<string, { button: number; icon: number }>;

const iconWrapperStyles = css`
	display: flex; /* Fixes the div mis-sizing itself */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const iconStyles = (
	size: PlayButtonSize,
	sizeOnMobile: Extract<PlayButtonSize, 'small' | 'large'>,
) => css`
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 50%;
	width: ${sizes[sizeOnMobile].button}px;
	height: ${sizes[sizeOnMobile].button}px;
	${from.tablet} {
		width: ${sizes[size].button}px;
		height: ${sizes[size].button}px;
	}

	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		/* Visual centering */
		fill: ${palette.neutral[100]};
		transform: translateX(1px);
		width: ${sizes[sizeOnMobile].icon}px;
		height: ${sizes[sizeOnMobile].icon}px;
		${from.tablet} {
			width: ${sizes[size].icon}px;
			height: ${sizes[size].icon}px;
		}
	}
`;

const getIconSizeOnDesktop = (imageSize: ImageSizeType) => {
	switch (imageSize) {
		case 'jumbo':
			return 'xlarge';
		case 'large':
		case 'carousel':
			return 'large';
		case 'medium':
		case 'small':
			return imageSize;
	}
};

const getIconSizeOnMobile = (imagePositionOnMobile: ImagePositionType) =>
	imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right'
		? 'small'
		: 'large';

export const PlayIcon = ({
	imageSize,
	imagePositionOnMobile,
}: {
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
}) => {
	return (
		<div css={iconWrapperStyles}>
			<span
				css={[
					iconStyles(
						getIconSizeOnDesktop(imageSize),
						getIconSizeOnMobile(imagePositionOnMobile),
					),
				]}
			>
				<SvgMediaControlsPlay />
			</span>
		</div>
	);
};
