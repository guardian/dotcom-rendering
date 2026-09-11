import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { parseCheckoutCompleteCookieData } from './parseCheckoutOutCookieData';

void nodeDescribe('parseCheckoutCompleteCookieData', () => {
	const encodeCheckoutCompleteCookieDataObj = (
		userType: string,
		product: string,
	) =>
		encodeURIComponent(`{"userType":"${userType}","product":"${product}"}`);

	void nodeDescribe('successful parse', () => {
		void nodeIt(
			'should successfully parse a url encoded json object with a valid userType and product valid field',
			() => {
				const cookieString = encodeCheckoutCompleteCookieDataObj(
					'new',
					'SupporterPlus',
				);
				assert.deepEqual(
					parseCheckoutCompleteCookieData(cookieString),
					{
						userType: 'new',
						product: 'SupporterPlus',
					},
				);
			},
		);
	});

	void nodeDescribe('unsuccessful parse should return undefined', () => {
		void nodeIt('invalid user type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'invalid',
				'SupporterPlus',
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void nodeIt('invalid product type', () => {
			const cookieString = encodeCheckoutCompleteCookieDataObj(
				'new',
				'undefined',
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void nodeIt('invalid field', () => {
			const cookieString = encodeURIComponent(
				`{"invalid":"new", "product": "SupporterPlus"}`,
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void nodeIt('invalid json structure', () => {
			const cookieString = encodeURIComponent(
				`{"userType":"new", "product": "SupporterPlus"`,
			);
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
		void nodeIt('plain string', () => {
			const cookieString = `{"userType":"new", "product": "SupporterPlus"}`;
			assert.equal(
				parseCheckoutCompleteCookieData(cookieString),
				undefined,
			);
		});
	});
});
