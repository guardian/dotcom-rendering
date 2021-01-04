type RelativeDateOptions = {
	notAfter?: number;
	format?: FormatType;
	showTime?: boolean;
};

type FormatType = 'short' | 'med' | 'long';
type PeriodType = 's' | 'm' | 'h' | 'd';

const dayOfWeek = (day: number): string =>
	[
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	][day];

const monthAbbr = (month: number): string =>
	[
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	][month];

const pad = (n: number): number | string => (n < 10 ? `0${n}` : n);

const isToday = (date: Date): boolean => {
	const today = new Date();
	return date && date.toDateString() === today.toDateString();
};

const isWithin24Hours = (date: Date): boolean => {
	const today = new Date();
	return date && date.valueOf() > today.valueOf() - 24 * 60 * 60 * 1000;
};

const isYesterday = (relative: Date): boolean => {
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	return relative.toDateString() === yesterday.toDateString();
};

const isWithinPastWeek = (date: Date): boolean => {
	const weekAgo = new Date().valueOf() - 7 * 24 * 60 * 60 * 1000;
	return date.valueOf() >= weekAgo;
};

const isValidDate = (date: Date): boolean => {
	if (Object.prototype.toString.call(date) !== '[object Date]') {
		return false;
	}
	return !Number.isNaN(date.getTime());
};

const getSuffix = (
	type: PeriodType,
	format: FormatType,
	value: number,
): string => {
	let strs;

	const units = {
		s: {
			short: ['s'],
			med: ['s ago'],
			long: [' second ago', ' seconds ago'],
		},
		m: {
			short: ['m'],
			med: ['m ago'],
			long: [' minute ago', ' minutes ago'],
		},
		h: {
			short: ['h'],
			med: ['h ago'],
			long: [' hour ago', ' hours ago'],
		},
		d: {
			short: ['d'],
			med: ['d ago'],
			long: [' day ago', ' days ago'],
		},
	};

	if (units[type]) {
		strs = units[type][format];
		if (value === 1) {
			return strs[0];
		}
		return strs[strs.length - 1];
	}
	return '';
};

const withTime = (date: Date): string =>
	` ${date.getHours()}:${pad(date.getMinutes())}`;

export const makeRelativeDate = (
	epoch: number,
	opts: RelativeDateOptions = {},
): false | string => {
	let minutes;
	let hours;
	let days;
	let delta = 0;
	const then = new Date(Number(epoch));
	const now = new Date();
	const format = opts.format || 'short';
	const extendedFormatting = opts.format === 'short' || opts.format === 'med';

	if (!isValidDate(then)) {
		return false;
	}

	// delta is the number of seconds since the article was published and now
	delta = Math.floor((now.getTime() - then.getTime()) / 1000);

	/* eslint-disable no-else-return */
	// because I think
	// the intention reads better with the else statements here
	if (delta < 0) {
		// Publication dates in the future are not supported
		return false;
	} else if (opts.notAfter && delta > opts.notAfter) {
		// If article was published before the cutoff (notAfter) bail out
		return false;
	} else if (delta < 55) {
		// Seconds
		return delta + getSuffix('s', format, delta);
	} else if (delta < 55 * 60) {
		// Minutes
		minutes = Math.round(delta / 60);
		return minutes + getSuffix('m', format, minutes);
	} else if (isToday(then) || (extendedFormatting && isWithin24Hours(then))) {
		// Hours
		hours = Math.round(delta / 3600);
		return hours + getSuffix('h', format, hours);
	} else if (extendedFormatting && isWithinPastWeek(then)) {
		// Days
		days = Math.round(delta / 3600 / 24);
		return days + getSuffix('d', format, days);
	} else if (isYesterday(then)) {
		// Yesterday
		return `Yesterday${withTime(then)}`;
	} else if (delta < 5 * 24 * 60 * 60) {
		// Less than 5 days (and *not* extendedFormatting)
		return (
			[
				dayOfWeek(then.getDay()),
				then.getDate(),
				monthAbbr(then.getMonth()),
				then.getFullYear(),
			].join(' ') + (opts.showTime ? withTime(then) : '')
		);
	}
	return (
		// Default: long description + optional time
		[then.getDate(), monthAbbr(then.getMonth()), then.getFullYear()].join(
			' ',
		) + (opts.showTime ? withTime(then) : '')
	);
	/* eslint-enable no-else-return */
};
