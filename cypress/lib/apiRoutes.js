export const setupApiRoutes = () => {
    cy.server();
    // Listen for share count call
    cy.route({
        method: 'GET',
        url: '/sharecount/**',
    }).as('getShareCount');
    // Listen for most-read call
    cy.route({
        method: 'GET',
        url: '/most-read/**',
    }).as('getMostRead');
    // Listen for most-read call
    cy.route({
        method: 'GET',
        url: '/most-read-geo.json',
    }).as('getMostReadGeo');
    // Listen for most-read call
    cy.route({
        method: 'GET',
        url: '/embed/card/**',
    }).as('getRichLinks');
};
