import {
	getModalMaxHeight,
	hasMoreToScroll,
	shouldFlowWithPage,
} from './premiumPuzzlesModalLayout';

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

describe('shouldFlowWithPage', () => {
	it('is false when the room under the header fits the smallest sheet', () => {
		expect(
			shouldFlowWithPage({ viewportHeight: 812, wrapperTop: 220 }),
		).toBe(false);
	});

	it('is false when the room is exactly the smallest sheet', () => {
		expect(
			shouldFlowWithPage({ viewportHeight: 520, wrapperTop: 200 }),
		).toBe(false);
	});

	it('is true when the room under the header is smaller than the smallest sheet', () => {
		expect(
			shouldFlowWithPage({ viewportHeight: 480, wrapperTop: 192 }),
		).toBe(true);
		expect(
			shouldFlowWithPage({ viewportHeight: 360, wrapperTop: 225 }),
		).toBe(true);
	});

	it('is true when the header is taller than the screen', () => {
		expect(
			shouldFlowWithPage({ viewportHeight: 600, wrapperTop: 900 }),
		).toBe(true);
	});
});

describe('hasMoreToScroll', () => {
	it('is false when the content fits', () => {
		expect(
			hasMoreToScroll({
				clientHeight: 365,
				scrollHeight: 365,
				scrollTop: 0,
			}),
		).toBe(false);
	});

	it('ignores a difference of one pixel, which is only rounding', () => {
		expect(
			hasMoreToScroll({
				clientHeight: 365,
				scrollHeight: 366,
				scrollTop: 0,
			}),
		).toBe(false);
	});

	it('is true when there is more below, even by a few pixels, as on an iPhone 16', () => {
		expect(
			hasMoreToScroll({
				clientHeight: 396,
				scrollHeight: 404,
				scrollTop: 0,
			}),
		).toBe(true);
	});

	it('is true part of the way through the scroll', () => {
		expect(
			hasMoreToScroll({
				clientHeight: 300,
				scrollHeight: 500,
				scrollTop: 120,
			}),
		).toBe(true);
	});

	it('is false once the reader has scrolled to the end', () => {
		expect(
			hasMoreToScroll({
				clientHeight: 396,
				scrollHeight: 404,
				scrollTop: 8,
			}),
		).toBe(false);
	});
});
