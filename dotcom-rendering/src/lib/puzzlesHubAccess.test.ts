import {
	isPuzzlesHubAvailable,
	PUZZLES_HUB_EDITIONS,
} from './puzzlesHubAccess';

describe('isPuzzlesHubAvailable', () => {
	it.each(['INT', 'EUR', 'AU'] as const)(
		'is true for the %s edition',
		(edition) => {
			expect(isPuzzlesHubAvailable({ edition })).toBe(true);
		},
	);

	it.each(['UK', 'US'] as const)('is false for the %s edition', (edition) => {
		expect(isPuzzlesHubAvailable({ edition })).toBe(false);
	});

	it('only lists the International, Europe and Australia editions for now', () => {
		expect(PUZZLES_HUB_EDITIONS).toEqual(['INT', 'EUR', 'AU']);
	});
});
