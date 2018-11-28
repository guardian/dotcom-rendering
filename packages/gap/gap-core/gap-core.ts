/**
 * This is the main loader for Gap.
 *
 * It exposes a GAP global. Extensions should register themselves on this using
 * GAP. E.g.
 *
 *     GAP.registerElement('gap-list', GapList)
 *
 * where gap-list is the tag name for the extension, and GapList is the
 * extension class.
 */

interface Extension {
    do: (el: Element) => Promise<void>;
}

const extensions: Map<string, Extension> = new Map();

/**
 * Main rendering function
 *
 * Instructs extension elements to execute. Eventually this will do clever
 * things like buffer and batch.
 */
const render = () => {
    // caching and throttling
    extensions.forEach((extension, tag) => {
        const tags = document.getElementsByTagName(tag);
        Array.prototype.forEach.call(tags, (el: Element) => extension.do(el));
    });
};

const GAP = {
    registerElement: (tag: string, extension: Extension) => {
        extensions.set(tag, extension);
        render();
    },
};

window.GAP = GAP;
