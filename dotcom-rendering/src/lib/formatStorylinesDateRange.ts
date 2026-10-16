/**
 * Formats the human-readable "curated from …" date range shown beneath the
 * Storylines section.
 *
 * The date is pinned to `Europe/London` and formatted with a single
 * `Intl`-backed formatter. This avoids two bugs that arise from using the
 * runtime's local timezone:
 *   1. a server (UTC) vs client (viewer local time) hydration mismatch, and
 *   2. the day rolling over to the wrong date near midnight.
 *
 * Invalid or missing dates are treated as absent so we never render `NaN`.
 */
export function formatStorylinesDateRange(
	earliestArticleTime?: string | null,
	latestArticleTime?: string | null,
): string {
	const parse = (value?: string | null): Date | null => {
		if (value === undefined || value === null || value === '') return null;
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? null : date;
	};

	const format = (date: Date): string =>
		date.toLocaleDateString('en-GB', {
			timeZone: 'Europe/London',
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
