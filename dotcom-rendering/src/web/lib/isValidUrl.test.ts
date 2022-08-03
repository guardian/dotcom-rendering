import { isValidUrl } from './isValidUrl';

describe('isValidUrl', () => {
	describe('invalidInputs', () => {
		const invalidInputs = [
			'',
			'guardian.co',
			'anemailaddress@company.com',
			'com/hello?athing=1&anotherthing=%20',
			'https://guardian.co.uk space',
		];

		it.each(invalidInputs)(
			'returns undefined for invalid input of `%s`',
			(input) => {
				expect(isValidUrl(input)).toBeFalsy();
			},
		);
	});

	describe('validInputs', () => {
		const validInputs = [
			'https://guardian.co.uk/australia-news/series/guardian-australia-s-morning-mail',
			'https://regexr.com/39nr7',
			'http://www.google.com/hello?athing=1&anotherthing=%20',
		];

		it.each(validInputs)(
			'returns input for valid input of `%s`',
			(input) => {
				expect(isValidUrl(input)).toBeTruthy();
			},
		);
	});
});
