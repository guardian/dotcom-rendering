// ----- Imports ----- //

import { Monad } from './Monad';


// ----- Classes ----- //

interface ResultInterface<E, B> extends Monad<B> {
    either<C>(f: (e: E) => C, g: (b: B) => C): C;
}

class Ok<E, B> implements ResultInterface<E, B> {

    value: B;

    either<C>(f: (e: E) => C, g: (b: B) => C) {
        return g(this.value);
    }

    map<C>(f: (a: B) => C): Result<E, C> {
        return new Ok(f(this.value));
    }

    andThen<C>(f: (b: B) => Result<E, C>): Result<E, C> {
        return f(this.value);
    }

    constructor(value: B) {
        this.value = value;
    }

}

class Err<E, B> implements ResultInterface<E, B> {

    error: E;

    either<C>(f: (e: E) => C, g: (b: B) => C) {
        return f(this.error);
    }

    map<C>(f: (a: B) => C): Result<E, C> {
        return new Err(this.error);
    }

    andThen<C>(f: (b: B) => Result<E, C>): Result<E, C> {
        return new Err(this.error);
    }

    constructor(error: E) {
        this.error = error;
    }

}

type Result<E, A> = Ok<E, A> | Err<E, A>;

function fromTryCatch<A, E>(f: () => A, error: E): Result<E, A> {
    try {
        return new Ok(f());
    } catch (_) {
        return new Err(error);
    }
}


// ----- Exports ----- //

export {
    Result,
    Ok,
    Err,
    fromTryCatch,
};
