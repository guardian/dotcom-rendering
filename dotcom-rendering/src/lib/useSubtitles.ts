import { useEffect, useState } from 'react';
import type { PlayerStates } from 'src/components/LoopVideoPlayer';

type Props = {
	video: HTMLVideoElement | null;
	playerState: PlayerStates;
	currentTime: number;
};

type ActiveCue = {
	startTime: number;
	endTime: number;
	text: string;
};

export const useSubtitles = ({ video, playerState, currentTime }: Props) => {
	const [activeTrack, setActiveTrack] = useState<TextTrack | null>(null);
	const [activeCue, setActiveCue] = useState<ActiveCue | null[]>([]);
	// only show subtitles if the video is actively playing or if its paused
	const shouldShow = playerState === 'PLAYING' || currentTime > 0;

	useEffect(() => {
		if (!video) return;

		const textTracks = video.textTracks;
		console.log('>>> Text Tracks', textTracks);

		const setTrackFromList = () => {
			const track = textTracks[0];
			// We currently only support one text track per video, so we are ok to acces [0] here. If we added additional languages, this will need updating.
			if (!track) return;
			console.log('>>> Track', track);

			setActiveTrack(track);
		};

		//Get Text track as soon as the video element is available.
		setTrackFromList();
		// TODO:: are there changes we need to listen for that might change the text track?
	}, [video]);

	useEffect(() => {
		const track = activeTrack;

		if (!track) return;
		if (!shouldShow) return;

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
			track.mode = 'showing';
		};
	}, [activeTrack, shouldShow]);

	return activeCue;
};
