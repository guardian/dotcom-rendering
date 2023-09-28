import { mostRead } from '../fixtures/manual/most-read.mjs';
import { mostReadGeo } from '../fixtures/manual/most-read-geo.mjs';

export const mockApi = () => {
	// Mock share count
	cy.intercept('GET', '/sharecount/**', { fixture: 'shareCount.json' }).as(
		'getShareCount',
	);
	// Mock most-read
	cy.intercept('GET', '**/most-read/**', mostRead).as('getMostRead');
	// Mock most-read
	cy.intercept('GET', '**/most-read-geo**', mostReadGeo).as('getMostReadGeo');
	// Mock most-read
	cy.intercept('GET', '/embed/card/**', { fixture: 'richLink.json' }).as(
		'getRichLink',
	);
};
