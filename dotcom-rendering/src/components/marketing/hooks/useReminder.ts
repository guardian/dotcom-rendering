/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/hooks/useReminder.ts
 */
import { useEffect, useRef, useState } from 'react';
import type { ContributionsReminderTracking } from '../banners/common/types';

const useReminder = (
	reminderTracking: ContributionsReminderTracking,
): {
	isReminderActive: boolean;
	onReminderCtaClick: () => void;
	mobileReminderRef: React.RefObject<HTMLDivElement>;
} => {
	const [isReminderActive, setIsReminderActive] = useState(false);

	const onReminderCtaClick = () => {
		reminderTracking.onReminderCtaClick();
		setIsReminderActive(!isReminderActive);
	};

	const mobileReminderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (mobileReminderRef.current && isReminderActive) {
			mobileReminderRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isReminderActive]);

	return { isReminderActive, onReminderCtaClick, mobileReminderRef };
};

export { useReminder };
