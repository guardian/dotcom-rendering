export const mockApi = () => {
	// Mock share count
	cy.intercept('GET', '/sharecount/**', { fixture: 'shareCount.json' });
	// Mock most-read
	cy.intercept('GET', '/most-read/**', { fixture: 'mostRead.json' });
	// Mock most-read
	cy.intercept('GET', '**/most-read-geo**', { fixture: 'mostReadGeo.json' });
	// Mock most-read
	cy.intercept('GET', '/embed/card/**', { fixture: 'richLink.json' });
};
