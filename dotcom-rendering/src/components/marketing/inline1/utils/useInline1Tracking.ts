import type { TAction } from '@guardian/ophan-tracker-js';
import type {
	Inline1Props,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect } from 'react';
import { useIsInView } from '../../../../lib/useIsInView';
import { createEventFromTracking } from '../../lib/tracking';
import { recordInline1View } from './viewCount';

interface Props {
	tracking: Tracking;
	submitComponentEvent: Inline1Props['submitComponentEvent'];
}

interface Inline1Tracking {
	setNode: Dispatch<SetStateAction<HTMLElement | null>>;
	sendEvent: (action: TAction, idSuffix?: string) => void;
}

/**
 * Tracking hook for Inline1 components:
 * - Sends INSERT ophan event on mount
 * - Sends VIEW ophan event and updates local storage item when element is first viewed
 * - Returns `sendEvent` function for any other actions, e.g. CLICK on a CTA
 */
export const useInline1Tracking = ({
	tracking,
	submitComponentEvent,
}: Props): Inline1Tracking => {
	const sendEvent = useCallback(
		(action: TAction, idSuffix?: string) => {
			if (!submitComponentEvent) return;
			const { campaignCode } = tracking;
			const componentId =
				idSuffix != null
					? `${campaignCode} : ${idSuffix}`
					: campaignCode;
			void submitComponentEvent(
				createEventFromTracking(action)(tracking, componentId),
			);
		},
		[tracking, submitComponentEvent],
	);

	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	useEffect(() => {
		sendEvent('INSERT');
	}, [sendEvent]);

	useEffect(() => {
		if (hasBeenSeen === true) {
			recordInline1View(tracking.abTestName);
			sendEvent('VIEW');
		}
	}, [hasBeenSeen, sendEvent, tracking.abTestName]);

	return { setNode, sendEvent };
};
