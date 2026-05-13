import type { VideoPlayerFormat } from '../types/mainMedia';

/**
 * Self-hosted video style (Cinemagraph, Loop, Default) settings.
 *
 * Defines the settings for each video style which are used to determine how the
 * video player should behave and which controls should be shown for each style.
 */
export type VideoStyleSettings = {
	autoplay: boolean;
	loop: boolean;
	supportsAudio: boolean;
	showFullscreenIcon: boolean;
	showProgressBar: boolean;
	/**
	 * A progress bar that includes seeking. Taller than the default progress bar
	 */
	useInteractiveProgressBar: boolean | null;
	/**
	 * A play icon can be shown when the video is not playing
	 */
	canShowPlayIcon: boolean;
	canShowSubtitles: boolean;
	seekIncrement: number | null;
	/**
	 * Does the video respond to user input
	 */
	isInteractive: boolean;
	/**
	 * Functionality to hide controls when the video is not interacted with
	 * so the full, unobscured video can be displayed to the user without distractions.
	 */
	hideControlsWhenNotInteractedWith: boolean;
};

const loopSettings: VideoStyleSettings = {
	autoplay: true,
	loop: true,
	supportsAudio: true,
	showFullscreenIcon: true,
	showProgressBar: true,
	useInteractiveProgressBar: false,
	canShowPlayIcon: true,
	canShowSubtitles: true,
	seekIncrement: 1,
	isInteractive: true,
	hideControlsWhenNotInteractedWith: false,
};

/**
 * In a cinemagraph, all controls are hidden: the video looks like a GIF.
 * This includes but may not be limited to: audio icon, play/pause icon, subtitles, progress bar.
 */
const cinemagraphSettings: VideoStyleSettings = {
	...loopSettings,
	supportsAudio: false,
	showFullscreenIcon: false,
	showProgressBar: false,
	canShowPlayIcon: false,
	canShowSubtitles: false,
	seekIncrement: null,
	isInteractive: false,
};

/**
 * In the tools, this style is known as "non-Youtube".
 * This style is used for videos that are typically longer in length and should not loop.
 */
const defaultSettings: VideoStyleSettings = {
	...loopSettings,
	autoplay: false,
	loop: false,
	useInteractiveProgressBar: true,
	seekIncrement: 10,
	hideControlsWhenNotInteractedWith: true,
};

export const videoSettingsMap: Record<VideoPlayerFormat, VideoStyleSettings> = {
	Default: defaultSettings,
	Loop: loopSettings,
	Cinemagraph: cinemagraphSettings,
};
