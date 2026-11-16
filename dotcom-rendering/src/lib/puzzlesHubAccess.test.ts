import {
	isPuzzlesHubAvailable,
	PUZZLES_HUB_EDITIONS,
} from './puzzlesHubAccess';

describe('isPuzzlesHubAvailable', () => {
	it('is true for the International edition', () => {
		expect(isPuzzlesHubAvailable({ edition: 'INT' })).toBe(true);
	});

	it.each(['UK', 'US', 'AU', 'EUR'] as const)(
		'is false for the %s edition',
		(edition) => {
			expect(isPuzzlesHubAvailable({ edition })).toBe(false);
		},
	);

	it('only lists the International edition for now', () => {
		expect(PUZZLES_HUB_EDITIONS).toEqual(['INT']);
	});
});
