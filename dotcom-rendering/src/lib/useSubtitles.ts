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
	// only show subtitles if the video is actively playing or if its paused
	const shouldShow = playerState === 'PLAYING' || currentTime > 0;

	useEffect(() => {
		if (!video) return;

		const tracks = video.textTracks;

		const pickTrack = () => {
			const t = tracks[0];
			if (!t) return;

			// Trigger cue fetching immediately (don’t wait for play state)
			if (t.mode !== 'hidden' && t.mode !== 'showing') {
				t.mode = 'hidden';
			}

			setActiveTrack(t);
		};

		// 1) pick immediately if already present
		pickTrack();

		// 2) react when HLS adds tracks later (common on mobile)
		const onAdd = () => pickTrack();
		tracks.addEventListener('addtrack', onAdd);

		// 3) also after metadata (some browsers populate then)
		const onMeta = () => pickTrack();
		video.addEventListener('loadedmetadata', onMeta);

		return () => {
			tracks.removeEventListener('addtrack', onAdd);
			video.removeEventListener('loadedmetadata', onMeta);
		};
	}, [video]);

	useEffect(() => {
		const track = activeTrack;

		if (!track || !shouldShow) {
			setActiveCue(null);
			return;
		}

		// if we have a track and can show it, hide the native track
		track.mode = 'hidden';

		const onCueChange = () => {
			const list = track.activeCues;
			if (!list || list.length === 0) {
				return;
			}
			const cue = list[0] as VTTCue;
			setActiveCue({
				startTime: cue.startTime,
				endTime: cue.endTime,
				text: cue.text,
			});
		};
		track.addEventListener('cuechange', onCueChange);
		onCueChange();
		return () => {
			track.removeEventListener('cuechange', onCueChange);
		};
	}, [activeTrack, shouldShow]);

	return activeCue;
};
