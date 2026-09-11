import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { isValidUrl } from './isValidUrl';

void nodeDescribe('isValidUrl', () => {
	void nodeDescribe('invalidInputs', () => {
		const invalidInputs = [
			'',
			'guardian.co',
			'anemailaddress@company.com',
			'com/hello?athing=1&anotherthing=%20',
			'https://guardian.co.uk withASpace',
		];

		for (const input of invalidInputs) {
			void nodeIt(
				`returns false for invalid input of \`${input}\``,
				() => {
					assert.equal(isValidUrl(input), false);
				},
			);
		}
	});

	void nodeDescribe('validInputs', () => {
		const validInputs = [
			'https://guardian.co.uk/australia-news/series/guardian-australia-s-morning-mail',
			'https://regexr.com/39nr7',
			'http://www.google.com/hello?athing=1&anotherthing=%20',
		];

		for (const input of validInputs) {
			void nodeIt(`returns true for valid input of \`${input}\``, () => {
				assert.equal(isValidUrl(input), true);
			});
		}
	});
});
