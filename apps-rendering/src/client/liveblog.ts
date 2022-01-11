import { ResultKind } from '@guardian/types';
import { formatLocalTimeDateTz } from 'date';
import { dateParser, parse } from 'parser';
import { logger } from '../logger';

function lastUpdatedDates(): void {
	Array.from(document.querySelectorAll('time[data-relativeformat]'))
		.forEach((element) => {
			if (element instanceof HTMLElement) {
				const { relativeformat : relativeFormat } = element.dataset;
				const isoDateTimeString = element.getAttribute('dateTime');
				const date = parse(dateParser)(isoDateTimeString);

				switch (relativeFormat) {
					case 'local':
						if (date.kind === ResultKind.Ok) {
							element.textContent = `Updated: ${formatLocalTimeDateTz(
								date.value,
							)}`;
						} else {
							logger.warn(`Unable to parse and format date: ${date.err}`);
						}
						break;
				}
			}
		},
	);
}

lastUpdatedDates();
