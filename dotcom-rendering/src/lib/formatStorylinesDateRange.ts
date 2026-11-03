import { type EditionId, getEditionFromId } from './edition';

/**
 * Formats the human-readable "curated from …" date range shown beneath the
 * Storylines section.
 *
 * The pattern of using the editionalised time but with fixed en-GB formatting
 * is adopted from `groupTrailsByDates.ts`.
 */
export function formatStorylinesDateRange(
	earliestArticleTime?: string | null,
	latestArticleTime?: string | null,
	editionId: EditionId = 'UK',
): string {
	const { timeZone } = getEditionFromId(editionId);

	const parse = (value?: string | null): Date | null => {
		if (value === undefined || value === null || value === '') return null;
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? null : date;
	};

	const format = (date: Date): string =>
		date.toLocaleDateString('en-GB', {
			timeZone,
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});

	const earliest = parse(earliestArticleTime);
	const latest = parse(latestArticleTime);

	if (earliest) {
		return `articles published since ${format(earliest)}`;
	}
	if (latest) {
		return `articles published up to ${format(latest)}`;
	}
	return 'recent articles in our archives';
}
