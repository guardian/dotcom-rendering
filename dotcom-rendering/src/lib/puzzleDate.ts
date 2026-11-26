const shortMonths = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Formats a `PuzzlePageInstance.puzzleDate` (a plain `YYYY-MM-DD` string,
 * e.g. `"2026-09-16"`) as a human-readable date, e.g. `"Wed 16 Sep 2026"`,
 * for display next to the Puzzle Page title. This matches the real
 * crossword page's own dateline format (`ArticleMeta`/`Dateline.tsx`'s
 * `webPublicationDateDisplay`, e.g. "Wed 16 Sep 2026") - just without that
 * dateline's additional time-of-day suffix, since a puzzle date has no
 * meaningful time component. Returns `null` for a missing or unparseable
 * value so callers can simply skip rendering.
 *
 * Built with fixed weekday/month-abbreviation lookups rather than
 * `Intl.DateTimeFormat`'s `weekday: 'short'`/`month: 'short'`, for the same
 * reason `formatPuzzleDateShort` below already avoids it: `en-GB` renders
 * September as "Sept" (four letters, not the three-letter "Sep" the design
 * requires) and inserts a comma after the weekday (`"Wed, 16 Sept 2026"`),
 * neither of which matches the target format.
 *
 * Parsed as UTC midnight (rather than via the parseable-but-timezone-shifting
 * `new Date("2026-09-16")` in some environments) so the displayed date
 * always matches the calendar date frontend resolved, regardless of the
 * server/reader's local timezone.
 */
export const formatPuzzleDate = (
	puzzleDate: string | undefined,
): string | null => {
	if (!puzzleDate) return null;

	const date = new Date(`${puzzleDate}T00:00:00Z`);
	if (Number.isNaN(date.getTime())) return null;

	const weekday = shortWeekdays[date.getUTCDay()];
	const day = date.getUTCDate();
	const month = shortMonths[date.getUTCMonth()];
	const year = date.getUTCFullYear();

	return `${weekday} ${day} ${month} ${year}`;
};

/**
 * Formats a `PuzzlePageInstance.puzzleDate` (a plain `YYYY-MM-DD` string) as
 * the short "d MMM yy" form used in SEO title/meta-description templates
 * (`PuzzleConfig.title`/`description`, resolved via
 * `resolvePuzzleTitle`/`resolvePuzzleDescription`), e.g.
 * `"2026-09-15" -> "15 Sep 26"`. Deliberately distinct from
 * `formatPuzzleDate` above (the longer, dateline-style on-page display
 * form, e.g. "Wed 16 Sep 2026") - the two are used in different places and
 * should not be conflated.
 *
 * Returns `null` for a missing or unparseable value so callers can simply
 * skip interpolation.
 */
export const formatPuzzleDateShort = (
	puzzleDate: string | undefined,
): string | null => {
	if (!puzzleDate) return null;

	const date = new Date(`${puzzleDate}T00:00:00Z`);
	if (Number.isNaN(date.getTime())) return null;

	const day = date.getUTCDate();
	const month = shortMonths[date.getUTCMonth()];
	const year = String(date.getUTCFullYear()).slice(-2);

	return `${day} ${month} ${year}`;
};
