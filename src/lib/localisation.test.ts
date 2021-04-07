import { localise } from '@frontend/lib/localisation';

describe('localise', () => {
	it('Correctly localise against the relevant Edition', () => {
		expect(localise('US', 'Film')).toBe('Movies');
	});
	it('Does not localise against an irrelevant Edition', () => {
		expect(localise('UK', 'Film')).toBe('Film');
	});
	it('Does not localise when the edition is undefined', () => {
		expect(localise(undefined, 'Film')).toBe('Film');
	});
	it('Correctly handle lowercase if case insensitive instruction', () => {
		expect(localise('US', 'film')).toBe('movies');
	});
	it('Does not convert if case sensitive instruction', () => {
		expect(localise('US', 'In film')).toBe('In film');
	});
});
