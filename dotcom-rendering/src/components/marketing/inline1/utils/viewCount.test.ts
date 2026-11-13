import { storage } from '@guardian/libs';
import { getInline1Views, recordInline1View } from './viewCount';

const localStorageKey = 'gu.inline1.views';

describe('addView', () => {
	beforeEach(() => storage.local.remove(localStorageKey));

	it('stores the view when none exist', () => {
		recordInline1View('TEST_1', new Date('2026-01-01T00:00:00Z'));

		expect(getInline1Views()).toEqual([
			{ testId: 'TEST_1', date: Date.UTC(2026, 0, 1) },
		]);
	});

	it('adds the new view to the start of the array', () => {
		recordInline1View('OLD', new Date('2026-01-01T00:00:00Z'));
		recordInline1View('NEW', new Date('2026-01-02T00:00:00Z'));

		expect(getInline1Views().map((v) => v.testId)).toEqual(['NEW', 'OLD']);
	});

	it('keeps at most 50 entries, dropping the oldest', () => {
		const existing = Array.from({ length: 50 }, (_, i) => ({
			testId: `TEST_${i}`,
			date: i,
		}));
		storage.local.set(localStorageKey, existing);

		recordInline1View('NEWEST', new Date(1_000));

		const views = getInline1Views();
		expect(views).toHaveLength(50);
		expect(views[0]?.testId).toBe('NEWEST');
		expect(views[49]?.testId).toBe('TEST_48');
		expect(views.some((v) => v.testId === 'TEST_49')).toBe(false);
	});

	it('filters out invalid items in the stored array', () => {
		storage.local.set(localStorageKey, [
			{ testId: 'VALID', date: 1_000 },
			{ testId: 'MISSING_DATE' },
			{ date: 2_000 },
			{ testId: 'WRONG_DATE_TYPE', date: '3000' },
			{ testId: 42, date: 4_000 },
			'not-an-object',
			null,
		]);

		expect(getInline1Views()).toEqual([{ testId: 'VALID', date: 1_000 }]);
	});

	it('ignores corrupt stored data and starts a fresh list', () => {
		window.localStorage.setItem(localStorageKey, 'not-json');

		recordInline1View('TEST_1', new Date(1_000));

		expect(getInline1Views()).toEqual([{ testId: 'TEST_1', date: 1_000 }]);
	});
});
