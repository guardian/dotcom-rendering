import { ResultKind } from '@guardian/types';
import { formatLocalTimeDateTz } from 'date';
import { dateParser, parse } from 'parser';
import { logger } from '../logger';

function lastUpdatedDates(): void {
	Array.from(document.getElementsByClassName('js-last-updated-time')).forEach(
		(time) => {
			const isoDateTimeString = time.getAttribute('data-last-updated');
			const date = parse(dateParser)(isoDateTimeString);

			if (date.kind === ResultKind.Ok) {
				time.textContent = `Updated: ${formatLocalTimeDateTz(
					date.value,
				)}`;
			} else {
				logger.warn(`Unable to parse and format date: ${date.err}`);
			}
		},
	);
}

lastUpdatedDates();
