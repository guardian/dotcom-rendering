import { css } from '@emotion/react';
import { palette } from '../palette';

const styles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 7px;
	width: 100%;

	progress {
		display: block;
		width: 100%;
		height: 100%;
		border: none;
		-moz-border-radius: 0;
		-webkit-border-radius: 0;
		border-radius: 0;
	}

	/* background: */
	progress::-webkit-progress-bar {
		background-color: transparent;
	}
	progress {
		background-color: transparent;
	}

	/* value: */
	progress::-webkit-progress-value {
		background-color: ${palette('--loop-video-progress-bar-value')};
	}
	progress::-moz-progress-bar {
		background-color: ${palette('--loop-video-progress-bar-value')};
	}
	progress {
		color: ${palette('--loop-video-progress-bar-value')};
	}
`;

type Props = {
	currentTime: number;
	duration: number;
};

export const LoopVideoProgressBar = ({ currentTime, duration }: Props) => {
	if (duration <= 0) return null;

	const progressPercentage =
		duration > 0 ? (currentTime * 100) / duration : 0;

	return (
		<div css={styles} className="progress-bar">
			<progress value={progressPercentage / 100} />
		</div>
	);
};
