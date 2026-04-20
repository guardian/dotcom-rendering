import { css } from '@emotion/react';
import {
	focusHalo,
	palette as sourcePalette,
	textSans12,
} from '@guardian/source/foundations';
import { getZIndex } from '../lib/getZIndex';
import {
	convertCurrentTimeToProgressPercentage,
	convertProgressPercentageToCurrentTime,
} from '../lib/video';
import { palette } from '../palette';

const containerStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 44px;
	width: 100%;
	z-index: ${getZIndex('video-progress-bar-background')};
	cursor: pointer;
	padding: 0 12px;
	background: linear-gradient(
		to top,
		${sourcePalette.neutral[0]} 0%,
		transparent 100%
	);
`;

const trackStyles = css`
	-webkit-appearance: none;
	appearance: none;
	height: 5px;
	border-radius: 5px;
`;

const thumbStyles = css`
	-webkit-appearance: none;
	appearance: none;
	width: 14px;
	height: 14px;
	border: none;
	border-radius: 50%;
	background-color: ${palette('--video-progress-bar-interactive-value')};
	z-index: ${getZIndex('video-progress-bar-foreground')};
	cursor: pointer;
`;

const progressBarStyles = (roundedProgressPercentage: number) => css`
	width: 100%;
	cursor: pointer;
	height: 5px;
	border-radius: 5px;
	-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
	appearance: none;
	/* The colour to the left of the thumb is different to the right to indicate progress */
	background: ${`linear-gradient(
		to right,
		${palette('--video-progress-bar-interactive-value')} 0%,
		${palette(
			'--video-progress-bar-interactive-value',
		)} ${roundedProgressPercentage}%,
		${palette(
			'--video-progress-bar-interactive-background',
		)} ${roundedProgressPercentage}%,
		${palette('--video-progress-bar-interactive-background')} 100%
	)`};

	/* We don't use the default focus ring as it includes the thumb, which looks odd. */
	:focus-visible {
		${focusHalo}
	}

	/** Extend the clickable area of the progress bar (only works on Chrome) */
	::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 36px;
	}

	::-webkit-slider-runnable-track {
		${trackStyles}
	}
	::-moz-range-track {
		${trackStyles}
	}
	::-ms-track {
		${trackStyles}
		width: 100%;
	}

	::-webkit-slider-thumb {
		-webkit-appearance: none;
		margin-top: -5px;
		${thumbStyles}
	}
	::-moz-range-thumb {
		${thumbStyles}
	}
	::-ms-thumb {
		${thumbStyles}
	}
`;

const handleChange = (
	value: string,
	duration: Props['duration'],
	updateCurrentTime: Props['updateCurrentTime'],
) => {
	const percentage = Number(value);
	const time = convertProgressPercentageToCurrentTime(percentage, duration);

	if (time === null) return;

	updateCurrentTime(time);
};

type Props = {
	videoId: string;
	currentTime: number;
	updateCurrentTime: (time: number) => void;
	handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	duration: number;
};

/**
 * A progress bar for the self-hosted video component.
 *
 * Q. Why don't we use the <progress /> element?
 * A. It was not possible to properly style the native progress element in Safari.
 */
export const VideoProgressBarInteractive = ({
	videoId,
	currentTime,
	updateCurrentTime,
	handleKeyDown,
	duration,
}: Props) => {
	if (duration <= 0) return null;

	const progressPercentage = convertCurrentTimeToProgressPercentage(
		currentTime,
		duration,
	);
	if (progressPercentage === null) {
		return null;
	}

	const roundedProgressPercentage = Number(progressPercentage.toFixed(2));

	return (
		<div css={containerStyles}>
			<Time current={currentTime} duration={duration} />
			<input
				type="range"
				value={roundedProgressPercentage}
				css={progressBarStyles(roundedProgressPercentage)}
				className={`progress-bar-${videoId}`}
				role="progressbar"
				aria-labelledby={videoId}
				min={0}
				max={100}
				step={0.01}
				tabIndex={0}
				onChange={(event) =>
					handleChange(
						event.target.value,
						duration,
						updateCurrentTime,
					)
				}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
};

const timeStyles = css`
	${textSans12};
	color: ${sourcePalette.neutral[100]};
	margin-left: 1px; /* To make it _feel_ more aligned with the progress bar, which has a border radius. */
`;

const formatTime = (timeInSeconds: number) => {
	const clampedTimeInSeconds = Math.max(0, timeInSeconds);

	const minutes = Math.floor(clampedTimeInSeconds / 60);
	const seconds = Math.floor(clampedTimeInSeconds % 60);

	if (isNaN(minutes) || isNaN(seconds)) {
		return null;
	}

	return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const Time = ({ current, duration }: { current: number; duration: number }) => {
	const right = formatTime(duration);
	const left = formatTime(Math.min(current, duration));

	if (right === null || left === null) {
		return null;
	}

	return (
		<time css={timeStyles}>
			{left} / {right}
		</time>
	);
};
