import { AudioPlayer } from './AudioPlayer/AudioPlayer';

type Props = {
	mediaId: string;
	duration?: number;
	src: string;
};

/**
 * ## Why does this need to be an Island?
 *
 * The audio player is interactive.
 * Requires consent to use audio ads.
 *
 * ---
 *
 * (No visual story exists)
 */
export const AudioPlayerWrapper = ({ duration, src, mediaId }: Props) => {
	return <AudioPlayer src={src} mediaId={mediaId} duration={duration} />;
};
