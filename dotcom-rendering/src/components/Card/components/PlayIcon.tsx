import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';
import type { ThemeIcon } from '@guardian/source/react-components';
import { SvgMediaControlsPlay } from '@guardian/source/react-components';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type PlayButtonSize = keyof typeof sizes;

const sizes = {
	small: { button: 40, icon: 32 },
	large: { button: 80, icon: 72 },
} as const satisfies Record<string, { button: number; icon: number }>;

const iconStyles = (
	size: PlayButtonSize,
	sizeOnMobile: Extract<PlayButtonSize, 'small' | 'large'>,
) => css`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(18, 18, 18, 0.6);
	border-radius: 50%;
	width: ${sizes[sizeOnMobile].button}px;
	height: ${sizes[sizeOnMobile].button}px;
	${from.tablet} {
		width: ${sizes[size].button}px;
		height: ${sizes[size].button}px;
	}

	svg {
		transform: translateX(1px);
		width: ${sizes[sizeOnMobile].icon}px;
		height: ${sizes[sizeOnMobile].icon}px;
		${from.tablet} {
			width: ${sizes[size].icon}px;
			height: ${sizes[size].icon}px;
		}
	}
`;

const theme = {
	fill: palette.neutral[100],
} satisfies Partial<ThemeIcon>;

const getIconSizeOnDesktop = (imageSize: ImageSizeType) => {
	switch (imageSize) {
		case 'jumbo':
		case 'large':
		case 'carousel':
		case 'medium':
			return 'large';
		case 'small':
			return 'small';
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
		<div
			className="play-icon"
			css={[
				iconStyles(
					getIconSizeOnDesktop(imageSize),
					getIconSizeOnMobile(imagePositionOnMobile),
				),
			]}
		>
			<SvgMediaControlsPlay theme={theme} />
		</div>
	);
};
