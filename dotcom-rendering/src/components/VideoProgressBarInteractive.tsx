import { css } from '@emotion/react';
import {
	focusHalo,
	palette as sourcePalette,
	textSans12,
} from '@guardian/source/foundations';
import { getZIndex } from '../lib/getZIndex';
import {
	convertCurrentTimeToProgressPercentage,
	formatTimeForDisplay,
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
	-webkit-tap-highlight-color: transparent;
`;

const backgroundStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	height: 52px;
	width: 100%;
	z-index: -1;
	background: linear-gradient(
		to top,
		${sourcePalette.neutral[0]} 0%,
		rgba(0, 0, 0, 0.7) 50%,
		transparent 100%
	);
`;

const trackStyles = css`
	-webkit-appearance: none;
	appearance: none;
	height: 5px;
`;

const thumbStyles = css`
	-webkit-appearance: none;
	appearance: none;
	pointer-events: auto;
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
	height: 5px;
	margin: 0;
	cursor: pointer;
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

	/**
	 * Prevent touches on the progress bar on touch devices from changing the time.
	 * Only the thumb can be used to change the time on touch devices.
	 */
	pointer-events: none;
	@media (hover: hover) {
		pointer-events: auto;
	}

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

type Props = {
	videoId: string;
	currentTime: number;
	duration: number;
	handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	handleInput: (event: React.FormEvent<HTMLInputElement>) => void;
	onSeekStart: () => void;
	onSeekEnd: () => void;
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
	duration,
	handleKeyDown,
	handleInput,
	onSeekStart,
	onSeekEnd,
}: Props) => {
	if (duration <= 0) {
		return null;
	}

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
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				onPointerDown={onSeekStart}
				onPointerUp={onSeekEnd}
				onPointerCancel={onSeekEnd}
				onBlur={onSeekEnd}
			/>
			<div css={backgroundStyles} />
		</div>
	);
};

const timeStyles = css`
	${textSans12};
	color: ${sourcePalette.neutral[100]};
`;

const Time = ({ current, duration }: { current: number; duration: number }) => {
	const right = formatTimeForDisplay(duration);
	const left = formatTimeForDisplay(Math.min(current, duration));

	return (
		<time css={timeStyles}>
			{left} / {right}
		</time>
	);
};
