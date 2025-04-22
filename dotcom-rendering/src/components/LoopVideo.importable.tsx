import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { SvgAudio, SvgAudioMute } from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useIsInView } from '../lib/useIsInView';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import { palette } from '../palette';
import { narrowPlayIconWidth, PlayIcon } from './Card/components/PlayIcon';
import { useConfig } from './ConfigContext';
import { LoopVideoProgressBar } from './LoopVideoProgressBar';

const videoContainerStyles = css`
	z-index: ${getZIndex('loop-video-container')};
	cursor: pointer;
	position: relative;
`;

const videoStyles = css`
	position: relative;
	width: 100%;
	height: auto;
	/* Find out why this is needed to align the video with its container. */
	margin-bottom: -3px;
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
	videoId?: string;
	width?: number;
	height?: number;
	hasAudio?: boolean;
	fallbackImage: JSX.Element;
};

export const LoopVideo = ({
	src,
	videoId,
	width = 600,
	height = 360,
	hasAudio = true,
	fallbackImage,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [elapsedTime, setElapsedTime] = useState(0);
	/**
	 * Keep a track of whether the video has been in view. We only want to
	 * pause the video if it has been in view.
	 */
	const [hasBeenInView, setHasBeenInView] = useState(false);

	const [isInView, setNode] = useIsInView({
		repeat: true,
		threshold: 0.5,
		node: vidRef.current ?? undefined,
		debounce: true,
	});

	/**
	 * Pause the video when the user scrolls past it.
	 */
	useEffect(() => {
		if (!vidRef.current) return;

		if (isInView) {
			if (!hasBeenInView) {
				// When the video first comes into view, it should autoplay
				setIsPlaying(true);
				void vidRef.current.play();
			}
			setHasBeenInView(true);
		}

		if (!isInView && hasBeenInView && isPlayable && isPlaying) {
			setIsPlaying(false);
			void vidRef.current.pause();
		}
	}, [isInView, hasBeenInView, isPlayable, isPlaying]);

	/**
	 * Progress bar updates
	 */
	useEffect(() => {
		const interval = setInterval(() => {
			setElapsedTime(vidRef.current?.currentTime ?? 0);
		}, 40);

		return () => clearInterval(interval);
	}, []);

	if (renderingTarget !== 'Web') return null;

	if (adapted) {
		return fallbackImage;
	}

	const handleClick = (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (!vidRef.current) return;

		if (isPlaying) {
			setIsPlaying(false);
			void vidRef.current.pause();
		} else {
			setIsPlaying(true);
			void vidRef.current.play();
		}
	};

	const onError = () => {
		window.guardian.modules.sentry.reportError(
			new Error(`Loop video could not be played. source: ${src}`),
			'loop-video',
		);
		log('dotcom', `Loop video could not be played. source: ${src}`);
	};

	const seekForward = () => {
		if (vidRef.current) {
			const newTime = Math.min(
				vidRef.current.currentTime + 1,
				vidRef.current.duration,
			);

			vidRef.current.currentTime = newTime;
			setElapsedTime(newTime);
		}
	};

	const seekBackward = () => {
		if (vidRef.current) {
			// Allow the user to cycle to the end of the video using the arrow keys
			const newTime =
				(((vidRef.current.currentTime - 1) % vidRef.current.duration) +
					vidRef.current.duration) %
				vidRef.current.duration;

			vidRef.current.currentTime = newTime;
			setElapsedTime(newTime);
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLDivElement>,
	): void => {
		switch (event.key) {
			case 'Enter':
			case ' ':
				handleClick(event);
				break;
			case 'ArrowRight':
				seekForward();
				break;
			case 'ArrowLeft':
				seekBackward();
				break;
		}
	};

	const AudioIcon = isMuted ? SvgAudioMute : SvgAudio;

	return (
		<div
			className="loop-video-container"
			ref={setNode}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			css={videoContainerStyles}
		>
			{/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions will be considered later. */}
			<video
				id={`loop-video-${videoId}`}
				ref={vidRef}
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
				onError={onError}
				css={videoStyles}
			>
				{/* Ensure webm source is provided */}
				{/* <source src={webmSrc} type="video/webm"> */}
				<source src={src} type="video/mp4" />
				{fallbackImage}
			</video>
			{vidRef.current && (
				<>
					{isPlayable && !isPlaying && (
						<div css={playIconStyles}>
							<PlayIcon iconWidth="narrow" />
						</div>
					)}
					<LoopVideoProgressBar
						currentTime={elapsedTime}
						duration={vidRef.current.duration}
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
									fill: palette('--loop-video-audio-icon'),
								}}
							/>
						</button>
					)}
				</>
			)}
		</div>
	);
};
