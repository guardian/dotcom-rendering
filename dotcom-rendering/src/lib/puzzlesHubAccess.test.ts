import {
	isPuzzlesHubAvailable,
	PUZZLES_HUB_EDITIONS,
} from './puzzlesHubAccess';

describe('isPuzzlesHubAvailable', () => {
	it.each(['INT', 'EUR', 'AU', 'US', 'UK'] as const)(
		'is true for the %s edition',
		(edition) => {
			expect(isPuzzlesHubAvailable({ edition })).toBe(true);
		},
	);

	it('lists every edition for now', () => {
		expect(PUZZLES_HUB_EDITIONS).toEqual(['INT', 'EUR', 'AU', 'US', 'UK']);
	});
});
