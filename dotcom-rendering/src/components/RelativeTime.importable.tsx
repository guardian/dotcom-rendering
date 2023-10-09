import { isString, timeAgo as timeAgoHasAWeirdInterface } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';

type Props = {
	epoch: number;
	format: 'short' | 'long';
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

	const [display, setDisplay] = useState(timeAgo(epoch, format) ?? null);

	const updateTime = useCallback(() => {
		const relativeTime = timeAgo(epoch, format);
		if (isString(relativeTime)) setDisplay(relativeTime);
	}, [epoch, format]);

	useEffect(updateTime);

	useEffect(() => {
		const interval = setInterval(updateTime, 15_000);
		return () => clearInterval(interval);
	}, [updateTime]);

	return (
		<time
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
