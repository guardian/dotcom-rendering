import { log } from '@guardian/libs';
import type { AudioEvent, TAudioEventType } from '@guardian/ophan-tracker-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getOphan } from '../../client/ophan/ophan';
import { Playback } from './components/Playback';
import { ProgressBar } from './components/ProgressBar';
import { CurrentTime, Duration } from './components/time';
import { Volume } from './components/Volume';
import { Wrapper } from './components/Wrapper';

// ********************* ophan stuff *********************

// possible events for audio in ophan
type AudioEvents = TAudioEventType extends `audio:content:${infer E}`
	? E
	: never;

// possible progress events for audio in ophan
type AudioProgressEvents = Extract<
	AudioEvents,
	`${number}`
> extends `${infer N extends number}`
	? N
	: never;

const reportAudioEvent = (mediaId: string, eventName: AudioEvents) => {
	const audioEvent: AudioEvent = {
		id: mediaId,
		eventType: `audio:content:${eventName}`,
	};

	void getOphan('Web').then((ophan) => {
		ophan.record({
			audio: audioEvent,
		});
	});
};

// ********************* Component *********************

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
	// ********************* player *********************

	// state for displaying feedback to the user
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(preCalculatedDuration);
	const [progress, setProgress] = useState(0);
	const [isWaiting, setIsWaiting] = useState(false);
	const [isScrubbing, setIsScrubbing] = useState(false);
	const [buffer, setBuffer] = useState(0);

	const isFirstPlay = useRef(true);

	// ref to the <audio /> element that handles playback
	const audioRef = useRef<HTMLAudioElement>(null);

	// ********************* ophan stuff *********************

	// we'll send listening progress reports to ophan at these percentage points
	// through playback (100% is handled by the 'ended' event)
	const audioProgressEvents = useRef<Set<AudioProgressEvents>>(
		new Set([25, 50, 75]),
	);

	// ******************** events *********************

	const onTimeupdate = useCallback(() => {
		if (audioRef.current) {
			const newProgress =
				(audioRef.current.currentTime / audioRef.current.duration) *
				100;

			setCurrentTime(audioRef.current.currentTime);
			setProgress(newProgress);

			// Send progress events to ophan,
			// but only if the audio is playing. We don't want to send these events
			// just because you skipped around the audio while paused.
			if (isPlaying) {
				for (const stage of audioProgressEvents.current) {
					if (newProgress >= stage) {
						audioProgressEvents.current.delete(stage);
						reportAudioEvent(mediaId, String(stage) as AudioEvents);
					}
				}
			}
		}
	}, [isPlaying, mediaId]);

	const onPlay = useCallback(() => {
		setIsPlaying(true);

		if (isFirstPlay.current) {
			isFirstPlay.current = false;
			reportAudioEvent(mediaId, 'play');
		}
	}, [mediaId]);

	const onProgress = useCallback(() => {
		if (audioRef.current) {
			const buffers = audioRef.current.buffered.length;
			if (buffers === 0) return;

			const end = audioRef.current.buffered.end(buffers - 1);
			setBuffer((end / audioRef.current.duration) * 100);
		}
	}, []);

	const onError = useCallback((event: Event) => {
		window.guardian.modules.sentry.reportError(
			new Error(event.type),
			'audio-player',
		);
		log('dotcom', 'Audio player error:', event);
	}, []);

	// Set the duration to what we now *know* it is.
	// If we already had the correct duration, this will be a no-op anyway.
	const onDurationChange = useCallback(() => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	}, []);

	// ********************* interactions *********************

	const boundingClientRect = useRef<DOMRect>();

	const playPause = useCallback(() => {
		if (audioRef.current) {
			if (audioRef.current.paused) {
				void audioRef.current.play().catch(onError);
			} else {
				audioRef.current.pause();
				setIsWaiting(false);
			}
		}
	}, [onError]);

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

	const setPlaybackTime = useCallback(
		(newTime: number) => {
			if (audioRef.current) {
				audioRef.current.currentTime = newTime;
			}
		},
		[audioRef],
	);

	const jumpToPoint = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (audioRef.current && !isNaN(audioRef.current.duration)) {
				setIsScrubbing(true);

				boundingClientRect.current =
					event.currentTarget.getBoundingClientRect();

				const { width, left } = boundingClientRect.current;
				const clickX = event.clientX - left;
				const newTime = (clickX / width) * audioRef.current.duration;

				setPlaybackTime(newTime);
			}
		},
		[setPlaybackTime],
	);

	const scrub = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (isScrubbing && audioRef.current && boundingClientRect.current) {
				const { width, left } = boundingClientRect.current;
				const eventX = event.clientX - left;
				const newTime = (eventX / width) * audioRef.current.duration;
				setPlaybackTime(newTime);
			}
		},
		[isScrubbing, setPlaybackTime],
	);

	const stopScrubbing = useCallback(() => {
		setIsScrubbing(false);
	}, []);

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

	// ********************* effects *********************

	useEffect(() => {
		if (!audioRef.current) return;

		const audio = audioRef.current;

		const onPause = () => setIsPlaying(false);
		const onEnded = () => reportAudioEvent(mediaId, 'end');

		const onWaiting = () => setIsWaiting(true);
		const onCanPlay = () => setIsWaiting(false);

		audio.addEventListener('waiting', onWaiting);
		audio.addEventListener('canplay', onCanPlay);
		audio.addEventListener('timeupdate', onTimeupdate);
		audio.addEventListener('seeking', onTimeupdate);
		audio.addEventListener('durationchange', onDurationChange);
		audio.addEventListener('play', onPlay);
		audio.addEventListener('pause', onPause);
		audio.addEventListener('ended', onEnded);
		audio.addEventListener('error', onError);
		audio.addEventListener('progress', onProgress);

		return () => {
			audio.removeEventListener('waiting', onWaiting);
			audio.removeEventListener('canplay', onCanPlay);
			audio.removeEventListener('timeupdate', onTimeupdate);
			audio.removeEventListener('seeking', onTimeupdate);
			audio.removeEventListener('durationchange', onDurationChange);
			audio.removeEventListener('play', onPlay);
			audio.removeEventListener('pause', onPause);
			audio.removeEventListener('ended', onEnded);
			audio.removeEventListener('error', onError);
			audio.removeEventListener('progress', onProgress);
		};
	}, [onTimeupdate, onDurationChange, onPlay, onError, onProgress, mediaId]);

	return (
		<>
			{/* native audio player and controls */}
			<audio
				src={src}
				ref={audioRef}
				autoPlay={false}
				data-media-id={mediaId}
				preload="none"
				controls={false}
			>
				<track kind="captions" />
			</audio>

			{/* custom guardian controls that interact with the native player */}
			<Wrapper showVolumeControls={showVolumeControls}>
				<CurrentTime currentTime={currentTime} />
				<Duration duration={duration} />

				<ProgressBar
					isScrubbing={isScrubbing}
					canJumpToPoint={Boolean(audioRef.current?.duration)}
					buffer={buffer}
					progress={progress}
					src={src}
					onMouseDown={jumpToPoint}
					onMouseUp={stopScrubbing}
					onMouseMove={scrub}
				/>

				<Playback>
					<Playback.SkipBack
						onClick={skipBackward}
						disabled={isWaiting || !isPlaying}
					/>
					<Playback.Play
						isWaiting={isWaiting}
						isPlaying={isPlaying}
						onClick={playPause}
					/>
					<Playback.SkipForward
						onClick={skipForward}
						disabled={isWaiting || !isPlaying}
					/>
				</Playback>

				{showVolumeControls && (
					<Volume>
						<Volume.UnMute onClick={unMute} isMuted={isMuted} />
						<Volume.Mute onClick={mute} isMuted={isMuted} />
					</Volume>
				)}
			</Wrapper>
		</>
	);
};
