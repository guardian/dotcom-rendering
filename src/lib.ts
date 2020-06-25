// ----- Functions ----- //

const compose = <A, B, C>(f: (_b: B) => C, g: (_a: A) => B) => (a: A): C => f(g(a));
const pipe = <A, B>(a: A, f: (_a: A) => B): B => f(a);
const pipe2 = <A, B, C>(a: A, f: (_a: A) => B, g: (_b: B) => C): C => g(f(a));
const pipe3 = <A, B, C, D>(a: A, f: (_a: A) => B, g: (_b: B) => C, h: (_c: C) => D): D =>
    h(g(f(a)));

const identity = <A>(a: A): A => a;

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

const toArray = Array.of.bind(null);

function memoise<A>(fn: () => A): () => A {
    let state: A | null = null;
    const memoised: () => A = () => {
        if (!state) {
            state = fn();
        }
        return state;
    };
    return memoised;
}

// ----- Exports ----- //

export {
    compose,
    pipe,
    pipe2,
    pipe3,
    identity,
    isElement,
    toArray,
    memoise
};
