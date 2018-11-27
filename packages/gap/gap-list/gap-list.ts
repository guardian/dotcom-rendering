/**
 * Loads JSON content from a CORS endpoint and renders it through a provided
 * template.
 */

const GapList: Extension = {
    do: (el: Element): void => {
        if (el === null) return;
        const src = el.attributes.getNamedItem('data-src');

        if (src === null) return;
        // tslint:disable-next-line:no-console
        console.log(`Calling gap-list do on element: ${src.value}`);
    },
};

window.GAP.registerElement('gap-list', GapList);
