// ----- Imports ----- //

import { Monad } from './Monad';


// ----- Classes ----- //

interface OptionInterface<A> extends Monad<A> {
    withDefault(a: A): A;
}

class Some<A> implements OptionInterface<A> {

    value: A;

    withDefault(_a: A): A {
        return this.value;
    }

    map<B>(f: (a: A) => B): Option<B> {
        return new Some(f(this.value));
    }

    andThen<B>(f: (a: A) => Option<B>): Option<B> {
        return f(this.value);
    }

    constructor(value: A) {
        this.value = value;
    }

}

class None<A> implements OptionInterface<A> {

    withDefault(a: A): A {
        return a;
    }

    map<B>(_f: (a: A) => B): Option<B> {
        return new None();
    }

    andThen<B>(_f: (a: A) => Option<B>): Option<B> {
        return new None();
    }

}

type Option<A> = Some<A> | None<A>;


// ----- Constructors ----- //

const fromNullable = <A>(a: A | null | undefined): Option<A> =>
    a === null || a === undefined ? new None() : new Some(a);


// ----- Exports ----- //

export {
    Option,
    Some,
    None,
    fromNullable,
};
