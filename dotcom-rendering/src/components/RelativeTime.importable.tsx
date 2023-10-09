import { isString, timeAgo as timeAgoHasAWeirdInterface } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import { useIsInView } from '../lib/useIsInView';

type Props = {
	epoch: number;
	format: 'short' | 'long';
};

/** if a date is recent, keep it up to date more frequently */
const getUpdateFrequency = (epoch: number) => {
	const secondsAgo = (Date.now() - epoch) / 1_000;
	// less than a minute ago
	if (secondsAgo < 60) return 1 * 1000; // 1 second
	// less than an hour ago
	if (secondsAgo < 60 * 60) return 20 * 1000; // 20 seconds
	// less than an day ago
	if (secondsAgo < 60 * 60 * 24) return 5 * 60 * 1000; // 5 minutes
	// over a day ago
	return Infinity;
};

const timeAgo = (epoch: number, format: Props['format']) => {
	const value = timeAgoHasAWeirdInterface(epoch, {
		verbose: format === 'long',
	});

	if (!isString(value)) return;
	return value;
};

export const RelativeTime = ({ epoch, format }: Props) => {
	const date = new Date(epoch);
	const frequency = getUpdateFrequency(epoch);
	const [inView, ref] = useIsInView({ repeat: true });

	const [display, setDisplay] = useState(timeAgo(epoch, format) ?? null);

	const updateTime = useCallback(() => {
		if (!inView) return;
		const relativeTime = timeAgo(epoch, format);
		if (isString(relativeTime)) setDisplay(relativeTime);
	}, [epoch, format, inView]);

	useEffect(updateTime);

	useEffect(() => {
		const interval = setInterval(updateTime, frequency);
		return () => clearInterval(interval);
	}, [frequency, updateTime]);

	return (
		<time
			ref={ref}
			data-update-frequency={frequency}
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
