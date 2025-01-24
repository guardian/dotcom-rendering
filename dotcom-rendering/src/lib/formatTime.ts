const formatNum = (t: number) => t.toFixed(0).padStart(2, '0');

/**
 * Formats a number as a time string.
 *
 * @example formatTime(12) => '00:00:12'
 * @example formatTime(123) => '00:02:03'
 * @example formatTime(12345) => '03:25:45';
 */
export const formatTime = (t: number): string => {
	const second = Math.floor(t % 60);
	const minute = Math.floor((t % 3600) / 60);
	const hour = Math.floor(t / 3600);

	return `${formatNum(hour)}:${formatNum(minute)}:${formatNum(second)}`;
};

/**
 * Formats a number as a time string and removes all leading zero's.
 *
 * @example secondsToDuration(12) => '12'
 * @example secondsToDuration(123) => '2:03'
 * @example secondsToDuration(12345) => '3:25:45';
 */
export const secondsToDuration = (secs?: number): string => {
	if (typeof secs === `undefined` || secs === 0) {
		return ``;
	}
	const seconds = Number(secs);
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor((seconds % 3600) % 60);

	const duration = [];
	if (h > 0) {
		duration.push(h);
	}
	if (h === 0 && m > 0 && s === 0) duration.push(`${m}:00`); // e.g 6:00
	else if (h > 0 && m < 10) duration.push(`0${m}`); // e.g 1:01:11
	else duration.push(m); // supports 0:59
	if (s > 0) {
		if (s < 10) duration.push(`0${s}`);
		else duration.push(s);
	}
	return duration.join(':');
};
