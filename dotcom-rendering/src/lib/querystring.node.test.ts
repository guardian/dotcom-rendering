import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { constructQuery } from './querystring';

void describe('constructQuery', () => {
	void it('constructs the correct query string from an object', () => {
		const testParams = {
			sens: 'f',
			si: 'f',
			vl: 333,
			cc: 'UK',
			s: 'sport',
			inskin: 'f',
			ct: 'article',
			url: '/sport/2017/sep/30/test-article',
			su: ['0'],
			pa: 'f',
			a: undefined,
		};
		const expectedQuery = `sens=f&si=f&vl=333&cc=UK&s=sport&inskin=f&ct=article&url=%2Fsport%2F2017%2Fsep%2F30%2Ftest-article&su=0&pa=f&a=undefined`;
		assert.equal(constructQuery(testParams), expectedQuery);
	});
});
