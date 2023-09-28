export const cmpIframe = () => {
	return cy
		.get('iframe[id^="sp_message_iframe"]')
		.its('0.contentDocument.body')
		.should('not.be.empty')
		.then(cy.wrap);
};
