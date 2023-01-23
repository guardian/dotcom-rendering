import { css } from '@emotion/react';
import { brandAlt, from } from '@guardian/source-foundations';
import { SvgMediaControlsPlay } from '@guardian/source-react-components';

type PlayButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

const buttonSize = (size: PlayButtonSize) => {
	switch (size) {
		case 'xsmall':
			return 24;
		case 'small':
			return 28;
		case 'medium':
			return 40;
		case 'large':
			return 48;
		case 'xlarge':
			return 56;
	}
};

const iconSize = (size: PlayButtonSize) => {
	switch (size) {
		case 'xsmall':
			return 20;
		case 'small':
			return 22;
		case 'medium':
			return 28;
		case 'large':
			return 32;
		case 'xlarge':
			return 40;
	}
};

const iconWrapperStyles = css`
	display: flex; /* Fixes the div mis-sizing itself */
	position: absolute;
	bottom: 4px;
	left: 4px;
`;

const iconStyles = (size: PlayButtonSize, sizeOnMobile: PlayButtonSize) => css`
	background-color: ${brandAlt[400]};
	border-radius: 50%;
	display: inline-block;
	width: ${buttonSize(sizeOnMobile)}px;
	height: ${buttonSize(sizeOnMobile)}px;
	${from.tablet} {
		width: ${buttonSize(size)}px;
		height: ${buttonSize(size)}px;
	}

	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		/* Visual centering */
		transform: translateX(1px);
		width: ${iconSize(sizeOnMobile)}px;
		height: ${iconSize(sizeOnMobile)}px;
		${from.tablet} {
			width: ${iconSize(size)}px;
			height: ${iconSize(size)}px;
		}
	}
`;

const getIconSizeOnDesktop = (
	imageSize: ImageSizeType,
	imagePosition: ImagePositionType,
): PlayButtonSize => {
	if (imageSize === 'jumbo') return 'xlarge';
	else if (imageSize === 'large') return 'large';
	else if (imageSize === 'medium') return 'medium';
	else if (imageSize === 'small') return 'xsmall';
	else return 'large';
};

const getIconSizeOnMobile = (
	imagePositionOnMobile: ImagePositionType,
): PlayButtonSize =>
	imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right'
		? 'xsmall'
		: 'medium';

export const PlayIcon = ({
	imageSize,
	imagePositionOnMobile,
	imagePosition,
}: {
	imageSize: ImageSizeType;
	imagePositionOnMobile: ImagePositionType;
	imagePosition: ImagePositionType;
}) => {
	return (
		<div css={iconWrapperStyles}>
			<span
				css={[
					iconStyles(
						getIconSizeOnDesktop(imageSize, imagePosition),
						getIconSizeOnMobile(imagePositionOnMobile),
					),
				]}
			>
				<SvgMediaControlsPlay />
			</span>
		</div>
	);
};
