import { ArticlePillar } from '@guardian/libs';
import { enumEntries } from './enumEntries';

describe('enumEntries', () => {
	it('should have the string keys of an numeric enum', () => {
		expect(Object.entries(ArticlePillar)).toEqual(
			expect.arrayContaining(enumEntries(ArticlePillar)),
		);
	});

	it('should have half as many keys as an numeric enum', () => {
		expect(Object.entries(ArticlePillar).length / 2).toEqual(
			enumEntries(ArticlePillar).length,
		);
	});

	it('should have no keys that are valid numeric strings', () => {
		expect(
			enumEntries(ArticlePillar).find(([key]) =>
				Number.isInteger(Number(key)),
			),
		).toBeUndefined();
	});
});
