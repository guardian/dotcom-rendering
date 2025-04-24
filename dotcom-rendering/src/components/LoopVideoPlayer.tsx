import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { IconProps } from '@guardian/source/react-components';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { forwardRef } from 'react';
import { palette } from '../palette';
import { narrowPlayIconWidth, PlayIcon } from './Card/components/PlayIcon';
import { LoopVideoProgressBar } from './LoopVideoProgressBar';

const videoStyles = css`
	position: relative;
	width: 100%;
	height: auto;
	/* Find out why this is needed to align the video with its container. */
	margin-bottom: -3px;
	cursor: pointer;
`;

const playIconStyles = css`
	position: absolute;
	top: calc(50% - ${narrowPlayIconWidth / 2}px);
	left: calc(50% - ${narrowPlayIconWidth / 2}px);
	cursor: pointer;
	border: none;
	background: none;
	padding: 0;
`;

const audioButtonStyles = css`
	border: none;
	background: none;
	padding: 0;
	position: absolute;
	bottom: ${space[8]}px;
	right: ${space[8]}px;
	cursor: pointer;
`;

type Props = {
	src: string;
	videoId: string;
	width: number;
	height: number;
	hasAudio: boolean;
	fallbackImage: JSX.Element;
	isPlayable: boolean;
	setIsPlayable: Dispatch<SetStateAction<boolean>>;
	isPlaying: boolean;
	setIsPlaying: Dispatch<SetStateAction<boolean>>;
	currentTime: number;
	setCurrentTime: Dispatch<SetStateAction<number>>;
	isMuted: boolean;
	setIsMuted: Dispatch<SetStateAction<boolean>>;
	handleClick: (event: SyntheticEvent) => void;
	handleKeyDown: (event: React.KeyboardEvent<HTMLVideoElement>) => void;
	onError: (event: SyntheticEvent<HTMLVideoElement>) => void;
	AudioIcon: (iconProps: IconProps) => JSX.Element;
};

/**
 * Note that in React 19, forwardRef is no longer necessary:
 * https://react.dev/reference/react/forwardRef
 */
export const LoopVideoPlayer = forwardRef(
	(
		{
			src,
			videoId,
			width,
			height,
			hasAudio,
			fallbackImage,
			isPlayable,
			setIsPlayable,
			isPlaying,
			setIsPlaying,
			currentTime,
			setCurrentTime,
			isMuted,
			setIsMuted,
			handleClick,
			handleKeyDown,
			onError,
			AudioIcon,
		}: Props,
		ref: React.ForwardedRef<HTMLVideoElement>,
	) => {
		const loopVideoId = `loop-video-${videoId}`;

		return (
			<>
				{/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions will be considered later. */}
				<video
					id={loopVideoId}
					ref={ref}
					preload="none"
					loop={true}
					muted={isMuted}
					playsInline={true}
					height={height}
					width={width}
					onPlaying={() => {
						setIsPlaying(true);
					}}
					onCanPlay={() => {
						setIsPlayable(true);
					}}
					onTimeUpdate={() => {
						if (
							ref &&
							'current' in ref &&
							ref.current &&
							isPlaying
						) {
							setCurrentTime(ref.current.currentTime);
						}
					}}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					role="button"
					tabIndex={0}
					onError={onError}
					css={videoStyles}
				>
					{/* Ensure webm source is provided. Encoding the video to a webm file will improve
					performance on supported browsers. https://web.dev/articles/video-and-source-tags */}
					{/* <source src={webmSrc} type="video/webm"> */}
					<source src={src} type="video/mp4" />
					{fallbackImage}
				</video>
				{ref && 'current' in ref && ref.current && (
					<>
						{isPlayable && !isPlaying && (
							<button
								type="button"
								onClick={handleClick}
								css={playIconStyles}
							>
								<PlayIcon iconWidth="narrow" />
							</button>
						)}
						<LoopVideoProgressBar
							videoId={loopVideoId}
							currentTime={currentTime}
							duration={ref.current.duration}
						/>
						{hasAudio && (
							<button
								type="button"
								onClick={(event) => {
									event.stopPropagation(); // Don't pause the video
									setIsMuted(!isMuted);
								}}
								css={audioButtonStyles}
							>
								<AudioIcon
									size="small"
									theme={{
										fill: palette(
											'--loop-video-audio-icon',
										),
									}}
								/>
							</button>
						)}
					</>
				)}
			</>
		);
	},
);
