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
