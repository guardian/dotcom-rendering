import { getCurrentSectionId } from './HorizontalTableOfContents.island';

describe('getCurrentSectionId', () => {
	const line = 60;

	it('returns undefined above the first heading', () => {
		expect(
			getCurrentSectionId(
				[
					{ id: 'a', top: 200 },
					{ id: 'b', top: 900 },
				],
				line,
			),
		).toBeUndefined();
	});

	it('returns the last heading scrolled past the line', () => {
		expect(
			getCurrentSectionId(
				[
					{ id: 'a', top: -800 },
					{ id: 'b', top: -100 },
					{ id: 'c', top: 400 },
				],
				line,
			),
		).toBe('b');
	});

	it('selects a heading scrolled exactly to its scroll margin', () => {
		expect(
			getCurrentSectionId(
				[
					{ id: 'a', top: -500 },
					{ id: 'b', top: 60.5 },
				],
				line,
			),
		).toBe('b');
	});

	it('goes back to the earlier section when scrolling up past a heading', () => {
		expect(
			getCurrentSectionId(
				[
					{ id: 'a', top: -500 },
					{ id: 'b', top: 120 },
				],
				line,
			),
		).toBe('a');
	});
});
