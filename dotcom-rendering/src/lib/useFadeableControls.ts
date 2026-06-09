import { useEffect, useRef, useState } from 'react';
import type { PlayerStates } from './SelfHostedVideoPlayer';

type Props = {
	/**
	 * When enabled, controls will be hidden after a period of time of user inactivity.
	 */
	isEnabled: boolean;
	playerState: PlayerStates;
	/**
	 * The delay in milliseconds before the controls fade out.
	 * If controls fade away at different times, then this value should
	 * be set to the longest fade out time among the controls.
	 */
	controlsFadeDelay: number;
};

/**
 * Shows controls to the user that fade out after a delay. This is to allow
 * the user to watch the video without controls obstructing the view.
 */
export const useFadeableControls = ({
	isEnabled,
	playerState,
	controlsFadeDelay,
}: Props): {
	showControls: boolean;
	hideControls: boolean;
	isShowingControls: boolean;
	showPauseIcon: boolean;
	showFadeableControlsAndStartTimer: () => void;
} => {
	const showControlsTimer = useRef<number | null>(null);

	/** Whether the video should show controls */
	const [shouldShowControls, setShouldShowControls] = useState(true);
	/** Whether the video is currently showing controls */
	const [isShowingControls, setIsShowingControls] = useState(true);

	const showControls = !shouldShowControls && playerState === 'PLAYING';

	const hideControls =
		shouldShowControls &&
		(playerState === 'PAUSED_BY_USER' ||
			playerState === 'PAUSED_BY_BROWSER');

	const showFadeableControlsAndStartTimer = () => {
		if (!isEnabled) {
			return;
		}

		setShouldShowControls(true);
		setIsShowingControls(true);
	};

	/**
	 * When the video starts playing, start a timer to hide the controls after a few seconds.
	 * If there is any user interaction while the video is playing, restart the timer.
	 * The controls will fade out after a period of no user interaction.
	 */
	useEffect(() => {
		if (playerState !== 'PLAYING') {
			return;
		}

		/**
		 * We use this piece of state `showControls` as a self-resetting trigger.
		 * It's switched on to show the controls -> it's then immediately switched off to start
		 * the transition to hide the controls.
		 * We want to know when a user action occurs that means we want to show the controls. We
		 * immediately set this state to false so that we can set it to true again the next time
		 * one of these user actions occurs.
		 */
		setTimeout(() => {
			setShouldShowControls(false);
		}, 0);

		if (showControlsTimer.current !== null) {
			window.clearTimeout(showControlsTimer.current);
		}

		showControlsTimer.current = window.setTimeout(() => {
			setIsShowingControls(false);
		}, controlsFadeDelay);

		return () => {
			if (showControlsTimer.current !== null) {
				window.clearTimeout(showControlsTimer.current);
				showControlsTimer.current = null;
			}
		};
	}, [shouldShowControls, playerState, controlsFadeDelay]);

	if (!isEnabled) {
		return {
			showControls: false,
			hideControls: false,
			isShowingControls: true,
			showPauseIcon: false,
			showFadeableControlsAndStartTimer,
		};
	}

	return {
		showControls,
		hideControls,
		isShowingControls,
		showPauseIcon: playerState === 'PLAYING',
		showFadeableControlsAndStartTimer,
	};
};
