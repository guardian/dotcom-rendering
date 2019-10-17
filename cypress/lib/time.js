export const fixTime = () => {
    const now = new Date(2019, 10, 1);
    cy.clock(now);
};
