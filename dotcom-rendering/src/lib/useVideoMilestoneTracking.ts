import { useRef } from 'react';
import type { VideoEventKey } from '../components/YoutubeAtom/YoutubeAtom';

type Milestones = {
	hasSent25: boolean;
	hasSent50: boolean;
	hasSent75: boolean;
};

/**
 * Returns a function that should be called on each time update.
 * It tracks when a video crosses the 25%, 50% and 75% milestones and
 * calls the provided callback for each.
 */
export const useVideoMilestoneTracking = (
	onMilestone: (event: VideoEventKey) => void,
): ((currentTime: number, duration: number) => void) => {
	const milestones = useRef<Milestones>({
		hasSent25: false,
		hasSent50: false,
		hasSent75: false,
	});

	return (currentTime: number, duration: number) => {
		if (duration <= 0) return;

		const percent = (currentTime / duration) * 100;

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
	};
};
