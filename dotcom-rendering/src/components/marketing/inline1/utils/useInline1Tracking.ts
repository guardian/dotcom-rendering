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
	messageType: Inline1Props['variant']['message']['type'];
}

interface Inline1Tracking {
	setNode: Dispatch<SetStateAction<HTMLElement | null>>;
	sendEvent: (action: TAction, idSuffix?: string) => void;
}

const messageTypeLabels: Record<Props['messageType'], string> = {
	Inline1SupportMessage: 'SupporterRevenue',
	Inline1NewsletterMessage: 'Newsletter',
	Inline1PuzzlesMessage: 'Puzzles',
};

/**
 * Tracking hook for Inline1 components:
 * - Sends INSERT ophan event on mount
 * - Sends VIEW ophan event and updates local storage item when element is first viewed
 * - Returns `sendEvent` function for any other actions, e.g. CLICK on a CTA
 */
export const useInline1Tracking = ({
	tracking,
	submitComponentEvent,
	messageType,
}: Props): Inline1Tracking => {
	const sendEvent = useCallback(
		(action: TAction, idSuffix?: string) => {
			if (!submitComponentEvent) return;
			const { campaignCode } = tracking;
			const componentId =
				idSuffix != null
					? `${campaignCode} : ${idSuffix}`
					: campaignCode;
			const event = createEventFromTracking(action)(
				tracking,
				componentId,
			);
			event.component.labels = [
				...(event.component.labels ?? []),
				messageTypeLabels[messageType],
			];
			void submitComponentEvent(event);
		},
		[tracking, submitComponentEvent, messageType],
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
