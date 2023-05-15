import { getPillar } from './extract-nav';

jest.mock('../lib/pillars', () => ({
	pillarNames: ['news', 'opinion', 'sport', 'culture', 'lifestyle', 'labs'],
}));

describe('getPillar', () => {
	it('returns pillar if valid', () => {
		expect(getPillar('News')).toBe('news');
	});

	it('returns undefined if not valid', () => {
		expect(getPillar('foo')).toBeUndefined();
	});

	it('returns "culture" if "arts"', () => {
		expect(getPillar('Arts')).toBe('culture');
	});
});
