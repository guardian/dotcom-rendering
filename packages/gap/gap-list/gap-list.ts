/**
 * Loads JSON content from a CORS endpoint and renders it through a provided
 * template.
 */

const GapList: Extension = {
    do: (el: HTMLElement): void =>
        // tslint:disable-next-line:no-console
        console.log(`Calling gap-list do on element: ${el.id}`),
};

window.GAP.registerElement('gap-list', GapList);
