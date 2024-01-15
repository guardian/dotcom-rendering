import { type EditionId, getEditionFromId } from '../lib/edition';

type Props = {
	date: Date;
	editionId: EditionId;
	show?: 'date & time' | 'date' | 'time';
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

export const DateTime = ({ date, editionId, show = 'date & time' }: Props) => {
	const { locale, timeZone } = getEditionFromId(editionId);
	return (
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
