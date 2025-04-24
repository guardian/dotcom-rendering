import { css } from '@emotion/react';
import { palette } from '../palette';

const styles = (progressPercentage: number) => css`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 7px;
	width: 100%;
	width: ${progressPercentage}%;
	transition: width 0.3s linear;
	background-color: ${palette('--loop-video-progress-bar-value')};
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
			css={styles(progressPercentage)}
		/>
	);
};
