export const mockApi = () => {
	cy.server();
	// Mock share count
	cy.route({
		method: 'GET',
		url: '/sharecount/**',
		response: 'fixture:shareCount.json',
	});
	// Mock most-read
	cy.route({
		method: 'GET',
		url: '/most-read/**',
		response: 'fixture:mostRead.json',
	});
	// Mock most-read
	cy.route({
		method: 'GET',
		url: '**/most-read-geo**',
		response: 'fixture:mostReadGeo.json',
	});
	// Mock most-read
	cy.route({
		method: 'GET',
		url: '/embed/card/**',
		response: 'fixture:richLink.json',
	});
};
