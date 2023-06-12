import { isParticipations } from './ab-participations';

describe('isParticipations validation', () => {
	test('Localstorage Participation data is validated correctly,', () => {
		const goodDatum: unknown = {
			foobar: { variant: 'foobar' },
		};
		const goodData: unknown = {
			foobar: { variant: 'foobar' },
			barfoo: { variant: 'barfoo' },
		};

		expect(isParticipations(goodDatum)).toBe(true);
		expect(isParticipations(goodData)).toBe(true);
		expect(
			isParticipations({
				foobar: { foobar: 'foobar' },
			}),
		).toBe(false);
		expect(
			isParticipations({
				foobar: { variant: 1 },
			}),
		).toBe(false);
		expect(
			isParticipations({
				foobar: 'abc',
			}),
		).toBe(false);
		expect(
			isParticipations({
				2: { foobar: 'foobar' },
			}),
		).toBe(false);
		expect(isParticipations('anything')).toBe(false);
	});
});
