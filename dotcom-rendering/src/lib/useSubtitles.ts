import type { PlayerStates } from 'src/components/LoopVideoPlayer';

type Props = {
	video: HTMLVideoElement | null;
	playerState: PlayerStates;
	currentTime: number;
};

export const useSubtitles = ({ video, playerState, currentTime }: Props) => {};
