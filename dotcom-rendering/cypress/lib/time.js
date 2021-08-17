export const fixTime = () => {
	const now = new Date(2019, 10, 1).getTime();
	cy.clock(now);
};
