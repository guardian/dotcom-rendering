import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import { secondsToDuration } from '../lib/formatTime';
import type { ImagePositionType } from './Card/components/ImageWrapper';

const durationStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
	background-color: rgba(0, 0, 0, 0.7);
	width: fit-content;
	padding: ${space[1]}px ${space[3]}px;
	border-radius: ${space[3]}px;
	color: white;
	${textSansBold12};
`;

export const MediaDuration = ({
	mediaDuration,
	imagePositionOnDesktop,
	imagePositionOnMobile,
}: {
	mediaDuration: number;
	imagePositionOnDesktop?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
}) => {
	if (imagePositionOnDesktop === 'left') {
		return null;
	}
	if (imagePositionOnMobile === 'left') {
		return (
			<Hide until="tablet">
				<div css={durationStyles}>
					<p>{secondsToDuration(mediaDuration)}</p>
				</div>
			</Hide>
		);
	}

	return (
		<div css={durationStyles}>
			<p>{secondsToDuration(mediaDuration)}</p>
		</div>
	);
};
