import { storage } from '@guardian/libs';
import { getInline1Views, recordInline1View } from './viewCount';

const localStorageKey = 'gu.inline1.views';

describe('addView', () => {
	beforeEach(() => storage.local.remove(localStorageKey));

	it('stores the view when none exist', () => {
		recordInline1View('TEST_1', new Date('2026-01-01T00:00:00Z'));

		expect(getInline1Views()).toEqual([
			{ testName: 'TEST_1', timestamp: Date.UTC(2026, 0, 1) },
		]);
	});

	it('adds the new view to the start of the array', () => {
		recordInline1View('OLD', new Date('2026-01-01T00:00:00Z'));
		recordInline1View('NEW', new Date('2026-01-02T00:00:00Z'));

		expect(getInline1Views().map((v) => v.testName)).toEqual([
			'NEW',
			'OLD',
		]);
	});

	it('keeps at most 50 entries, dropping the oldest', () => {
		const existing = Array.from({ length: 50 }, (_, i) => ({
			testName: `TEST_${i}`,
			timestamp: i,
		}));
		storage.local.set(localStorageKey, existing);

		recordInline1View('NEWEST', new Date(1_000));

		const views = getInline1Views();
		expect(views).toHaveLength(50);
		expect(views[0]?.testName).toBe('NEWEST');
		expect(views[49]?.testName).toBe('TEST_48');
		expect(views.some((v) => v.testName === 'TEST_49')).toBe(false);
	});

	it('ignores corrupt stored data and starts a fresh list', () => {
		window.localStorage.setItem(localStorageKey, 'not-json');

		recordInline1View('TEST_1', new Date(1_000));

		expect(getInline1Views()).toEqual([
			{ testName: 'TEST_1', timestamp: 1_000 },
		]);
	});
});
