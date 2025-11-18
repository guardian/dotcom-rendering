import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SubtitleSize } from './SelfHostedVideoPlayer';

const subtitleOverlayStyles = css`
	max-width: 71%;
	pointer-events: none;
	position: absolute;
	bottom: ${space[4]}px;
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
	color: ${palette('--video-subtitle-text')};
	display: inline;
	background-color: ${palette('--video-subtitle-background')};
	-webkit-box-decoration-break: clone;
	box-decoration-break: clone;
	pointer-events: none;
	padding: 3px ${space[1]}px 3px;
`;

const cueTextStyles = (subtitleSize: SubtitleSize) => {
	const sizeStyles = {
		small: css`
			${textSans15};
			line-height: ${space[6]}px;
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
