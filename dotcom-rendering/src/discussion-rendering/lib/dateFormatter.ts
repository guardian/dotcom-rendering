import { timeAgo } from '@guardian/libs';

const isLast24Hrs = (date: Date) => {
	const timeStamp = Math.round(new Date().getTime() / 1000);
	const timeStampYesterday = timeStamp - 24 * 3600;
	return date.getTime() >= new Date(timeStampYesterday * 1000).getTime();
};

export const dateFormatter = (dateString: string): string | false => {
	const date = new Date(dateString);

	if (isLast24Hrs(date)) {
		return timeAgo(date.getTime(), { verbose: true, daysUntilAbsolute: 1 });
	}

	const dateFormat = Intl.DateTimeFormat('en-gb', {
		dateStyle: 'medium', // 27 Jun 2023
	});
	const timeFormat = Intl.DateTimeFormat('en-gb', {
		timeStyle: 'short', // 20:46
	});
	return `${dateFormat.format(date)} ${timeFormat
		.format(date)
		.replace(':', '.')}`;
};
