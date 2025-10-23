import { css } from '@emotion/react';
import {
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SubtitleSize } from './LoopVideoPlayer';

const subtitleOverlayStyles = css`
	max-width: 71%;
	pointer-events: none;
	position: absolute;
	bottom: 16px;
	left: 50%;
	transform: translateX(-50%);
`;

const cueBoxStyles = css`
	width: 100%;
	margin: 0 auto;
	text-align: center;
	pointer-events: none;
`;

const cueStyles = css`
	color: ${palette('--loop-video-subtitle-text')};
	display: inline;
	background-color: rgba(18, 18, 18, 0.7);
	-webkit-box-decoration-break: clone;
	box-decoration-break: clone;
	pointer-events: none;
	padding: 3px 4px 3px;
`;

const cueTextStyles = (subtitleSize: SubtitleSize) => {
	const sizeStyles = {
		small: css`
			${textSans15};
			line-height: 24px;
		`,
		medium: css`
			${textSans17};
			line-height: 26px;
		`,
		large: css`
			${textSans20};
			line-height: 30px;
		`,
	};

	return sizeStyles[subtitleSize];
};

export const SubtitleOverlay = ({
	text,
	subtitleSize,
}: {
	text: string;
	subtitleSize: SubtitleSize;
}) => {
	return (
		<div css={subtitleOverlayStyles}>
			<div css={cueBoxStyles}>
				<div css={[cueStyles, cueTextStyles(subtitleSize)]}>{text}</div>
			</div>
		</div>
	);
};
