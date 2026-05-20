import { useCallback, useRef } from 'react';
import type { VideoEventKey } from '../components/YoutubeAtom/YoutubeAtom';

type Milestones = {
	hasSentPlay: boolean;
	hasSent25: boolean;
	hasSent50: boolean;
	hasSent75: boolean;
	hasSentEnd: boolean;
};

/**
 * Returns a function that should be called on each time update.
 * It tracks when a video begins, ends or crosses the 25%, 50% and 75%
 * milestones. On each milestone the provided callback is triggered.
 */
export const useVideoMilestoneTracking = (
	onMilestone: (event: VideoEventKey) => void,
): [
	(
		progress:
			| { currentTime: number; duration: number }
			| { started: true }
			| { ended: true },
	) => void,
	() => void,
] => {
	const clearMilestones = () => ({
		hasSentPlay: false,
		hasSent25: false,
		hasSent50: false,
		hasSent75: false,
		hasSentEnd: false,
	});

	const milestones = useRef<Milestones>(clearMilestones());

	/**
	 * Sends tracking events when video milestones are hit.
	 * Uses hook state to prevent duplicate tracking events from being fired.
	 * Can be called on start, end or timestamp update events using the
	 * appropriate parameters.
	 */
	const trackMilestone = useCallback(
		(
			progress:
				| { currentTime: number; duration: number }
				| { started: true }
				| { ended: true },
		) => {
			let percent = 0;

			if ('ended' in progress) {
				percent = 100;
			} else if ('duration' in progress && progress.duration > 0) {
				percent = (progress.currentTime / progress.duration) * 100;
			}

			if (!milestones.current.hasSentPlay && percent >= 0) {
				onMilestone('play');
				milestones.current.hasSentPlay = true;
			}

			if (!milestones.current.hasSent25 && percent >= 25) {
				onMilestone('25');
				milestones.current.hasSent25 = true;
			}

			if (!milestones.current.hasSent50 && percent >= 50) {
				onMilestone('50');
				milestones.current.hasSent50 = true;
			}

			if (!milestones.current.hasSent75 && percent >= 75) {
				onMilestone('75');
				milestones.current.hasSent75 = true;
			}

			if (!milestones.current.hasSentEnd && percent >= 99) {
				onMilestone('end');
				milestones.current.hasSentEnd = true;
			}
		},
		[onMilestone],
	);

	/**
	 * Resets the milestones, allowing further tracking events to be triggered.
	 * Will not reset if the video has not reached the end.
	 */
	const resetMilestones = () => {
		if (milestones.current.hasSentEnd) {
			milestones.current = clearMilestones();
		}
	};

	return [trackMilestone, resetMilestones];
};
