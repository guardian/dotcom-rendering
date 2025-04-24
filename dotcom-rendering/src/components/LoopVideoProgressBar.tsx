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
	currentTime: number;
	duration: number;
};

export const LoopVideoProgressBar = ({ currentTime, duration }: Props) => {
	if (duration <= 0) return null;

	const progressPercentage = (currentTime * 100) / duration;
	if (Number.isNaN(progressPercentage)) {
		return null;
	}

	return <div role="progressbar" css={styles(progressPercentage)} />;
};
