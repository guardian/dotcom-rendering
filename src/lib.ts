// ----- Functions ----- //

const compose = <A, B, C>(f: (_b: B) => C, g: (_a: A) => B) => (a: A): C => f(g(a));

const identity = <A>(a: A): A => a;

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
    return node.nodeType === 1;
}

const toArray = Array.of.bind(null);


// ----- Exports ----- //

export {
    compose,
    identity,
    isElement,
    toArray,
};
