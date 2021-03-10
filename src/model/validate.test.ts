import fetch from 'node-fetch';
import { validateAsCAPIType } from './validate';

// TODO avoid fetch, write script to fetch new version in gen-schema.js and store as fixture files
const urlsToTest = [
	'https://www.theguardian.com/politics/2020/jan/16/long-bailey-says-abortion-limit-should-not-be-different-for-disability.json?dcr',
	'https://www.theguardian.com/uk-news/2020/jan/16/benita-mehra-grenfell-inquiry-boris-johnson-appoints-engineer-with-links-to-cladding-firm.json?dcr',
	'https://www.theguardian.com/commentisfree/2020/jan/16/boris-johnson-scottish-independence-nicola-sturgeon-snp.json?dcr',
	'https://www.theguardian.com/sport/2020/jan/16/south-africa-england-third-test-day-one-match-report.json?dcr',
	'https://www.theguardian.com/society/2020/jan/16/the-agony-of-weekend-loneliness-i-wont-speak-to-another-human-until-monday.json?dcr',
	'https://www.theguardian.com/uk-news/2020/jan/22/man-74-was-shot-with-crossbow-as-he-fixed-satellite-dish-court-told.json?dcr',
];

describe('validate', () => {
	it('throws on invalid data', () => {
		const data = { foo: 'bar' };
		expect(() => validateAsCAPIType(data)).toThrowError(TypeError);
	});

	urlsToTest.forEach((url) => {
		it('confirm valid data', () => {
			return fetch(url)
				.then((response) => response.json())
				.then((myJson) => {
					expect(validateAsCAPIType(myJson)).toBe(myJson);
				});
		});
	});
});
