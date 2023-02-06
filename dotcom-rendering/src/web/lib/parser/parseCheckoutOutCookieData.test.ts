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

// it('invalid userType', function () {
// 	setGuCOCompleteCookie('invalid', 'Contribution');

// 	visitArticleAndScrollToGateForLazyLoad();

// 	cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
// 	cy.get('[data-cy=sign-in-gate-main]').contains(
// 		'You need to register to keep reading',
// 	);
// });
// it('invalid product', function () {
// 	setGuCOCompleteCookie('current', 'invalid');

// 	visitArticleAndScrollToGateForLazyLoad();

// 	cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
// 	cy.get('[data-cy=sign-in-gate-main]').contains(
// 		'You need to register to keep reading',
// 	);
// });
// it('invalid field', function () {
// 	cy.setCookie(
// 		'GU_CO_COMPLETE',
// 		encodeURIComponent(
// 			`{"invalid":"current","product":"DigitalPack"}`,
// 		),
// 	);

// 	visitArticleAndScrollToGateForLazyLoad();

// 	cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
// 	cy.get('[data-cy=sign-in-gate-main]').contains(
// 		'You need to register to keep reading',
// 	);
// });
// it('invalid JSON structure', function () {
// 	cy.setCookie(
// 		'GU_CO_COMPLETE',
// 		encodeURIComponent(
// 			`{"userType":"current","product":"DigitalPack`,
// 		),
// 	);

// 	visitArticleAndScrollToGateForLazyLoad();

// 	cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
// 	cy.get('[data-cy=sign-in-gate-main]').contains(
// 		'You need to register to keep reading',
// 	);
// });
// it('not uri encoded', function () {
// 	cy.setCookie(
// 		'GU_CO_COMPLETE',
// 		`{"userType":"current","product":"DigitalPack}`,
// 	);

// 	visitArticleAndScrollToGateForLazyLoad();

// 	cy.get('[data-cy=sign-in-gate-main]').should('be.visible');
// 	cy.get('[data-cy=sign-in-gate-main]').contains(
// 		'You need to register to keep reading',
// 	);
// });
