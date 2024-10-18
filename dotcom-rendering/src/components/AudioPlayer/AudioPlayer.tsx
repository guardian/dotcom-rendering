import { log } from '@guardian/libs';
import type { AudioEvent } from '@guardian/ophan-tracker-js';
import { useCallback, useEffect, useRef, useState } from 'react';
// import { submitComponentEvent } from '../../client/ophan/ophan';
import { Playback } from './components/Playback';
import { ProgressBar } from './components/ProgressBar';
import { CurrentTime, Duration } from './components/time';
import { Volume } from './components/Volume';
import { Wrapper } from './components/Wrapper';

type AudioPlayerProps = {
	/** The audio source you want to play. */
	src: string;
	/**
	 * Optional, pre-computed duration of the audio source.
	 * If it's not provided it will be calculated once the audio is loaded.
	 */
	duration?: number;
	/**
	 * Optionally hide the volume controls if setting the volume is better
	 * handled elsewhere, e.g on a mobile device.
	 */
	showVolumeControls?: boolean;
	/** media element ID for Ophan */
	mediaId: string;
};

/**
 * Audio player component.
 */
export const AudioPlayer = ({
	src,
	duration: preCalculatedDuration,
	showVolumeControls = true,
	mediaId,
}: AudioPlayerProps) => {
	// ********************* ophan stuff *********************

	// we'll send listening progress reports to ophan at these percentage points
	// through playback (100% is handled by the 'ended' event)
	const ophanProgressEvents = useRef(new Set([25, 50, 75]));

	// wrapper to send audio events to ophan
	const sendToOphan = useCallback(
		(eventName: string) => {
			const ophanEvent: AudioEvent = {
				id: mediaId,
				eventType: `audio:content:${eventName}`,
			};

			console.log(ophanEvent);

			// return submitComponentEvent(ophanEvent, 'dotcom-rendering');
		},
		[mediaId],
	);

	// ********************* player *********************

	// state for displaying feedback to the user
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(preCalculatedDuration);
	const [progress, setProgress] = useState(0);
	const [isWaiting, setIsWaiting] = useState(false);

	// ref to the <audio /> element that handles playback
	const audioRef = useRef<HTMLAudioElement>(null);

	// ********************* interactions *********************

	const playPause = useCallback(() => {
		if (audioRef.current) {
			if (audioRef.current.paused) {
				void audioRef.current.play().catch((error) => {
					console.log(error);
				});
			} else {
				audioRef.current.pause();
				setIsWaiting(false);
			}
		}
	}, []);

	const skipForward = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = Math.min(
				audioRef.current.currentTime + 15,
				audioRef.current.duration,
			);
		}
	}, []);

	const skipBackward = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.currentTime = Math.max(
				audioRef.current.currentTime - 15,
				0,
			);
		}
	}, []);

	const skipToPoint = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (audioRef.current) {
				const { width, left } =
					event.currentTarget.getBoundingClientRect();
				const clickX = event.clientX - left;
				const newTime = (clickX / width) * audioRef.current.duration;
				audioRef.current.currentTime = newTime;
			}
		},
		[],
	);

	const mute = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0;
			setIsMuted(true);
		}
	}, []);

	const unMute = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.volume = 1;
			setIsMuted(false);
		}
	}, []);

	// ******************** events *********************

	const onWaiting = useCallback(() => {
		setIsWaiting(true);
	}, []);

	const onCanPlay = useCallback(() => {
		setIsWaiting(false);
	}, []);

	const onTimeupdate = useCallback(() => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);

			const newProgress =
				(audioRef.current.currentTime / audioRef.current.duration) *
				100;
			setProgress(newProgress);

			// Send progress events to ophan,
			// but only if the audio is playing. We don't want to send these events
			// just because you skipped around the audio while paused.
			if (isPlaying) {
				for (const stage of ophanProgressEvents.current) {
					if (newProgress >= stage) {
						ophanProgressEvents.current.delete(stage);
						sendToOphan(String(stage));
					}
				}
			}
		}
	}, [isPlaying, sendToOphan]);

	const onPlay = useCallback(() => {
		setIsPlaying(true);
	}, []);

	const onPlayOnce = useCallback(() => {
		sendToOphan('play');
	}, [sendToOphan]);

	const onPause = useCallback(() => {
		setIsPlaying(false);
	}, []);

	const onEnded = useCallback(() => {
		sendToOphan('end');
	}, [sendToOphan]);

	const onError = useCallback((event: Event) => {
		window.guardian.modules.sentry.reportError(
			new Error(event.type),
			'audio-player',
		);
		log('dotcom', 'Audio player (WaveSurfer) error:', event);
	}, []);

	// Set the duration to what we now *know* it is.
	// If we already had the correct duration, this will be a no-op anyway.
	const onDurationChange = useCallback(() => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		audio?.addEventListener('waiting', onWaiting);
		audio?.addEventListener('canplay', onCanPlay);
		audio?.addEventListener('timeupdate', onTimeupdate);
		audio?.addEventListener('durationchange', onDurationChange);
		audio?.addEventListener('play', onPlay);
		audio?.addEventListener('play', onPlayOnce, { once: true });
		audio?.addEventListener('pause', onPause);
		audio?.addEventListener('ended', onEnded);
		audio?.addEventListener('error', onError);

		return () => {
			audio?.removeEventListener('waiting', onWaiting);
			audio?.removeEventListener('canplay', onCanPlay);
			audio?.removeEventListener('timeupdate', onTimeupdate);
			audio?.removeEventListener('durationchange', onDurationChange);
			audio?.removeEventListener('play', onPlay);
			audio?.removeEventListener('play', onPlayOnce);
			audio?.removeEventListener('pause', onPause);
			audio?.removeEventListener('ended', onEnded);
			audio?.removeEventListener('error', onError);
		};
	}, [
		onTimeupdate,
		onDurationChange,
		onPlay,
		onPause,
		onEnded,
		onPlayOnce,
		onError,
		onWaiting,
		onCanPlay,
	]);

	return (
		<Wrapper showVolumeControls={showVolumeControls}>
			<audio
				src={src}
				ref={audioRef}
				autoPlay={false}
				data-media-id={mediaId}
				controls={true}
				preload="none"
			>
				<track kind="captions" />
			</audio>

			<CurrentTime currentTime={currentTime} />
			<Duration duration={duration} />

			<ProgressBar progress={progress} onClick={skipToPoint} />

			<Playback>
				<Playback.SkipBack
					onClick={skipBackward}
					disabled={isWaiting || !isPlaying}
				/>
				<Playback.Play
					isWaiting={isWaiting}
					isPlaying={isPlaying}
					aria-label={isPlaying ? 'pause' : 'play'}
					onClick={playPause}
				/>
				<Playback.SkipForward
					onClick={skipForward}
					disabled={isWaiting || !isPlaying}
				/>
			</Playback>

			<Volume>
				<Volume.UnMute onClick={unMute} isMuted={isMuted} />
				<Volume.Mute onClick={mute} isMuted={isMuted} />
			</Volume>
		</Wrapper>
	);
};
