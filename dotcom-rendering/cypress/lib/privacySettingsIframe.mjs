export const privacySettingsIframe = () => {
	return cy
		.get('[src*="https://cdn.privacy-mgmt.com/privacy-manager"]')
		.its('0.contentDocument.body')
		.should('not.be.empty')
		.then(cy.wrap);
};
