import { formatLocalTimeDateTz } from 'date';
import { dateParser, parse } from 'parser';
import { logger } from '../logger';

function lastUpdatedDates(): void {
	Array.from(document.getElementsByClassName('js-last-updated-time')).forEach(
		(element) => {
			const isoDateTimeString = element.getAttribute('datetime');
			const date = parse(dateParser)(isoDateTimeString);

			if (date.isOk()) {
				element.textContent = `Updated: ${formatLocalTimeDateTz(
					date.value,
				)}`;
			} else if (date.isErr()) {
				logger.warn(`Unable to parse and format date: ${date.error}`);
			}
		},
	);
}

lastUpdatedDates();
