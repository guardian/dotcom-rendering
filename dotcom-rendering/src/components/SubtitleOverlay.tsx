import { css } from '@emotion/react';
import {
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SubtitleSize } from './LoopVideoPlayer';

const subtitleOverlayStyles = css`
	position: absolute;
	bottom: 16px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	width: fit-content;
	max-width: 71%;
	line-height: 1.9;
`;

const subtitleCueBoxStyles = (subtitleSize: SubtitleSize) => css`
	background-color: rgba(18, 18, 18, 0.7);
	color: ${palette('--loop-video-subtitle-text')};
	${subtitleSize === 'small' && textSans15};
	${subtitleSize === 'medium' && textSans17};
	${subtitleSize === 'large' && textSans20};
	display: inline;
	text-align: center;
	padding: 4px 4px 6px 4px;
	box-decoration-break: clone;
	-webkit-box-decoration-break: clone;
`;

export const SubtitleOverlay = ({
	text,
	subtitleSize,
}: {
	text: string;
	subtitleSize: SubtitleSize;
}) => {
	return (
		<div css={subtitleOverlayStyles}>
			<div css={subtitleCueBoxStyles(subtitleSize)}>{text}</div>
		</div>
	);
};
