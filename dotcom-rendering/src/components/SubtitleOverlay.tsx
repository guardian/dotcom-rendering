import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SubtitleSize } from './LoopVideoPlayer';

const subtitleOverlayStyles = css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: ${space[4]}px;
	display: flex;
	justify-content: center;
	pointer-events: none;
`;
const subtitleCueBoxStyles = (subtitleSize: SubtitleSize) => css`
	max-width: 71%;
	background-color: rgba(18, 18, 18, 0.7);
	color: ${palette('--loop-video-subtitle-text')};
	${subtitleSize === 'small' && textSans15};
	${subtitleSize === 'medium' && textSans17};
	${subtitleSize === 'large' && textSans20};
	padding: 4px;
	text-align: center;
	display: inline;
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
