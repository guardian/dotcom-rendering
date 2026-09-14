import {
	getGandalfPageViewCount,
	incrementGandalfPageViewCount,
} from './gandalf';

// Mirrors the storage key shape in gandalf.ts
const countKey = 'gu.gandalf.pageViewCount';

describe('gandalf pageview counter', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe('getGandalfPageViewCount', () => {
		it('returns 0 when nothing is stored', () => {
			expect(getGandalfPageViewCount()).toBe(0);
		});

		it('returns the stored count', () => {
			localStorage.setItem(countKey, '4');
			expect(getGandalfPageViewCount()).toBe(4);
		});

		it('fails safe to 0 for malformed values', () => {
			localStorage.setItem(countKey, 'not-a-number');
			expect(getGandalfPageViewCount()).toBe(0);
		});

		it('fails safe to 0 for negative values', () => {
			localStorage.setItem(countKey, '-3');
			expect(getGandalfPageViewCount()).toBe(0);
		});
	});

	describe('incrementGandalfPageViewCount', () => {
		it('increments the count by one', () => {
			incrementGandalfPageViewCount('page-view-1');
			expect(getGandalfPageViewCount()).toBe(1);
		});

		it('is idempotent for the same pageview id', () => {
			incrementGandalfPageViewCount('page-view-1');
			incrementGandalfPageViewCount('page-view-1');
			incrementGandalfPageViewCount('page-view-1');
			expect(getGandalfPageViewCount()).toBe(1);
		});

		it('counts distinct pageview ids separately', () => {
			incrementGandalfPageViewCount('page-view-1');
			incrementGandalfPageViewCount('page-view-2');
			expect(getGandalfPageViewCount()).toBe(2);
		});

		it('continues from a pre-existing stored count', () => {
			localStorage.setItem(countKey, '2');
			incrementGandalfPageViewCount('page-view-1');
			expect(getGandalfPageViewCount()).toBe(3);
		});

		it('resets a malformed stored value to 1 on increment', () => {
			localStorage.setItem(countKey, 'garbage');
			incrementGandalfPageViewCount('page-view-1');
			expect(getGandalfPageViewCount()).toBe(1);
		});
	});
});
