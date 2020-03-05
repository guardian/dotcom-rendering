// ----- Functions ----- //

const compose = <A, B, C>(f: (_b: B) => C, g: (_a: A) => B) => (a: A): C => f(g(a));

const identity = <A>(a: A): A => a;


// ----- Exports ----- //

export {
    compose,
    identity,
};
