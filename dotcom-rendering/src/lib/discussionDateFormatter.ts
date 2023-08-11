import { timeAgo } from '@guardian/libs';

const getMonthString = (month: number): string => {
	switch (month) {
		case 0:
			return 'Jan';
		case 1:
			return 'Feb';
		case 2:
			return 'Mar';
		case 3:
			return 'Apr';
		case 4:
			return 'May';
		case 5:
			return 'Jun';
		case 6:
			return 'Jul';
		case 7:
			return 'Aug';
		case 8:
			return 'Sep';
		case 9:
			return 'Oct';
		case 10:
			return 'Nov';
		case 11:
			return 'Dec';
		default:
			return '';
	}
};

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

	return `${date.getDate()} ${getMonthString(
		date.getMonth(),
	)} ${date.getFullYear()} ${date.getHours()}.${String(
		date.getMinutes(),
	).padStart(2, '0')}`;
};
