import { timeAgo } from '@guardian/libs';

const monthConverter: { [key: number]: string } = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec',
};

const isLast24Hrs = (date: Date) => {
	const timeStamp = Math.round(new Date().getTime() / 1000);
	const timeStampYesterday = timeStamp - 24 * 3600;
	return date.getTime() >= new Date(timeStampYesterday * 1000).getTime();
};

export const dateFormatter = (dateString: string) => {
	const date = new Date(dateString);

	if (isLast24Hrs(date)) {
		return timeAgo(date.getTime(), { verbose: true, daysUntilAbsolute: 1 });
	}

	return `${date.getDate()} ${
		monthConverter[date.getMonth()]
	} ${date.getFullYear()} ${date.getHours()}.${String(
		date.getMinutes(),
	).padStart(2, '0')}`;
};
