import {
	getGandalfPageViewCount,
	incrementGandalfPageViewCount,
} from './gandalf';

// Mirrors the storage key shape in gandalf.ts
const countKey = (countryCode: string): string =>
	`gu.gandalf.pageViewCount.${countryCode.toLowerCase()}`;

describe('gandalf pageview counter', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	describe('getGandalfPageViewCount', () => {
		it('returns 0 when nothing is stored for the country', () => {
			expect(getGandalfPageViewCount('NZ')).toBe(0);
		});

		it('returns the stored count for the country', () => {
			localStorage.setItem(countKey('NZ'), '4');
			expect(getGandalfPageViewCount('NZ')).toBe(4);
		});

		it('fails safe to 0 for malformed values', () => {
			localStorage.setItem(countKey('NZ'), 'not-a-number');
			expect(getGandalfPageViewCount('NZ')).toBe(0);
		});

		it('fails safe to 0 for negative values', () => {
			localStorage.setItem(countKey('NZ'), '-3');
			expect(getGandalfPageViewCount('NZ')).toBe(0);
		});
	});

	describe('incrementGandalfPageViewCount', () => {
		it('increments the country count by one', () => {
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			expect(getGandalfPageViewCount('NZ')).toBe(1);
		});

		it('keeps one counter per country', () => {
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			incrementGandalfPageViewCount('NZ', 'page-view-2');
			incrementGandalfPageViewCount('AU', 'page-view-2');
			expect(getGandalfPageViewCount('NZ')).toBe(2);
			expect(getGandalfPageViewCount('AU')).toBe(1);
		});

		it('is idempotent for the same pageview id within a country', () => {
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			expect(getGandalfPageViewCount('NZ')).toBe(1);
		});

		it('counts the same pageview id separately per country', () => {
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			incrementGandalfPageViewCount('AU', 'page-view-2');
			expect(getGandalfPageViewCount('NZ')).toBe(1);
			expect(getGandalfPageViewCount('AU')).toBe(1);
		});

		it('continues from a pre-existing stored count', () => {
			localStorage.setItem(countKey('NZ'), '2');
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			expect(getGandalfPageViewCount('NZ')).toBe(3);
		});

		it('resets a malformed stored value to 1 on increment', () => {
			localStorage.setItem(countKey('NZ'), 'garbage');
			incrementGandalfPageViewCount('NZ', 'page-view-1');
			expect(getGandalfPageViewCount('NZ')).toBe(1);
		});
	});
});
