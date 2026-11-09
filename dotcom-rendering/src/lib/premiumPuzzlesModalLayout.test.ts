import { getModalMaxHeight } from './premiumPuzzlesModalLayout';

describe('getModalMaxHeight', () => {
	it('uses 70% of the screen when there is room under the header', () => {
		expect(
			getModalMaxHeight({ viewportHeight: 1000, wrapperTop: 200 }),
		).toBe(700);
	});

	it('is limited to the room under the header, so the buttons are not below the fold', () => {
		expect(
			getModalMaxHeight({ viewportHeight: 812, wrapperTop: 400 }),
		).toBe(412);
	});

	it('never goes below the minimum, even with a very tall header', () => {
		expect(
			getModalMaxHeight({ viewportHeight: 812, wrapperTop: 700 }),
		).toBe(320);
	});

	it('never goes above the screen, even if the screen is smaller than the minimum', () => {
		expect(
			getModalMaxHeight({ viewportHeight: 300, wrapperTop: 100 }),
		).toBe(300);
	});

	it('rounds to whole pixels', () => {
		expect(
			getModalMaxHeight({ viewportHeight: 813, wrapperTop: 100 }),
		).toBe(569);
	});
});
