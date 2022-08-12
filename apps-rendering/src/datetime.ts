// ----- Imports ----- //

import { Edition } from '@guardian/apps-rendering-api-models/edition';

// ----- Formatters ----- //

/**
 * Creates a formatter object that can be used to format Dates into a given
 * `timeZone` using British English style. Creates datetimes of the form:
 * Fri, 12 Aug 2022, 11:59
 *
 * @param timeZone A timezone string of the form: Europe/London
 */
const dateTimeFormatter = (timeZone: string): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat('en-GB', {
		weekday: 'short', // Mon, Tue etc.
		year: 'numeric', // 2022
		month: 'short', // Jan, Feb etc.
		day: 'numeric', // 1, 2, 12 etc.
		hour: 'numeric', // 01, 02, 14 etc.
		minute: 'numeric', // 01, 34 etc.
		timeZone,
		hour12: false, // 02, 15 etc.
	});

/**
 * Creates a formatter object that can be used to format Dates into a given
 * `timeZone` using a style defined by `locale`. Creates times of the form:
 * 11:59 BST
 *
 * @param timeZone A timezone string of the form: Europe/London
 * @param locale A locale string of the form: en-GB
 */
const timeFormatter = (timeZone: string, locale: string): Intl.DateTimeFormat =>
	new Intl.DateTimeFormat(locale, {
		hour: 'numeric', // 01, 02, 14 etc.
		minute: 'numeric', // 01, 34 etc.
		hour12: false, // 02, 15 etc.
		timeZone,
		timeZoneName: 'short', // BST, EST, AEST etc.
	});

/**
 * A set of datetime and time formatters, configured to display dates and times
 * in the formats used by different Guardian editions
 */
const formatters = {
	dateTime: {
		[Edition.UK]: dateTimeFormatter('Europe/London'),
		[Edition.US]: dateTimeFormatter('America/New_York'),
		[Edition.AU]: dateTimeFormatter('Australia/Sydney'),
		[Edition.INTERNATIONAL]: dateTimeFormatter('Europe/London'),
	},
	time: {
		[Edition.UK]: timeFormatter('Europe/London', 'en-GB'),
		[Edition.US]: timeFormatter('America/New_York', 'en-US'),
		[Edition.AU]: timeFormatter('Australia/Sydney', 'en-AU'),
		[Edition.INTERNATIONAL]: timeFormatter('Europe/London', 'en-GB'),
	},
};

// ----- Functions ----- //

/**
 * Formats a Date into a timestamp string, using Guardian style and in the
 * timezone of a given `Edition`
 *
 * @param edition A Guardian `Edition`
 * @returns A timestamp string of the form: 11.59 BST
 */
const timestampFormat =
	(edition: Edition) =>
	(date: Date): string =>
		formatters.time[edition].format(date).replace(':', '.');

/**
 * Creates a datetime string of the form: Fri 12 Aug 2022 11.59
 */
const dateTimeWithoutTimezone =
	(edition: Edition) =>
	(date: Date): string =>
		formatters.dateTime[edition]
			.format(date)
			.replace(/,/g, '')
			.replace(':', '.');

/**
 * Creates a timezone abbreviation of the form: BST, EST, AEST etc.
 */
const timeZoneAbbr =
	(edition: Edition) =>
	(date: Date): string =>
		timestampFormat(edition)(date).split(' ').pop() ?? '';

/**
 * Formats a Date into a datetime string, using Guardian style and in the
 * timezone of a given `Edition`
 *
 * @param edition A Guardian `Edition`
 * @returns A datetime string of the form: Fri 12 Aug 2022 11.59 BST
 */
const datetimeFormat =
	(edition: Edition) =>
	(date: Date): string =>
		`${dateTimeWithoutTimezone(edition)(date)} ${timeZoneAbbr(edition)(
			date,
		)}`;

// ----- Exports ----- //

export { timestampFormat, datetimeFormat };
