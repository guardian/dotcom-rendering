import { timeAgo } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { useIsInView } from '../lib/useIsInView';

type Props = {
	/** the time to compare with in milliseconds since epoch */
	then: number;
	/** the time to compare to */
	now: number;
};

const ONE_MINUTE = 60_000;
const getNextMinute = (then: number) =>
	then + Math.floor((Date.now() - then) / ONE_MINUTE) * ONE_MINUTE;

/**
 * Shows a recent time as relative, such as “3h ago”
 *
 * ## Why does this need to be an Island?
 *
 * We update the relative time on the browser on an interval.
 */
export const RelativeTime = ({ then, now }: Props) => {
	const [inView, ref] = useIsInView({ repeat: true });

	const [display, setDisplay] = useState(timeAgo(then, { now }));

	useEffect(() => {
		setDisplay(timeAgo(then, { now: getNextMinute(then) }));
		if (!inView) return;

		const interval = setInterval(() => {
			setDisplay(timeAgo(then, { now: getNextMinute(then) }));
		}, ONE_MINUTE);
		return () => clearInterval(interval);
	}, [inView, then]);

	const date = new Date(then);

	return (
		<time
			ref={ref}
			dateTime={date.toISOString()}
			title={date.toLocaleDateString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZoneName: 'long',
			})}
		>
			{display}
		</time>
	);
};
