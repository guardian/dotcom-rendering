// ----- Imports ----- //

import { Functor } from './Functor';


// ----- Interface ----- //

interface Monad<A> extends Functor<A> {
    andThen<B>(f: (a: A) => Monad<B>): Monad<B>;
}


// ----- Exports ----- //

export {
    Monad,
};
