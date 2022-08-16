import fetch from 'node-fetch';
import { ZodError } from 'zod';
import { feArticleType } from './parse';
import { urlsToTest } from './validate.test';

describe('parse (zod)', () => {
	it('throws on invalid data', () => {
		const data = { foo: 'bar' };
		expect(() => feArticleType.parse(data)).toThrowError(ZodError);
	});

	it.each(urlsToTest)('Confirm valid data: %s', (url) => {
		return fetch(`${url}&purge=${Date.now()}`)
			.then((response) => response.json())
			.then((myJson) => {
				expect(feArticleType.parse(myJson)).toStrictEqual(myJson);
			});
	});
});
