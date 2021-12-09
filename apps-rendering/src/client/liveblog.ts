import { formatLocalTimeDateTz } from 'date';
import { logger } from '../logger';

function lastUpdatedDates(): void {
	Array.from(document.querySelectorAll('time[data-last-updated]')).forEach(
		(time) => {
			const isoDateTimeString = time.getAttribute('data-last-updated');
			try {
				if (isoDateTimeString) {
					time.textContent = `Updated: ${formatLocalTimeDateTz(
						new Date(isoDateTimeString),
					)}`;
				}
			} catch (e) {
				const message =
					isoDateTimeString ??
					'because the data-date attribute was empty';
				logger.error(`Unable to parse and format date ${message}`, e);
			}
		},
	);
}

lastUpdatedDates();
