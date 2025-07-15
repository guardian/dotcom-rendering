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
	/**
	 * Don't show a transition when the progress bar returns to the start.
	 */
	transition: ${progressPercentage < 1 ? 'none' : `width 0.25s linear`};
`;

type Props = {
	videoId: string;
	currentTime: number;
	duration: number;
};

/**
 * A progress bar for the loop video component.
 *
 * Q. Why don't we use the <progress /> element?
 * A. It was not possible to properly style the native progress element in Safari.
 */
export const LoopVideoProgressBar = ({
	videoId,
	currentTime,
	duration,
}: Props) => {
	if (duration <= 0) return null;

	/**
	 * We achieve a smooth progress bar by using CSS transitions. However, this means that
	 * the time on the progress bar is roughly always about 0.25 seconds behind - the interval in
	 * which the onTimeUpdate event on video is fired. Therefore, to the user it looks like the
	 * progress bar ranges from 0s to duration - 0.25s. To make allowance for this, when calculating
	 * the progress percentage, we take 0.25s off the duration, so that the progress bar reaches
	 * closer to the end.
	 */
	const adjustedDuration = Math.max(duration - 0.25, 0.1);

	const progressPercentage = Math.min(
		(currentTime * 100) / adjustedDuration,
		100,
	);
	if (Number.isNaN(progressPercentage)) {
		return null;
	}

	const roundedProgressPercentage = Number(progressPercentage.toFixed(2));

	return (
		<div
			role="progressbar"
			aria-labelledby={videoId}
			aria-valuenow={roundedProgressPercentage}
			aria-valuemin={0}
			aria-valuemax={100}
			css={styles}
		>
			<span css={foregroundStyles(roundedProgressPercentage)} />
		</div>
	);
};
