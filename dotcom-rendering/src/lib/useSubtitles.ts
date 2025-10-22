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
} | null;

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

		const textTracks = video.textTracks;

		const setTrackFromList = () => {
			const track = textTracks[0];
			// We currently only support one text track per video, so we are ok to access [0] here. If we add additional languages, this will need updating.
			if (!track) return;

			setActiveTrack(track);
		};

		//Get Text track as soon as the video element is available.
		setTrackFromList();
		// TODO:: are there changes we need to listen for that might change the text track?
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
				setActiveTrack(null);
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
