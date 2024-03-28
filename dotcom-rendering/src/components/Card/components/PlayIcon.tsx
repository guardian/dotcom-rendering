import { css } from '@emotion/react';
import { from, palette } from '@guardian/source-foundations';
import { SvgMediaControlsPlay } from '@guardian/source-react-components';
import type { ImagePositionType, ImageSizeType } from './ImageWrapper';

type PlayButtonSize = keyof typeof sizes;

const sizes = {
	small: { button: 40, icon: 32 },
	medium: { button: 80, icon: 72 },
	large: { button: 80, icon: 72 },
	xlarge: { button: 80, icon: 72 },
} as const satisfies Record<string, { button: number; icon: number }>;

const iconWrapperStyles = css`
	display: flex; /* Fixes the div mis-sizing itself */
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -20px;
	margin-left: -20px;
`;

const iconPulseStyles = css`
	:focus,
	:hover {
		transform: scale(1.15);
		transition-duration: 300ms;
	}
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
	isPlayableMediaCard,
}: {
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
	isPlayableMediaCard: boolean;
}) => {
	return (
		<div css={[iconWrapperStyles, isPlayableMediaCard && iconPulseStyles]}>
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
