import { parseCheckoutCompleteCookieData } from './parseCheckoutOutCookieData';

describe('parseCheckoutCompleteCookieData', () => {
	const encodeCheckoutCompleteCookieDataObj = (
		userType: string,
		product: string,
	) =>
		encodeURIComponent(`{"userType":"${userType}","product":"${product}"}`);

	describe('successful parse', () => {
		it('should successfully parse a url encoded json object with a valid userType and product valid field', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'new',
				'SupporterPlus',
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toStrictEqual(
				{
					userType: 'new',
					product: 'SupporterPlus',
				},
			);
		});
	});

	describe('unsuccessful parse should return undefined', () => {
		it('invalid user type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'invalid',
				'SupporterPlus',
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
		it('invalid product type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'new',
				'undefined',
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
		it('invalid field', () => {
			const cookieString = encodeURIComponent(
				`{"invalid":"new", "product": "SupporterPlus"}`,
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
		it('invalid json structure', () => {
			const cookieString = encodeURIComponent(
				`{"userType":"new", "product": "SupporterPlus"`,
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
		it('plain string', () => {
			const cookieString = `{"userType":"new", "product": "SupporterPlus"}`;
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
	});
});
