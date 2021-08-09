export const disableCMP = () =>
	cy.setCookie('gu-cmp-disabled', 'true', {
		log: true,
	});
