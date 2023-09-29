import { mostRead } from '../fixtures/manual/most-read';
import { mostReadGeo } from '../fixtures/manual/most-read-geo';

export const mockApi = () => {
	// Mock most-read
	cy.intercept('GET', '**/most-read/**', mostRead).as('getMostRead');
	// Mock most-read
	cy.intercept('GET', '**/most-read-geo**', mostReadGeo).as('getMostReadGeo');
	// Mock most-read
	cy.intercept('GET', '/embed/card/**', { fixture: 'richLink.json' }).as(
		'getRichLink',
	);
};
