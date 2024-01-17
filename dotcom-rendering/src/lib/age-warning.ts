import type { TagType } from '../types/tag';

export const getAgeWarning = (
	tags: TagType[],
	webPublicationDate: string,
): string | undefined => {
	const isHelp = tags.some((t) => t.id === 'tone/help');
	const isInfo = tags.some((t) => t.id === 'info/info');
	const isRecipe = tags.some((t) => t.id === 'tone/recipes');
	const isSudoku = tags.some((t) => t.id === 'lifeandstyle/series/sudoku');
	const isCrossword = tags.some((t) => t.id === 'crossword');
	const isKakuro = tags.some((t) => t.id === 'lifeandstyle/series/kakuro');
	const isScottTrust = tags.some(
		(t) => t.id === 'the-scott-trust/the-scott-trust',
	);
	const isSignup = tags.some(
		(t) => t.id === 'signup' || t.id === 'info/newsletter-sign-up',
	);

	let message;

	// Only show an age warning for news or opinion pieces
	if (
		!(
			isHelp ||
			isInfo ||
			isScottTrust ||
			isSignup ||
			isRecipe ||
			isSudoku ||
			isCrossword ||
			isKakuro
		)
	) {
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
