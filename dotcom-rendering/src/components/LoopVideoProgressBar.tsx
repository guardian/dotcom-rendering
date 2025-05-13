import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';

const styles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 4px;
	width: 100%;
	z-index: ${getZIndex('loop-video-progress-bar-background')};
	background-color: ${palette('--loop-video-progress-bar-background')};
`;

const foregroundStyles = (progressPercentage: number) => css`
	position: absolute;
	height: 100%;
	width: ${progressPercentage}%;
	z-index: ${getZIndex('loop-video-progress-bar-foreground')};
	background-color: ${palette('--loop-video-progress-bar-value')};
	transition: width 0.3s linear;
`;

type Props = {
	videoId: string;
	currentTime: number;
	duration: number;
};

/**
 * A progress bar for the loop video component.
 *
 * Why don't we use the <progress /> element?
 * It was not possible to properly style the native progress element in safari.
 */
export const LoopVideoProgressBar = ({
	videoId,
	currentTime,
	duration,
}: Props) => {
	if (duration <= 0) return null;

	const progressPercentage = (currentTime * 100) / duration;
	if (Number.isNaN(progressPercentage)) {
		return null;
	}

	return (
		<div
			role="progressbar"
			aria-labelledby={videoId}
			aria-valuenow={progressPercentage}
			aria-valuemin={0}
			aria-valuemax={100}
			css={styles}
		>
			<span css={foregroundStyles(progressPercentage)} />
		</div>
	);
};
