// ----- Interface ----- //

interface Functor<A> {
    map<B>(f: (a: A) => B): Functor<B>;
}


// ----- Exports ----- //

export {
    Functor,
};
