import { puzzlesPageTheme } from './puzzlesTheme';

const darkBlock = (css: string): string => {
	const start = css.indexOf('prefers-color-scheme: dark');
	return start === -1 ? '' : css.slice(start);
};

const calendarDayVariables = [
	['--puzzles-completed-day-background', '#185E36'],
	['--puzzles-completed-day-icon', '#99E5BA'],
	['--puzzles-in-progress-day-background', '#672005'],
] as const;

describe('puzzlesPageTheme calendar day colours', () => {
	it.each(calendarDayVariables)(
		'sets %s to %s in dark mode',
		(variable, colour) => {
			const dark = darkBlock(puzzlesPageTheme(true).styles);
			expect(dark).toContain(`${variable}: ${colour}`);
		},
	);

	it.each(calendarDayVariables)(
		'leaves %s unset outside dark mode, so the calendar keeps its light colours',
		(variable) => {
			const light = puzzlesPageTheme(true).styles.split(
				'prefers-color-scheme: dark',
			)[0];
			expect(light).not.toContain(variable);
			expect(puzzlesPageTheme(false).styles).not.toContain(variable);
		},
	);
});
