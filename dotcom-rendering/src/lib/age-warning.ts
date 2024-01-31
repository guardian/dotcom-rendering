import type { TagType } from '../types/tag';

export const getAgeWarning = (
	tags: TagType[],
	webPublicationDate: string,
): string | undefined => {
	const tagsWithoutAgeWarning = [
		'tone/help',
		'info/info',
		'tone/recipes',
		'lifeandstyle/series/sudoku',
		'type/crossword',
		'lifeandstyle/series/kakuro',
		'the-scott-trust/the-scott-trust',
		'type/signup',
		'info/newsletter-sign-up',
		'guardian-live-events/guardian-live-events',
		'news/series/cotton-capital',
	];
	const showAge = !tags.some(({ id }) => tagsWithoutAgeWarning.includes(id));

	let message;

	if (showAge) {
		const warnLimitDays = 30;
		const currentDate = new Date();
		const dateThreshold = new Date();

		dateThreshold.setDate(currentDate.getDate() - warnLimitDays);

		const publicationDate = new Date(webPublicationDate);

		// if the publication date is before the date threshold generate message
		if (publicationDate < dateThreshold) {
			// Unary + coerces dates to numbers for TypeScript
			const diffMilliseconds = +currentDate - +publicationDate;
			const diffSeconds = Math.floor(diffMilliseconds / 1000);
			const diffMinutes = diffSeconds / 60;
			const diffHours = diffMinutes / 60;
			const diffDays = diffHours / 24;
			const diffMonths = diffDays / 31;
			const diffYears = diffDays / 365;

			if (diffYears >= 2) {
				message = `${Math.floor(diffYears)} years old`;
			} else if (diffYears > 1) {
				message = '1 year old';
			} else if (diffMonths >= 2) {
				message = `${Math.floor(diffMonths)} months old`;
			} else if (diffMonths > 1) {
				message = '1 month old';
			}
		}
	}
	return message;
};
