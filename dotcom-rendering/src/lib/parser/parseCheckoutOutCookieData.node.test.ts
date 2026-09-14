import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseCheckoutCompleteCookieData } from './parseCheckoutOutCookieData';

void describe('parseCheckoutCompleteCookieData', () => {
	const encodeCheckoutCompleteCookieDataObj = (
		userType: string,
		product: string,
	) =>
		encodeURIComponent(`{"userType":"${userType}","product":"${product}"}`);

	void describe('successful parse', () => {
		void it('should successfully parse a url encoded json object with a valid userType and product valid field', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'new',
				'SupporterPlus',
			);
			assert.deepEqual(parseCheckoutCompleteCookieData(cookieString), {
				userType: 'new',
				product: 'SupporterPlus',
			});
		});
	});

	void describe('unsuccessful parse should return undefined', () => {
		void it('invalid user type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'invalid',
				'SupporterPlus',
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void it('invalid product type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'new',
				'undefined',
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void it('invalid field', () => {
			const cookieString = encodeURIComponent(
				`{"invalid":"new", "product": "SupporterPlus"}`,
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void it('invalid json structure', () => {
			const cookieString = encodeURIComponent(
				`{"userType":"new", "product": "SupporterPlus"`,
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void it('plain string', () => {
			const cookieString = `{"userType":"new", "product": "SupporterPlus"}`;
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
	});
});
