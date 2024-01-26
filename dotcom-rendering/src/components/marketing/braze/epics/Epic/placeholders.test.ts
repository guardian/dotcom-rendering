import { containsNonAllowedPlaceholder } from './placeholders';

describe('containsNonAllowedPlaceholders', () => {
	it('returns false when there are no placeholders', () => {
		const got = containsNonAllowedPlaceholder('foo bar baz');
		expect(got).toEqual(false);
	});

	it('returns false when there are only allowed placeholders', () => {
		const got = containsNonAllowedPlaceholder(
			'%%COUNTRY_NAME% foo bar baz',
		);
		expect(got).toEqual(false);
	});

	it('returns true when there are placeholders we do not support', () => {
		const got = containsNonAllowedPlaceholder('%%FOO%% foo bar baz');
		expect(got).toEqual(true);
	});

	it('returns true when there are both allowed and non-allowed placeholders', () => {
		const got = containsNonAllowedPlaceholder(
			'%%FOO%% %%COUNTRY_NAME%% foo bar baz',
		);
		expect(got).toEqual(true);
	});
});
