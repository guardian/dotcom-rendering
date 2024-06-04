import { isString, timeAgo } from '@guardian/libs';
import { useEffect, useState } from 'react';
import { useIsInView } from '../lib/useIsInView';

type Props = {
	/** the time to compare with in milliseconds since epoch */
	then: number;
	/** the time to compare to */
	now: number;
};

const ONE_MINUTE = 60_000;
/** Get the duration between two timestamp, with arbitrary precision */
const getDuration = ({
	then,
	now,
	precision,
}: {
	then: number;
	now: number;
	precision: number;
}) => Math.floor((now - then) / precision) * precision;

/**
 * Wrapper around `timeAgo` which:
 * - handles dates in the future
 * - always returns a `string`, using “now” for future dates
 * - floors `now` to the nearest minute in the client
 */
const relativeTime = (
	then: number,
	now: number,
	environment: 'server' | 'client',
): string => {
	const time = timeAgo(then, {
		now:
			environment === 'server'
				? now
				: then +
				  getDuration({
						then,
						now: Date.now(),
						precision: ONE_MINUTE,
				  }),
	});

	return isString(time) ? time : 'now';
};

/**
 * Shows a recent time as relative, such as “3h ago”
 *
 * ## Why does this need to be an Island?
 *
 * We update the relative time on the browser on an interval.
 */
export const RelativeTime = ({ then, now }: Props) => {
	const [inView, ref] = useIsInView({ repeat: true });
	const [display, setDisplay] = useState(relativeTime(then, now, 'server'));

	useEffect(() => {
		const updateDisplay = () =>
			setDisplay(relativeTime(then, now, 'client'));
		updateDisplay();
		if (!inView) return;
		const interval = setInterval(updateDisplay, ONE_MINUTE);
		return () => clearInterval(interval);
	}, [inView, now, then]);

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
