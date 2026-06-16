import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import type { PlayerStates } from '../components/SelfHostedVideoPlayer';

/**
 * The duration in ms for which controls are displayed before fading out.
 */
const CONTROLS_FADE_DELAY = 3_000;
const PLAY_BUTTON_FADE_DELAY = 1_500;

const showControlsStyles = css`
	.controls-container {
		visibility: visible;
		opacity: 1;
	}

	.play-pause-icon {
		visibility: visible;
		opacity: 1;
	}
`;

const hideControlsStyles = css`
	.controls-container {
		visibility: hidden;
		opacity: 0;
		transition:
			visibility 500ms,
			opacity 500ms ease-in-out;
		transition-delay: ${CONTROLS_FADE_DELAY}ms;
	}

	.play-pause-icon {
		visibility: hidden;
		opacity: 0;
		transition:
			visibility 400ms,
			opacity 400ms ease-in-out;
		transition-delay: ${PLAY_BUTTON_FADE_DELAY}ms;
	}
`;

type Props = {
	/**
	 * When enabled, controls will be hidden after a period of time of user inactivity.
	 */
	isEnabled: boolean;
	playerState: PlayerStates;
};

/**
 * Shows controls to the user that fade out after a delay. This is to allow
 * the user to watch the video without controls obstructing the view.
 */
export const useFadeableControls = ({
	isEnabled,
	playerState,
}: Props): {
	fadeableControlsStyles: ReturnType<typeof css> | undefined;
	isShowingControls: boolean;
	showPauseIcon: boolean;
	showFadeableControlsAndStartTimer: () => void;
} => {
	const showControlsTimer = useRef<number | null>(null);

	/** Whether the video should show controls */
	const [shouldShowControls, setShouldShowControls] = useState(true);
	/** Whether the video is currently showing controls */
	const [isShowingControls, setIsShowingControls] = useState(true);

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

		showControlsTimer.current = window.setTimeout(() => {
			setIsShowingControls(false);
		}, CONTROLS_FADE_DELAY);

		return () => {
			if (showControlsTimer.current !== null) {
				window.clearTimeout(showControlsTimer.current);
				showControlsTimer.current = null;
			}
		};
	}, [shouldShowControls, playerState]);

	if (!isEnabled) {
		return {
			fadeableControlsStyles: undefined,
			isShowingControls: true,
			showPauseIcon: false,
			showFadeableControlsAndStartTimer,
		};
	}

	return {
		fadeableControlsStyles:
			!shouldShowControls && playerState === 'PLAYING'
				? hideControlsStyles
				: showControlsStyles,
		isShowingControls,
		showPauseIcon: playerState === 'PLAYING',
		showFadeableControlsAndStartTimer,
	};
};
