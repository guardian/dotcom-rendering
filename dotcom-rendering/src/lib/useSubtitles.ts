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
	const [track, setTrack] = useState<TextTrack | null>(null);
	const [activeCue, setActiveCue] = useState<ActiveCue | null>(null);

	const shouldShow = playerState === 'PLAYING' || currentTime > 0;

	// 1) pick the single track and make sure it loads
	useEffect(() => {
		if (!video) return;

		const tracks = video.textTracks;

		const pickTrack = () => {
			const t = tracks[0];
			if (!t) return;
			// 'showing' keeps iOS’s activeCues more reliable; we’ll hide native with CSS if needed
			if (t.mode !== 'showing') t.mode = 'showing';
			setTrack(t);
		};

		pickTrack();
		tracks.addEventListener('addtrack', pickTrack);
		video.addEventListener('loadedmetadata', pickTrack);

		return () => {
			tracks.removeEventListener('addtrack', pickTrack);
			video.removeEventListener('loadedmetadata', pickTrack);
		};
	}, [video]);

	// 2) keep subtitle state in sync on a single, simple signal
	useEffect(() => {
		if (!video || !track) {
			setActiveCue(null);
			return;
		}

		const compute = () => {
			if (!shouldShow) {
				setActiveCue(null);
				return;
			}

			// try activeCues first
			const act = track.activeCues;
			if (act && act.length > 0) {
				const c = act[0] as VTTCue;
				setActiveCue({
					startTime: c.startTime,
					endTime: c.endTime,
					text: c.text,
				});
				return;
			}

			// fallback: scan all cues by currentTime
			const all = track.cues;
			if (all && all.length > 0) {
				const t = video.currentTime;
				for (let i = 0; i < all.length; i++) {
					const c = all[i] as VTTCue;
					if (t >= c.startTime && t < c.endTime) {
						setActiveCue({
							startTime: c.startTime,
							endTime: c.endTime,
							text: c.text,
						});
						return;
					}
				}
			}

			// nothing active → clear (prevents “stuck on first cue”)
			setActiveCue(null);
		};

		video.addEventListener('timeupdate', compute);
		// run once immediately
		compute();

		return () => {
			video.removeEventListener('timeupdate', compute);
		};
	}, [video, track, shouldShow]);

	return activeCue;
};
