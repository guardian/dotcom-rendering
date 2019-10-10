describe('Page rendering', function() {
    it('should load a basic article', function() {
        cy.visit(
            'http://localhost:3030/Article?url=https://www.theguardian.com/football/2019/jun/04/juventus-interested-paul-pogba-manchester-united',
        );

        cy.percySnapshot();
    });
});
