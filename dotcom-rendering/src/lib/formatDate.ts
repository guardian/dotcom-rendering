import {
	type EditionId,
	getLocaleFromEdition,
	getTimeZoneFromEdition,
} from './edition';

/**
 * Returns a localised date and time string for the given match kick off time.
 * If the match is today in the current timezone, 'Today' is shown instead of
 * the full date.
 *
 * Sunday, 15 Feb 2026, 7:30 pm GMT
 * Today, 7:30 pm GMT
 */
export const formatMatchKickOffTime = (
	kickOff: Date,
	edition: EditionId,
): string => {
	const locale = getLocaleFromEdition(edition);
	const timeZone = getTimeZoneFromEdition(edition);

	const getLocalisedDateString = (date: Date) =>
		date.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			timeZone,
		});

	const isToday =
		getLocalisedDateString(kickOff) === getLocalisedDateString(new Date());

	const timeFormatter = new Intl.DateTimeFormat(locale, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		timeZoneName: 'short',
		timeZone,
	});

	const dateFormatter = new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		weekday: 'long',
		timeZone,
	});

	const formattedDate = isToday ? 'Today' : dateFormatter.format(kickOff);
	const formattedTime = timeFormatter.format(kickOff);

	return `${formattedDate}, ${formattedTime}`;
};
