export const getAgeWarning = (
	tags: TagType[],
	webPublicationDate: string,
): string | undefined => {
	const isNews = tags.some((t) => t.id === 'tone/news');
	const isOpinion = tags.some((t) => t.id === 'tone/comment');

	// Only show an age warning for news or opinion pieces
	if (isNews || isOpinion) {
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
			let message;

			if (diffYears >= 2) {
				message = `${Math.floor(diffYears)} years old`;
			} else if (diffYears > 1) {
				message = '1 year old';
			} else if (diffMonths >= 2) {
				message = `${Math.floor(diffMonths)} months old`;
			} else if (diffMonths > 1) {
				message = '1 month old';
			}

			return message;
		}
	}
};
