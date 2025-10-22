import { useEffect, useState } from 'react';
import type { PlayerStates } from '../components/LoopVideoPlayer';

type Props = {
	video: HTMLVideoElement | null;
	playerState: PlayerStates;
	currentTime: number;
};

export type ActiveCue = {
	startTime: number;
	endTime: number;
	text: string;
};

export const useSubtitles = ({
	video,
	playerState,
	currentTime,
}: Props): ActiveCue | null => {
	const [activeTrack, setActiveTrack] = useState<TextTrack | null>(null);
	const [activeCue, setActiveCue] = useState<ActiveCue | null>(null);

	// Only show subtitles if the video is actively playing or if it's paused after having started
	const shouldShow = playerState === 'PLAYING' || currentTime > 0;

	// Select and "wake" the single text track as soon as possible.
	useEffect(() => {
		if (!video) return;

		const tracks = video.textTracks;

		const pickTrack = () => {
			const t = tracks[0];
			if (!t) return;

			// Trigger cue fetching immediately (don’t wait for play state)
			if (t.mode === 'disabled') t.mode = 'hidden';

			setActiveTrack(t);
		};

		// 1) If already present
		pickTrack();

		// 2) Track can appear later on mobile HLS
		const onAdd = () => pickTrack();
		// Some engines support addEventListener on TextTrackList; guard just in case
		(tracks as unknown as EventTarget).addEventListener?.(
			'addtrack',
			onAdd as EventListener,
		);

		// 3) Some browsers populate textTracks on metadata
		const onMeta = () => pickTrack();
		video.addEventListener('loadedmetadata', onMeta);

		return () => {
			(tracks as unknown as EventTarget).removeEventListener?.(
				'addtrack',
				onAdd as EventListener,
			);
			video.removeEventListener('loadedmetadata', onMeta);
		};
	}, [video]);

	// Keep activeCue in sync; use cuechange + timeupdate fallback to avoid stalls on mobile.
	useEffect(() => {
		const track = activeTrack;

		if (!video || !track) {
			setActiveCue(null);
			return;
		}

		// Ensure the browser continues fetching cues even if it flips the mode
		if (track.mode === 'disabled') track.mode = 'hidden';

		const computeActive = () => {
			if (!shouldShow) {
				// We still keep the track loading, but hide our custom renderer state
				setActiveCue(null);
				return;
			}

			// Prefer activeCues when available
			const list = track.activeCues;
			if (list && list.length > 0) {
				const cue = list[0] as VTTCue;
				setActiveCue({
					startTime: cue.startTime,
					endTime: cue.endTime,
					text: cue.text,
				});
				return;
			}

			// Fallback: derive from all cues + currentTime (helps when cuechange stalls on mobile)
			const cues = track.cues;
			if (cues?.length != null) {
				const t = video.currentTime;
				let found: VTTCue | null = null;
				// Typical subtitle counts are small; linear scan is fine.
				for (let i = 0; i < cues.length; i++) {
					const c = cues[i] as VTTCue;
					if (t >= c.startTime && t < c.endTime) {
						found = c;
						break;
					}
				}
				if (found) {
					setActiveCue({
						startTime: found.startTime,
						endTime: found.endTime,
						text: found.text,
					});
					return;
				}
			}

			// No active cue → clear to avoid “stuck on first cue”
			setActiveCue(null);
		};

		const onCueChange = () => computeActive();
		const onTimeUpdate = () => computeActive();

		track.addEventListener('cuechange', onCueChange);
		video.addEventListener('timeupdate', onTimeUpdate);

		// Kick once in case we're already mid-cue
		computeActive();

		return () => {
			track.removeEventListener('cuechange', onCueChange);
			video.removeEventListener('timeupdate', onTimeUpdate);
		};
	}, [activeTrack, video, shouldShow]);

	return activeCue;
};
