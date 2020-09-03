let abSwitches;

export const getAbSwitches = (x) => {
    const url =
        'https://www.theguardian.com/games/2018/aug/23/nier-automata-yoko-taro-interview';

    cy.visit(`Article?url=${url}`).then((contentWindow) => {
        abSwitches = contentWindow.guardian.config.switches;
        Cypress.env('SWITCHES', abSwitches);
    });
};
