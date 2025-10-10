import { isString, isUndefined } from '@guardian/libs';
import { getEditionFromId } from '../lib/edition';
import { useConfig } from './ConfigContext';
import { useDateTime } from './DateTimeContext';
import { Island } from './Island';
import { RelativeTime } from './RelativeTime.importable';

type Props = {
	date: Date;
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

const ONE_MINUTE = 60_000;
const MAX_DATE = 8.64e15;

export const DateTime = ({
	date,
	showWeekday,
	showDate,
	showTime,
	display = 'absolute',
	absoluteServerTimes = true,
}: Props & DisplayProps) => {
	const { editionId } = useConfig();
	const { dateLocale, timeZone } = getEditionFromId(editionId);
	const serverTime = useDateTime();

	/**
	 * `serverTime` is rounded down to the previous minute to ensure relative
	 * times rarely go backwards. If undefined or `absoluteServerTimes` is true
	 * we use the maximum value that can be represented by a `Date` object [1]
	 * to force display as an absolute date due to `then` being far in the past.
	 *
	 * [1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
	 */
	const now =
		isUndefined(serverTime) || absoluteServerTimes
			? MAX_DATE
			: Math.floor(serverTime / ONE_MINUTE) * ONE_MINUTE;
	const then = date.getTime();

	return display === 'relative' ? (
		<Island priority="enhancement" defer={{ until: 'visible' }}>
			<RelativeTime then={then} now={now} editionId={editionId} />
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
