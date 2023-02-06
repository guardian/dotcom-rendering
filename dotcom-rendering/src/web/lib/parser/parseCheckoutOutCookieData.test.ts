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
				'DigitalPack',
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toStrictEqual(
				{
					userType: 'new',
					product: 'DigitalPack',
				},
			);
		});
	});

	describe('unsuccessful parse should return undefined', () => {
		it('invalid user type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'invalid',
				'DigitalPack',
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
				`{"invalid":"new", "product": "DigitalPack"}`,
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
		it('invalid json structure', () => {
			const cookieString = encodeURIComponent(
				`{"userType":"new", "product": "DigitalPack"`,
			);
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
		it('plain string', () => {
			const cookieString = `{"userType":"new", "product": "DigitalPack"}`;
			expect(parseCheckoutCompleteCookieData(cookieString)).toBe(
				undefined,
			);
		});
	});
});
