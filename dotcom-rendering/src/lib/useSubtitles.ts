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

	/* Only show subtitles if the video is actively playing or if it's paused. */
	const shouldShow = playerState === 'PLAYING' || currentTime > 0;

	useEffect(() => {
		if (!video) return;

		const textTracks = video.textTracks;

		const setTrackFromList = () => {
			const track = textTracks[0];
			/* We currently only support one text track per video, so we are OK to access [0] here. */
			if (!track) return;

			/* Keep track in 'showing' mode for iOS reliability.
			 * We'll hide the native subtitles with CSS instead
			 */
			if (track.mode !== 'showing') {
				track.mode = 'showing';
			}

			setActiveTrack(track);
		};

		/* Get Text track as soon as the video element is available */
		setTrackFromList();

		/* Listen for delayed loads across all scenarios */
		textTracks.addEventListener('addtrack', setTrackFromList);
		video.addEventListener('loadedmetadata', setTrackFromList);
		video.addEventListener('loadeddata', setTrackFromList);
		video.addEventListener('canplay', setTrackFromList);

		return () => {
			textTracks.removeEventListener('addtrack', setTrackFromList);
			video.removeEventListener('loadedmetadata', setTrackFromList);
			video.removeEventListener('loadeddata', setTrackFromList);
			video.removeEventListener('canplay', setTrackFromList);
		};
	}, [video]);

	useEffect(() => {
		const track = activeTrack;

		if (!track || !shouldShow) {
			setActiveCue(null);
			return;
		}

		/* Keep track in 'showing' mode.
		 * this makes iOS more reliable with cuechange events and activeCues
		 */
		if (track.mode !== 'showing') {
			track.mode = 'showing';
		}

		/* listen to cuechange and set the active cue */
		const onCueChange = () => {
			const list = track.activeCues;
			if (!list || list.length === 0) {
				setActiveCue(null);
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

		/* Initial check */
		onCueChange();

		return () => {
			track.removeEventListener('cuechange', onCueChange);
			/* Keep it showing even on cleanup for consistency */
			track.mode = 'showing';
		};
	}, [activeTrack, shouldShow, currentTime]);

	return activeCue;
};
