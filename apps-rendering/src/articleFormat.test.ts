// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, Pillar } from 'articleFormat';
import { formatToString } from 'articleFormat';

// ----- Tests ----- //

describe('formatToString', () => {
	it('creates a string describing ArticleFormat', () => {
		const format = formatToString({
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Immersive,
			theme: Pillar.Culture,
		});

		expect(format).toBe(
			'Design: Standard, Display: Immersive, Theme: Culture',
		);
	});
});
