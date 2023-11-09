// ----- Imports ----- //

import {
	Grid,
	span,
	spanTablet,
	spanDesktop,
	spanLeftCol,
	spanWide,
} from './span';

// ----- Tests ----- //

describe('span', () => {
	describe('spanTablet', () => {
		it('calculates the width of 5 columns for a tablet grid', () => {
			expect(spanTablet(5)).toBe(280);
		});
	});

	describe('spanDesktop', () => {
		it('calculates the width of 6 columns for a desktop grid', () => {
			expect(spanDesktop(6)).toBe(460);
		});
	});

	describe('spanLeftCol', () => {
		it('calculates the width of 7 columns for a leftCol grid', () => {
			expect(spanLeftCol(7)).toBe(540);
		});
	});

	describe('spanWide', () => {
		it('calculates the width of 8 columns for a wide grid', () => {
			expect(spanWide(8)).toBe(620);
		});
	});

	describe('span', () => {
		it('calculates the width of 8 columns for a tablet grid', () => {
			expect(span(Grid.Tablet)(8)).toBe(460);
		});
		it('calculates the width of 7 columns for a desktop grid', () => {
			expect(span(Grid.Desktop)(7)).toBe(540);
		});
		it('calculates the width of 6 columns for a leftCol grid', () => {
			expect(span(Grid.LeftCol)(6)).toBe(460);
		});
		it('calculates the width of 5 columns for a wide grid', () => {
			expect(span(Grid.Wide)(5)).toBe(380);
		});
	});
});
