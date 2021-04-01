export const mockApi = () => {
	// Mock share count
	cy.intercept('GET', '/sharecount/**', {
		fixture: 'shareCount.json',
	}).as('getShareCount');
	// Mock most-read
	cy.intercept('GET', '/most-read/**', {
		fixture: 'mostRead.json',
	}).as('getMostRead');
	// Mock most-read
	cy.intercept('GET', '**/most-read-geo**', {
		fixture: 'mostReadGeo.json',
	}).as('getMostReadGeo');
	// Mock most-read
	cy.intercept('GET', '/embed/card/**', {
		fixture: 'richLink.json',
	}).as('getRichLink');
};
