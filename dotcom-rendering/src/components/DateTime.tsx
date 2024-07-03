import { isString } from '@guardian/libs';
import { getEditionFromId } from '../lib/edition';
import { useConfig } from './ConfigContext';
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
/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date */
const MAX_DATE = 8.64e15;
/** Rounded down to the previous minute, to ensure relative times rarely go backwards */
const getServerTime = () => Math.floor(Date.now() / ONE_MINUTE) * ONE_MINUTE;

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

	const then = date.getTime();

	return display === 'relative' ? (
		<Island priority="enhancement" defer={{ until: 'visible' }}>
			<RelativeTime
				then={then}
				now={absoluteServerTimes ? MAX_DATE : getServerTime()}
				editionId={editionId}
			/>
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
