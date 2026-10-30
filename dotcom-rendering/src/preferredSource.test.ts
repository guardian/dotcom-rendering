import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from './lib/articleFormat';
import { hasPreferredSourceButton } from './preferredSource';

const trivia = {
	design: ArticleDesign.Crossword,
	display: ArticleDisplay.Standard,
	theme: ArticleSpecial.Labs,
};

describe('hasPreferredSourceButton', () => {
	it('allows the button on puzzle pages using the Labs palette', () => {
		expect(hasPreferredSourceButton('Web', trivia, true)).toBe(true);
	});

	it('continues to exclude actual Labs content by default', () => {
		expect(hasPreferredSourceButton('Web', trivia)).toBe(false);
		expect(
			hasPreferredSourceButton('Web', {
				...trivia,
				design: ArticleDesign.Standard,
			}),
		).toBe(false);
	});

	it('keeps existing word-game eligibility unchanged', () => {
		expect(
			hasPreferredSourceButton('Web', {
				...trivia,
				theme: Pillar.Opinion,
			}),
		).toBe(true);
	});

	it('does not show the button in apps even for puzzle pages', () => {
		expect(hasPreferredSourceButton('Apps', trivia, true)).toBe(false);
	});

	it.each([ArticleSpecial.SpecialReport, ArticleSpecial.SpecialReportAlt])(
		'preserves the excluded theme %s',
		(theme) => {
			expect(
				hasPreferredSourceButton('Web', { ...trivia, theme }, true),
			).toBe(false);
		},
	);

	it('preserves excluded article designs', () => {
		expect(
			hasPreferredSourceButton(
				'Web',
				{ ...trivia, design: ArticleDesign.LiveBlog },
				true,
			),
		).toBe(false);
	});
});
