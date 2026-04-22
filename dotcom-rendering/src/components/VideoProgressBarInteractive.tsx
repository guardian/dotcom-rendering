import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	textSans12,
} from '@guardian/source/foundations';
import { getZIndex } from '../lib/getZIndex';
import { formatTimeForDisplay } from '../lib/video';
import { palette } from '../palette';

const containerStyles = css`
	/* visibility: hidden; */
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	z-index: ${getZIndex('video-progress-bar-background')};
	transition: height 0.1s ease;
	cursor: pointer;
`;

const scrubbableAreaStyles = css`
	display: flex;
	align-items: center;
	position: relative;
	width: 100%;
	height: 24px;
`;

const backgroundStyles = css`
	position: relative;
	width: 100%;
	height: 5px;
	margin-left: 12px;
	margin-right: 12px;
	margin-bottom: 6px;
	background-color: ${palette('--video-progress-bar-background-default')};
	border-radius: 5px;
`;

const foregroundStyles = (progressPercentage: number) => css`
	position: absolute;
	height: 100%;
	width: ${progressPercentage}%;
	z-index: ${getZIndex('video-progress-bar-foreground')};
	background-color: ${palette('--video-progress-bar-value-default')};
	/**
	 * Don't show a transition when the progress bar returns to the start.
	 */
	transition: ${progressPercentage < 1 ? 'none' : `width 0.25s linear`};
	border-radius: 5px 0 0 5px;
`;

const knobStyles = (progressPercentage: number) => css`
	position: absolute;
	top: -4px;
	left: calc(${progressPercentage} * (100% - 10px) / 100);
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: ${palette('--video-progress-bar-value-default')};
	z-index: ${getZIndex('video-progress-bar-foreground')};
	transform: translateX(-10%);
	transition: left 0.25s linear;
`;

type Props = {
	videoId: string;
	currentTime: number;
	duration: number;
	handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
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
	handleClick,
	handleMouseUp,
	handleMouseDown,
	handleMouseMove,
}: Props) => {
	if (duration <= 0) return null;

	/**
	 * We achieve a smooth progress bar by using CSS transitions. Given that
	 * onTimeUpdate fires every 250ms or so, this means that the time on the
	 * progress bar is always about 0.25s behind and begins 0.25s late.
	 * Therefore, when calculating the progress percentage, we take 0.25s off the duration.
	 *
	 * Videos less than a second in duration will have no adjustment.
	 */
	const adjustedDuration = duration > 1 ? duration - 0.25 : duration;

	const progressPercentage = Math.min(
		(currentTime * 100) / adjustedDuration,
		100,
	);
	if (Number.isNaN(progressPercentage)) {
		return null;
	}

	const roundedProgressPercentage = Number(progressPercentage.toFixed(2));

	return (
		<div css={containerStyles}>
			<Time current={currentTime} duration={duration} />
			<div
				css={scrubbableAreaStyles}
				className={`progress-bar-${videoId}`}
				onClick={handleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onKeyDown={() => {}}
				role="progressbar"
				aria-labelledby={videoId}
				aria-valuenow={roundedProgressPercentage}
				aria-valuemin={0}
				aria-valuemax={100}
				tabIndex={0}
			>
				<div
					className={`progress-bar-background-${videoId}`}
					css={backgroundStyles}
				>
					<span
						className={`progress-bar-foreground-${videoId}`}
						css={foregroundStyles(progressPercentage)}
					/>
					<span
						css={knobStyles(progressPercentage)}
						aria-hidden="true"
					/>
				</div>
			</div>
		</div>
	);
};

const timeStyles = css`
	${textSans12};
	color: ${sourcePalette.neutral[100]};
	margin-left: 1px; /* To make it _feel_ more aligned with the progress bar, which has a border radius. */
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
