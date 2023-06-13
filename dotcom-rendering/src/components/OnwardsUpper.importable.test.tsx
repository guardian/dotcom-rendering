import { firstPopularTag } from './OnwardsUpper.importable';

describe('firstPopularTag', () => {
	it('finds a matching tag', () => {
		const keywordIds = [
			'sport/cricket',
			'football/championsleague',
			'football/tottenham-hotspur',
		].join(',');

		expect(firstPopularTag(keywordIds, false)).toBe('sport/cricket');
	});

	it('finds a matching tag of higher importance at the end of a list', () => {
		const keywordIds = [
			'football/tottenham-hotspur',
			'football/championsleague',
			'sport/cricket',
		].join(',');

		expect(firstPopularTag(keywordIds, false)).toBe('sport/cricket');
	});

	it('returns the first tag for paid content', () => {
		const keywordIds = [
			'some/tag',
			'sport/cricket',
			'football/championsleague',
			'football/tottenham-hotspur',
		].join(',');

		expect(firstPopularTag(keywordIds, true)).toBe('some/tag');
	});
});
