// ----- Imports ----- //

import { Functor } from './functor';


// ----- Interface ----- //

interface Monad<A> extends Functor<A> {
    andThen<B>(f: (a: A) => Monad<B>): Monad<B>;
}


// ----- Exports ----- //

export {
    Monad,
};
