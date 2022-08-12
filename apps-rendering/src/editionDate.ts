import { Edition } from '@guardian/apps-rendering-api-models/edition';

type DateTimeParts = {
	[Property in Exclude<
		Intl.DateTimeFormatPartTypes,
		'literal' | 'dayPeriod' | 'era'
	>]: string;
};

const ukFormat = new Intl.DateTimeFormat('en-GB', {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	timeZone: 'Europe/London',
	timeZoneName: 'long',
	hour12: false,
});

const getFormat = (edition: Edition): Intl.DateTimeFormat => {
	switch (edition) {
		case Edition.UK:
		default:
			return ukFormat;
	}
};

const getDateParts = (
	date: Date,
	format: Intl.DateTimeFormat,
): DateTimeParts => {
	return format
		.formatToParts(date)
		.filter((part) => part.type !== 'literal')
		.reduce<DateTimeParts>((acc, curr) => {
			return {
				...acc,
				[curr.type]: curr.value,
			};
		}, {} as DateTimeParts);
};

const fullyFormatDate = (date: Date, edition: Edition): string => {
	const { hour, minute, day, weekday, month, year, timeZoneName } =
		getDateParts(date, getFormat(edition));
	return `${weekday} ${day} ${month} ${year} ${hour}.${minute} (${timeZoneName})`;
};

export { fullyFormatDate };
