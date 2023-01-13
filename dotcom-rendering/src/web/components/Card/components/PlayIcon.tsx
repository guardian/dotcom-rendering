import { css } from '@emotion/react';
import { brandAlt, from } from '@guardian/source-foundations';
import { SvgMediaControlsPlay } from '@guardian/source-react-components';

const iconWrapperStyles = css`
	display: flex; /* Fixes the div mis-sizing itself */
	position: absolute;
	bottom: 4px;
	left: 4px;
`;

const iconStyles = (size: number, sizeOnMobile: number) => css`
	background-color: ${brandAlt[400]};
	border-radius: 50%;
	display: inline-block;
	width: ${sizeOnMobile}px;
	height: ${sizeOnMobile}px;
	${from.tablet} {
		width: ${size}px;
		height: ${size}px;
	}
	svg {
		/* Visual centering */
		transform: translateX(1px);
	}
`;

const getIconSizeOnDesktop = (
	imageSize: ImageSizeType,
	imagePosition: ImagePositionType,
) => {
	if (imageSize === 'jumbo') return 60;
	else if (
		(imagePosition === 'left' || imagePosition === 'right') &&
		imageSize === 'small'
	)
		return 24;
	else return 40;
};

const getIconSizeOnMobile = (imagePositionOnMobile: ImagePositionType) =>
	imagePositionOnMobile === 'left' || imagePositionOnMobile === 'right'
		? 24
		: 40;

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
