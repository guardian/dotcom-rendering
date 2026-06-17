import type { VideoPlayerFormat } from '../types/mainMedia';

type ProgessBarStyles =
	| {
			showProgressBar: boolean;
			/**
			 * A progress bar that includes seeking. Taller than the default progress bar
			 */
			useInteractiveProgressBar: boolean;
	  }
	| {
			showProgressBar: false;
			useInteractiveProgressBar?: never;
	  };

/**
 * Self-hosted video style (Cinemagraph, Loop, Default) settings.
 *
 * Defines the settings for each video style which are used to determine how the
 * video player should behave and which controls should be shown for each style.
 */
export type VideoStyleSettings = ProgessBarStyles & {
	autoplay: boolean;
	loop: boolean;
	supportsAudio: boolean;
	supportsFullscreen: boolean;
	/**
	 * A play icon can be shown when the video is not playing
	 */
	canShowPlayIcon: boolean;
	canShowSubtitles: boolean;
	/**
	 * When seeking left/right, how many seconds the video skips backward/forward.
	 * If null, the video does not support seeking.
	 */
	seekIncrement: number | null;
	/**
	 * Whether the video responds to user input.
	 */
	isInteractive: boolean;
	/**
	 * When enabled, controls will be hidden after a period of time of user inactivity
	 * so that the full, unobscured video can be displayed.
	 */
	enableFadeableControls: boolean;
};

const loopSettings: VideoStyleSettings = {
	autoplay: true,
	loop: true,
	supportsAudio: true,
	supportsFullscreen: false,
	showProgressBar: true,
	useInteractiveProgressBar: false,
	canShowPlayIcon: true,
	canShowSubtitles: true,
	seekIncrement: 1,
	isInteractive: true,
	enableFadeableControls: false,
};

/**
 * In a cinemagraph, all controls are hidden: the video looks like a GIF.
 * This includes but may not be limited to: audio icon, play/pause icon, subtitles, progress bar.
 */
const cinemagraphSettings: VideoStyleSettings = {
	autoplay: true,
	loop: true,
	supportsAudio: false,
	supportsFullscreen: false,
	showProgressBar: false,
	useInteractiveProgressBar: false,
	canShowPlayIcon: false,
	canShowSubtitles: false,
	seekIncrement: null,
	isInteractive: false,
	enableFadeableControls: false,
};

/**
 * In the tools, this style is known as "non-Youtube".
 * This style is used for videos that are typically longer in length and should not loop.
 */
const defaultSettings: VideoStyleSettings = {
	autoplay: true,
	loop: false,
	supportsAudio: true,
	supportsFullscreen: true,
	showProgressBar: true,
	useInteractiveProgressBar: true,
	canShowPlayIcon: true,
	canShowSubtitles: true,
	seekIncrement: 10,
	isInteractive: true,
	enableFadeableControls: true,
};

export const videoSettingsMap: Record<VideoPlayerFormat, VideoStyleSettings> = {
	Default: defaultSettings,
	Loop: loopSettings,
	Cinemagraph: cinemagraphSettings,
};
