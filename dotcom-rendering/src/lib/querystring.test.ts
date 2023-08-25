import { constructQuery } from './querystring';

describe('constructQuery', () => {
	it('constructs the correct query string from an object', () => {
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
		expect(constructQuery(testParams)).toBe(expectedQuery);
	});
});
