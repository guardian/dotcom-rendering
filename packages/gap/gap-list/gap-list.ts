/**
 * Loads JSON content from a CORS endpoint and renders it through a provided
 * template.
 */

const GapList: Extension = {
    do: async (el: Element): Promise<void> => {
        const src = el.attributes.getNamedItem('data-src');

        if (src === null) return;
        const res = await fetch(src.value);
        const json = await res.json();

        el.innerHTML = `<div>${json.foo}</div>`;
        return;
    },
};

export default GapList;

if (window.GAP) {
    window.GAP.registerElement('gap-list', GapList);
}
