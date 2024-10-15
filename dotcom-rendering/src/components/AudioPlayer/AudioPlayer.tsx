import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { from, palette, textSans15 } from '@guardian/source/foundations';
import {
	SvgAudio,
	SvgAudioMute,
	SvgMediaControlsBack,
	SvgMediaControlsForward,
	SvgMediaControlsPause,
	SvgMediaControlsPlay,
} from '@guardian/source/react-components';
import { forwardRef, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { formatTime } from '../../lib/formatTime';

// default base styling for all buttons
const buttonBaseCss = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: none;
	border: 0;
	margin: 0;
	padding: 0;

	:focus {
		outline: none;
	}

	:not(:disabled):hover {
		opacity: 0.8;
		cursor: pointer;
	}
`;

// ****************** Wrapper/grid etc ******************

const Wrapper = ({
	showVolumeControls,
	...props
}: { showVolumeControls: boolean } & React.ComponentPropsWithoutRef<'div'>) => (
	<div
		css={css`
			position: relative;
			background-color: ${palette.neutral[7]};

			/* define the grid for the component */
			display: grid;
			grid-template-rows: ${showVolumeControls
				? '30px 40px 120px 40px'
				: '30px 40px 120px'};
			grid-template-areas:
				'current-time duration'
				'progress-bar progress-bar'
				'controls     controls'
				'. volume';

			${from.leftCol} {
				grid-template-columns: 90px 1fr 90px;
				grid-template-rows: 50px 110px;
				grid-template-areas:
					'current-time progress-bar duration'
					'controls     controls     controls';
			}
		`}
		{...props}
	/>
);

// ****************** Time Display ******************

const timeCSS = css`
	padding-top: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	${textSans15};
	color: ${palette.neutral[86]};
	background-color: ${palette.neutral[20]};
	z-index: 1;

	${from.leftCol} {
		padding-top: 0;
	}
`;

const CurrentTime = ({ time }: { time: number }) => (
	<time
		aria-label="current time"
		css={[
			timeCSS,
			css`
				grid-area: current-time;
				justify-content: flex-start;
				padding-left: 10px;
			`,
		]}
	>
		{formatTime(time)}
	</time>
);

const Duration = ({ time }: { time: number }) => (
	<time
		aria-label="duration"
		css={[
			timeCSS,
			css`
				grid-area: duration;
				justify-content: flex-end;
				padding-right: 10px;
			`,
		]}
	>
		{isNaN(time) ? null : formatTime(time)}
	</time>
);

// ****************** Progress bar/waveform ******************

const WaveForm = forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'> & { progress: number }
>(({ progress, ...props }, ref) => (
	<div
		css={css`
			grid-area: progress-bar;
			background-color: ${palette.neutral[20]};
			border-top: 1px solid ${palette.neutral[46]};
			padding: 0 10px;
			transform: translateX(${-100 + progress}%);

			${from.leftCol} {
				border-top: none;
				padding: 0;
				background-color: ${palette.neutral[38]};
			}

			/* give the progress-bar wrapper a defined height */
			div {
				height: 100%;
			}

			/* remove default rounded corners of the scrubbing control */
			& ::part(cursor) {
				border-radius: 0;
			}
		`}
		{...props}
		ref={ref}
	/>
));

// ****************** Playback Controls ******************

const PlayButton = ({
	isReady,
	...props
}: { isReady: boolean } & React.ComponentPropsWithoutRef<'button'>) => {
	return (
		<button
			type="button"
			disabled={!isReady}
			css={[
				buttonBaseCss,
				css`
					margin: 0 50px;
					width: 70px;
					height: 70px;
					background-color: ${isReady
						? palette.brandAlt[400]
						: palette.neutral[46]};
					border-radius: 50%;

					${from.leftCol} {
						margin: 0 60px;
						width: 60px;
						height: 60px;
					}

					svg {
						width: 60px;
					}
				`,
			]}
			{...props}
		/>
	);
};

const SkipButton = (props: React.ComponentPropsWithoutRef<'button'>) => {
	return (
		<button
			type="button"
			css={[
				buttonBaseCss,
				css`
					svg {
						width: 31px;
						height: 30px;
					}
				`,
			]}
			{...props}
		/>
	);
};

const PlaybackControls = (props: React.ComponentPropsWithoutRef<'div'>) => (
	<div
		css={css`
			grid-area: controls;
			display: flex;
			align-items: center;
			justify-content: center;
		`}
		{...props}
	/>
);

// ****************** Volume Controls ******************

const VolumeButton = ({
	isReady,
	...props
}: { isReady: boolean } & React.ComponentPropsWithoutRef<'button'>) => {
	return (
		<button
			type="button"
			disabled={!isReady}
			css={[
				buttonBaseCss,
				css`
					width: 38px;

					svg {
						height: 30px;
					}
				`,
			]}
			{...props}
		/>
	);
};

const VolumeControls = (props: React.ComponentPropsWithoutRef<'div'>) => (
	<div
		css={css`
			grid-area: volume;
			display: flex;
			align-items: stretch;
			justify-content: flex-end;

			span {
				display: inline-flex;
				align-items: center;
				padding-left: 5px;
				padding-right: 5px;
			}

			span + span {
				border-left: 1px solid ${palette.neutral[46]};
			}

			${from.leftCol} {
				position: absolute;
				bottom: 0;
				right: 0;
				height: 40px;
			}

			button + button {
				border-left: 1px solid ${palette.neutral[46]};
			}
		`}
		{...props}
	/>
);

type AudioPlayerProps = {
	/** The audio source you want to play. */
	src: string;
	/**
	 * Optional, pre-computed duration of the audio source.
	 * If it's not provided it will be calculated once the audio is loaded.
	 */
	duration?: string;
	/**
	 * Optionally hide the volume controls if setting the volume is better
	 * handled elsewhere, e.g on a mobile device.
	 */
	showVolumeControls?: boolean;
	mediaId?: string;
};

/**
 * Audio player component.
 */
export const AudioPlayer = ({
	src,
	duration: preComputedDuration,
	showVolumeControls = true,
	mediaId,
}: AudioPlayerProps) => {
	const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();
	const [progress, setProgress] = useState(0);
	const [isReady, setIsReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState<number>(
		parseInt(preComputedDuration ?? '', 10),
	);
	const audioRef = useRef<HTMLAudioElement>(null);
	const waveformRef = useRef<HTMLDivElement>(null);

	const playPause = () => {
		void wavesurfer?.playPause();
	};

	const skipForward = () => {
		wavesurfer?.skip(15);
	};

	const skipBackward = () => {
		wavesurfer?.skip(-15);
	};

	const mute = () => {
		wavesurfer?.setVolume(0);
		setIsMuted(true);
	};

	const unMute = () => {
		wavesurfer?.setVolume(1);
		setIsMuted(false);
	};

	useEffect(() => {
		if (
			isUndefined(wavesurfer) &&
			waveformRef.current &&
			audioRef.current
		) {
			const ws = WaveSurfer.create({
				container: waveformRef.current,
				height: 'auto',
				fillParent: true,
				waveColor: palette.neutral[46],
				progressColor: palette.neutral[100],
				cursorColor: palette.brandAlt[400],
				cursorWidth: 4,
				barWidth: 2,
				barGap: 1,
				barRadius: 0,
				normalize: true,
				barAlign: 'bottom',
				dragToSeek: true,
				media: audioRef.current,
				duration: isNaN(duration) ? undefined : duration,
			});

			ws.on('loading', (percent) => {
				setProgress(percent);
			});

			ws.on('ready', (srcDuration) => {
				setIsReady(true);
				if (isNaN(duration)) setDuration(srcDuration);
			});
			ws.on('play', () => setIsPlaying(true));
			ws.on('pause', () => setIsPlaying(false));
			ws.on('timeupdate', (newTime) => setCurrentTime(newTime));
			ws.on('error', (error) => console.error(error));

			setWavesurfer(ws);
		}
	}, [duration, src, wavesurfer]);

	return (
		<Wrapper showVolumeControls={showVolumeControls}>
			<audio
				src={src}
				ref={audioRef}
				autoPlay={false}
				data-media-id={mediaId}
			>
				<track kind="captions" />
			</audio>

			<CurrentTime time={currentTime} />
			<Duration time={duration} />

			<WaveForm ref={waveformRef} progress={progress} />

			<PlaybackControls>
				<SkipButton
					aria-label="skip backwards by 15 seconds"
					onClick={skipBackward}
					disabled={!isPlaying}
				>
					<SvgMediaControlsBack
						theme={{
							fill: isPlaying
								? palette.neutral[100]
								: palette.neutral[46],
						}}
					/>
				</SkipButton>
				<PlayButton
					aria-label={isPlaying ? 'pause' : 'play'}
					onClick={playPause}
					isReady={isReady}
				>
					{isPlaying ? (
						<SvgMediaControlsPause
							theme={{ fill: palette.neutral[7] }}
						/>
					) : (
						<SvgMediaControlsPlay
							theme={{ fill: palette.neutral[7] }}
						/>
					)}
				</PlayButton>
				<SkipButton
					aria-label="skip forwards by 15 seconds"
					onClick={skipForward}
					disabled={!isPlaying}
				>
					<SvgMediaControlsForward
						theme={{
							fill: isPlaying
								? palette.neutral[100]
								: palette.neutral[46],
						}}
					/>
				</SkipButton>
			</PlaybackControls>

			<VolumeControls>
				<VolumeButton
					onClick={unMute}
					isReady={isReady}
					aria-label="un-mute"
				>
					<SvgAudio
						theme={{
							fill:
								isReady && !isMuted
									? palette.brandAlt[400]
									: palette.neutral[46],
						}}
					/>
				</VolumeButton>
				<VolumeButton
					onClick={mute}
					isReady={isReady}
					aria-label="mute"
				>
					<SvgAudioMute
						theme={{
							fill:
								isReady && isMuted
									? palette.brandAlt[400]
									: palette.neutral[46],
						}}
					/>
				</VolumeButton>
			</VolumeControls>
		</Wrapper>
	);
};
