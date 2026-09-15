/**
 * Formats a `PuzzlePageInstance.puzzleDate` (a plain `YYYY-MM-DD` string,
 * e.g. `"2026-09-15"`) as a human-readable date, e.g. `"15 September 2026"`,
 * for display next to the Puzzle Page title. Returns `null` for a missing
 * or unparseable value so callers can simply skip rendering.
 *
 * Parsed as UTC midnight (rather than via the parseable-but-timezone-shifting
 * `new Date("2026-09-15")` in some environments) so the displayed date
 * always matches the calendar date frontend resolved, regardless of the
 * server/reader's local timezone.
 */
export const formatPuzzleDate = (
	puzzleDate: string | undefined,
): string | null => {
	if (!puzzleDate) return null;

	const date = new Date(`${puzzleDate}T00:00:00Z`);
	if (Number.isNaN(date.getTime())) return null;

	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
};

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

/**
 * Formats a `PuzzlePageInstance.puzzleDate` (a plain `YYYY-MM-DD` string) as
 * the short "d MMM yy" form used in SEO title/meta-description templates
 * (`PuzzleConfig.title`/`description`, resolved via
 * `resolvePuzzleTitle`/`resolvePuzzleDescription`), e.g.
 * `"2026-09-15" -> "15 Sep 26"`. Deliberately distinct from
 * `formatPuzzleDate` above (the long, human-readable on-page display
 * form, e.g. "15 September 2026") - the two are used in different places
 * and should not be conflated.
 *
 * Built with a fixed month-abbreviation lookup (mirroring the existing
 * `getMonthString` pattern in `src/lib/discussionDateFormatter.ts`) rather
 * than `Intl.DateTimeFormat`'s `month: 'short'`, since `en-GB` renders
 * September as "Sept" (four letters), not the three-letter "Sep" the
 * product spreadsheet's copy requires.
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
