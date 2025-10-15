import { text } from 'body-parser';
import { useEffect, useState } from 'react';
import type { PlayerStates } from 'src/components/LoopVideoPlayer';

type Props = {
	video: HTMLVideoElement | null;
	playerState: PlayerStates;
	currentTime: number;
};

export const useSubtitles = ({ video, playerState, currentTime }: Props) => {
	const [activeTrack, setActiveTrack] = useState<TextTrack | null>(null);
	const [subtitlesAvailable, setSubtitlesAvailable] = useState(false);

	useEffect(() => {
		if (!video) return;

		const textTracks = video.textTracks;
		console.log('>>> Text Tracks', textTracks);

		const setTrackFromList = () => {
			// We currently only support one text track per video, so we are ok to acces [0] here. If we added additional languages, this will need updating.
			if (!textTracks[0]) return;
			setActiveTrack(textTracks[0]);
			console.log(textTracks[0]);
		};
	}, [video]);
};
