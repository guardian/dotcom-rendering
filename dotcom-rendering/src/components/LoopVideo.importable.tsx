import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import { SvgAudio, SvgAudioMute } from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { useIsInView } from '../lib/useIsInView';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import { useConfig } from './ConfigContext';
import { LoopVideoPlayer } from './LoopVideoPlayer';

const videoContainerStyles = (height: number, width: number) => css`
	z-index: ${getZIndex('loop-video-container')};
	position: relative;
	height: ${height}px;
	width: ${width}px;
`;

type Props = {
	src: string;
	videoId: string;
	width?: number;
	height?: number;
	hasAudio?: boolean;
	fallbackImage: JSX.Element;
	posterImage?: string;
};

export const LoopVideo = ({
	src,
	videoId,
	width = 600,
	height = 360,
	hasAudio = true,
	fallbackImage,
	posterImage,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayable, setIsPlayable] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [currentTime, setCurrentTime] = useState(0);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	/**
	 * Keep a track of whether the video has been in view. We only want to
	 * pause the video if it has been in view.
	 */
	const [hasBeenInView, setHasBeenInView] = useState(false);

	const [isInView, setNode] = useIsInView({
		repeat: true,
		threshold: 0.5,
	});

	/**
	 * Pause the video when the user scrolls past it.
	 */
	useEffect(() => {
		if (!vidRef.current) return;

		if (isInView) {
			if (!hasBeenInView) {
				if (
					window.matchMedia('(prefers-reduced-motion: reduce)')
						.matches
				) {
					setPrefersReducedMotion(true);
					return;
				}
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

	if (renderingTarget !== 'Web') return null;

	if (adapted) return fallbackImage;

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
			setCurrentTime(newTime);
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
			setCurrentTime(newTime);
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLVideoElement>,
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
			css={videoContainerStyles(height, width)}
		>
			<LoopVideoPlayer
				src={src}
				videoId={videoId}
				width={width}
				height={height}
				hasAudio={hasAudio}
				fallbackImage={fallbackImage}
				currentTime={currentTime}
				setCurrentTime={setCurrentTime}
				ref={vidRef}
				isPlayable={isPlayable}
				setIsPlayable={setIsPlayable}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				isMuted={isMuted}
				setIsMuted={setIsMuted}
				handleClick={handleClick}
				handleKeyDown={handleKeyDown}
				onError={onError}
				AudioIcon={AudioIcon}
				posterImage={prefersReducedMotion ? posterImage : undefined}
			/>
		</div>
	);
};
