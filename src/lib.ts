// ----- Functions ----- //

const compose = <A, B, C>(f: (_b: B) => C, g: (_a: A) => B) => (a: A): C => f(g(a));

const identity = <A>(a: A): A => a;

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

const toArray = Array.of.bind(null);

function memoise<A>(fn: () => A): () => A {
    let state: A | null = null;
    return () => {
        if (!state) {
            state = fn();
        }
        return state
    }
}

// ----- Exports ----- //

export {
    compose,
    identity,
    isElement,
    toArray,
    memoise
};
