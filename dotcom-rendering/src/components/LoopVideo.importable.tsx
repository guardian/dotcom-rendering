import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgAudio, SvgAudioMute } from '@guardian/source/react-components';
import { useRef, useState } from 'react';
import type { FEAspectRatio } from '../frontend/feFront';
import { useShouldAdapt } from '../lib/useShouldAdapt';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { narrowPlayIconWidth, PlayIcon } from './Card/components/PlayIcon';
import type { Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { useConfig } from './ConfigContext';

type ImageProps = {
	posterImage: string;
	altText: string;
	imageSize: ImageSizeType;
	imageLoading: Loading;
	aspectRatio?: FEAspectRatio;
};

type Props = ImageProps & {
	src: string;
};

export const LoopVideo = ({
	src,
	posterImage,
	altText,
	imageSize,
	imageLoading,
	aspectRatio,
}: Props) => {
	const adapted = useShouldAdapt();
	const { renderingTarget } = useConfig();
	const vidRef = useRef<HTMLVideoElement>(null);
	const [isPlayabale, setIsPlayabale] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	setTimeout(() => {
		if (vidRef.current) {
			setCurrentTime(vidRef.current.currentTime);
		}
	}, 50);

	if (renderingTarget !== 'Web') return null;

	if (adapted) {
		return (
			<CardPicture
				mainImage={posterImage}
				imageSize={imageSize}
				alt={altText}
				loading={imageLoading}
				aspectRatio={aspectRatio}
			/>
		);
	}

	const handleClick = () => {
		setIsPlaying(!isPlaying);
		if (isPlaying) {
			void vidRef.current?.pause();
		} else {
			void vidRef.current?.play();
		}
	};

	const seekForward = () => {
		if (vidRef.current) {
			vidRef.current.currentTime = vidRef.current.currentTime + 1;
			setCurrentTime(vidRef.current.currentTime);
		}
	};

	const seekBackward = () => {
		if (vidRef.current) {
			vidRef.current.currentTime = vidRef.current.currentTime - 1;
			setCurrentTime(vidRef.current.currentTime);
		}
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLDivElement>,
	): void => {
		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				handleClick();
				break;
			case 'ArrowRight':
				seekForward();
				break;
			case 'ArrowLeft':
				seekBackward();
				break;
		}
	};

	const progressPercentage =
		duration > 0 ? (currentTime * 100) / duration : 0;

	console.log('isPlaying', isPlaying);
	console.log('isMuted', isMuted);
	console.log('progressPercentage', progressPercentage);

	return (
		<div
			className="video-container"
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={0}
			css={css`
				z-index: 10; // TODO - Extract this
				cursor: pointer;
			`}
		>
			<div className="video-wrapper">
				{/* eslint-disable-next-line jsx-a11y/media-has-caption -- Video starts muted */}
				<video
					ref={vidRef}
					autoPlay={true}
					loop={true}
					muted={isMuted}
					playsInline={true}
					poster={posterImage}
					onPlay={() => {
						setIsPlaying(true);
					}}
					onCanPlay={() => {
						console.log('onCanPlay event called');
						setIsPlayabale(true);
					}}
					onCanPlayThrough={() => {
						console.log('onCanPlayThrough event called');
						setIsPlayabale(true);
						setDuration(vidRef.current?.duration ?? 0);
					}}
					onError={(e) => {
						console.error('Error loading video', e);
					}}
					css={[
						css`
							position: relative;
							width: 100%;
						`,
					]}
				>
					{/* TODO - Ensure webm source is provided */}
					{/* <source src={webmSrc} type="video/webm"> */}
					<source
						src={src}
						type="video/mp4"
						onError={(e) => {
							console.error('Error loading video', e);
						}}
					/>
					{/* <CardPicture
						mainImage={posterImage}
						imageSize={imageSize}
						alt={altText}
						loading={imageLoading}
						aspectRatio={aspectRatio}
					/> */}
					<p>Video not supported</p>
				</video>
			</div>
			{!isPlaying && isPlayabale && (
				<div
					css={css`
						position: absolute;
						top: calc(50% - ${narrowPlayIconWidth / 2}px);
						left: calc(50% - ${narrowPlayIconWidth / 2}px);
					`}
				>
					<PlayIcon iconWidth="narrow" />
				</div>
			)}
			<div
				className="progress-bar"
				css={css`
					position: absolute;
					bottom: 0;
					left: 0;
					height: 7px;
					width: ${progressPercentage}%;
					background-color: #d9d9d9;
				`}
			/>
			<button
				type="button"
				onClick={(event) => {
					event.stopPropagation(); // Don't pause the video
					setIsMuted(!isMuted);
				}}
				css={css`
					border: none;
					background: none;
					padding: 0;
					position: absolute;
					bottom: ${space[8]}px;
					right: ${space[8]}px;
					cursor: pointer;
				`}
			>
				{isMuted ? (
					<SvgAudioMute size="small" theme={{ fill: 'white' }} />
				) : (
					<SvgAudio size="small" theme={{ fill: 'white' }} />
				)}
			</button>
		</div>
	);
};
