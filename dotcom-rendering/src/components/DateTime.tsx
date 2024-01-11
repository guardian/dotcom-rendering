import { type EditionId, getEditionFromId } from '../lib/edition';

type Props = {
	date: Date;
	edition: EditionId;
};

export const DateTime = ({ date, edition }: Props) => {
	const { locale, timeZone } = getEditionFromId(edition);
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
			{date
				.toLocaleDateString(locale, {
					weekday: 'short',
					day: 'numeric',
					month: 'short',
					year: 'numeric',
					timeZone,
				})
				.replaceAll(',', '')}{' '}
			{date
				.toLocaleTimeString(locale, {
					hour12: false,
					hour: '2-digit',
					minute: '2-digit',
					timeZoneName: 'short',
					timeZone,
				})
				.replace(':', '.')}
		</time>
	);
};
