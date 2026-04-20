import { css } from '@emotion/react';
import {
	space,
	textSans15,
	textSans17,
	textSans20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { SubtitleSize } from './SelfHostedVideoPlayer';

export type SubtitlesPosition =
	| 'top'
	| 'bottom'
	/**
	 * Subtitles are anchored to the bottom, but leave enough room for a tall progress bar
	 */
	| 'raised-bottom';

const subtitleOverlayStyles = css`
	width: 100%;
	display: flex;
	justify-content: center;
	pointer-events: none;
	position: absolute;
`;

const subtitlePositionStyles = (position: SubtitlesPosition) => css`
	${position === 'top' && `top: ${space[4]}px;`};
	${position === 'bottom' && `bottom: ${space[4]}px;`};
	${position === 'raised-bottom' && `bottom: ${space[12]}px;`};
`;

const cueBoxStyles = css`
	max-width: 71%;
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
	size,
	position,
}: {
	text: string;
	size: SubtitleSize;
	position: SubtitlesPosition;
}) => {
	return (
		<div css={[subtitleOverlayStyles, subtitlePositionStyles(position)]}>
			<div css={cueBoxStyles}>
				<div css={[cueStyles, cueTextStyles(size)]}>{text}</div>
			</div>
		</div>
	);
};
