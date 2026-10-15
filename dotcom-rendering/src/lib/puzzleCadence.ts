import type { PuzzleItem } from '../types/puzzlesPage';

/**
 * The label of a puzzle card in the "More from Puzzles & games" rail: "Today"
 * for the current day (in London), otherwise the short date, e.g. "Sat 10 Oct".
 *
 * Mirrors `puzzleCardCadence` in `PuzzlesDirectoryProgress.island.tsx` (owned
 * by the Puzzles Hub team, so deliberately not shared) and the label `frontend`
 * computes for these cards (`PuzzleRecommendations.cadenceFor`).
 */
const londonDateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/London',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Europe/London',
	weekday: 'short',
	month: 'short',
	day: 'numeric',
});

type DatePart = 'year' | 'month' | 'day' | 'weekday';

const part = (parts: Intl.DateTimeFormatPart[], type: DatePart) =>
	parts.find((value) => value.type === type)?.value;

const londonDate = (date: Date): string | undefined => {
	const parts = londonDateFormatter.formatToParts(date);
	const year = part(parts, 'year');
	const month = part(parts, 'month');
	const day = part(parts, 'day');
	return year !== undefined && month !== undefined && day !== undefined
		? `${year}-${month}-${day}`
		: undefined;
};

/** `date` is a "yyyy-MM-dd" puzzle date. Undefined when it is not one. */
export const cadenceForDate = (
	date: string,
	today = new Date(),
): string | undefined => {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return undefined;
	if (date === londonDate(today)) return 'Today';

	const published = new Date(`${date}T12:00:00Z`);
	if (Number.isNaN(published.getTime())) return undefined;
	const parts = shortDateFormatter.formatToParts(published);
	const weekday = part(parts, 'weekday');
	const day = part(parts, 'day');
	const month = part(parts, 'month')?.slice(0, 3);
	return weekday !== undefined && day !== undefined && month !== undefined
		? `${weekday} ${day} ${month}`
		: undefined;
};

/**
 * `frontend` labels each card on the server, relative to its own "today", but
 * these pages can be cached and served after midnight, so the reader's browser
 * confirms the label against the card's own `date` and corrects it if it is
 * wrong. A card without a (valid) `date` is left as it was sent.
 */
export const withValidatedCadence = (
	items: PuzzleItem[],
	today = new Date(),
): PuzzleItem[] =>
	items.map((item) => {
		const cadence =
			item.date !== undefined
				? cadenceForDate(item.date, today)
				: undefined;
		return cadence !== undefined && cadence !== item.cadence
			? { ...item, cadence }
			: item;
	});
