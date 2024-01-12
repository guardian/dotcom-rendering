import { isString, timeAgo } from '@guardian/libs';
import { type EditionId, getEditionFromId } from '../lib/edition';
import { Island } from './Island';
import { RelativeTime } from './RelativeTime.importable';

type Props = {
	date: Date;
	editionId: EditionId;
	show?: 'date & time' | 'date' | 'time';
	display?: 'absolute' | 'relative';
};

const formatDate = (date: Date, locale: string, timeZone: string) =>
	date
		.toLocaleDateString(locale, {
			weekday: 'short',
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

export const DateTime = ({
	date,
	editionId,
	show = 'date & time',
	display = 'absolute',
}: Props) => {
	const { locale, timeZone } = getEditionFromId(editionId);

	const epoch = date.getTime();
	const relativeTime = display === 'relative' && timeAgo(epoch);
	const isRecent = isString(relativeTime) && relativeTime.endsWith(' ago');

	return isRecent ? (
		<Island priority="enhancement" defer={{ until: 'visible' }}>
			<RelativeTime then={epoch} />
		</Island>
	) : (
		<time
			dateTime={date.toISOString()}
			data-locale={locale}
			title={date.toLocaleDateString(locale, {
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
			{show.includes('date') && formatDate(date, locale, timeZone)}{' '}
			{show.includes('time') && formatTime(date, locale, timeZone)}
		</time>
	);
};
