export const fakeLogin = (subscriber = true) => {
	const response = {
		userId: '107421393',
		digitalSubscriptionExpiryDate: '2999-01-01',
		showSupportMessaging: false,
		contentAccess: {
			member: false,
			paidMember: false,
			recurringContributor: false,
			digitalPack: true,
			paperSubscriber: false,
			guardianWeeklySubscriber: false,
		},
	};

	if (!subscriber) {
		response.contentAccess.digitalPack = false;
		delete response.digitalSubscriptionExpiryDate;
	}

	cy.setCookie(
		'GU_U',
		'WyIzMjc5Nzk0IiwiIiwiSmFrZTkiLCIiLDE2NjA4MzM3NTEyMjcsMCwxMjEyNjgzMTQ3MDAwLHRydWVd.MC0CFQCIbpFtd0J5IqK946U1vagzLgCBkwIUUN3UOkNfNN8jwNE3scKfrcvoRSg',
		{ timeout: 30000 },
	);

	// cy.wait('@userData');
	cy.intercept('GET', '/api/data').as('userData');

	cy.intercept(
		'https://members-data-api.theguardian.com/user-attributes/me',
		{ times: 1 },
		response,
	).as('userData');
};
