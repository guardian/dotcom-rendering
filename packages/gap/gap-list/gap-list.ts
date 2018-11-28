import Mustache from 'mustache';

/**
 * Loads JSON content from a CORS endpoint and renders it through a provided
 * template.
 */

const GapList: Extension = {
    do: async (el: Element): Promise<void> => {
        const src = el.attributes.getNamedItem('data-src');
        if (src === null) return;

        const tpl = el.querySelector('template');
        if (tpl === null) return;

        const res = await fetch(src.value);
        const json = await res.json();
        const html = Mustache.render(tpl.innerHTML, json);

        el.innerHTML = html;
    },
};

export default GapList;

if (window.GAP) {
    window.GAP.registerElement('gap-list', GapList);
}
