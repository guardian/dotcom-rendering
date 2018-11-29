import Mustache from 'mustache';

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

const extensions: Map<string, Extension> = new Map();

let proxy: GAPProxy | null = null;

export interface GAPHelpers {
    renderTemplate: (tpl: string, data: any) => string;
    fetchWithProxy(
        input?: Request | string,
        init?: RequestInit,
    ): Promise<Response>;
}

/**
 * **NOT RECOMMENDED FOR PRODUCTION USE.**
 *
 * GAP uses Mustache for templating. This is fast and lightweight, but does not
 * support data transformation. Coupled with the lack of custom Javascript in
 * GAP, this means data has to provided exactly as needed from the source API.
 * In practice, this is not always possible. And it is not desirable for quick
 * development and testing.
 *
 * To solve this problem, GAP allows registering of a proxy. This allows pattern
 * matching on requests, to transform data before it is returned from source.
 *
 * Register the proxy *after* gap-core but *before* other extensions.
 *
 * Transform functions have the potential to be very slow if operating on larger
 * data structures so care is needed.
 *
 * A core principle of GAP is to avoid custom client-side Javascript. As such,
 * use of GAPPRoxy in production is *strong discouraged*.
 */
export interface GAPProxy {
    transform: (resp: Response) => Response;
}

export interface Extension {
    do: (el: Element, helpers: GAPHelpers) => Promise<void>;
}

export const defaultHelpers = {
    renderTemplate: (tpl: string, data: any) => {
        return Mustache.render(tpl, data);
    },
    fetchWithProxy: (
        input?: Request | string,
        init?: RequestInit,
    ): Promise<Response> => {
        return fetch(input, init).then(r => {
            if (proxy) return proxy.transform(r);
            return r;
        });
    },
};

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
        Array.prototype.forEach.call(tags, (el: Element) =>
            extension.do(el, defaultHelpers),
        );
    });
};

const GAP = {
    registerElement: (tag: string, extension: Extension) => {
        extensions.set(tag, extension);
        render();
    },
    // See gap-proxy readme for info. NOT RECOMMENDED FOR PRODUCTION.
    registerProxy: (prox: GAPProxy) => (proxy = prox),
};

window.GAP = GAP;
