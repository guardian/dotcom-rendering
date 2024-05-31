import { isString, timeAgo } from '@guardian/libs';
import { type EditionId, getEditionFromId } from '../lib/edition';
import { Island } from './Island';
import { RelativeTime } from './RelativeTime.importable';

type Props = {
	date: Date;
	editionId: EditionId;
	showWeekday: boolean;
	showDate: boolean;
	showTime: boolean;
};

type DisplayProps =
	| {
			display?: 'absolute';
			absoluteServerTimes?: never;
	  }
	| {
			display: 'relative';
			absoluteServerTimes: boolean;
	  };

const formatWeekday = (date: Date, locale: string, timeZone: string) =>
	date.toLocaleDateString(locale, {
		weekday: 'short',
		timeZone,
	});

const formatDate = (date: Date, locale: string, timeZone: string) =>
	date
		.toLocaleDateString(locale, {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			timeZone,
		})
		.replaceAll(',', '');

const formatTime = (date: Date, locale: string, timeZone: string) =>
	date
		.toLocaleTimeString(locale, {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short',
			timeZone,
		})
		.replace(':', '.');

/** Rounded up to the next minute as most pages are cached for a least a minute */
const getServerTime = (precision = 60_000) =>
	Math.ceil(Date.now() / precision) * precision;

export const DateTime = ({
	date,
	editionId,
	showWeekday,
	showDate,
	showTime,
	display = 'absolute',
	absoluteServerTimes = true,
}: Props & DisplayProps) => {
	const { dateLocale, timeZone } = getEditionFromId(editionId);

	const then = date.getTime();
	const relativeTime = display === 'relative' && timeAgo(then);
	const isRecent =
		isString(relativeTime) &&
		(relativeTime === 'now' || relativeTime.endsWith(' ago'));
	const now = absoluteServerTimes
		? Number.MAX_SAFE_INTEGER - 1
		: getServerTime();

	return isRecent ? (
		<Island priority="enhancement" defer={{ until: 'visible' }}>
			<RelativeTime then={then} now={now} />
		</Island>
	) : (
		<time
			dateTime={date.toISOString()}
			data-locale={dateLocale}
			title={date.toLocaleDateString(dateLocale, {
				hour: '2-digit',
				minute: '2-digit',
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZoneName: 'long',
				timeZone,
			})}
		>
			{[
				showWeekday && formatWeekday(date, dateLocale, timeZone),
				showDate && formatDate(date, dateLocale, timeZone),
				showTime && formatTime(date, dateLocale, timeZone),
			]
				.filter(isString)
				.join(' ')}
		</time>
	);
};
