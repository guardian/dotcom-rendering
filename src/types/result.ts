// ----- Imports ----- //

import { Monad } from './monad';


// ----- Classes ----- //

interface ResultInterface<E, B> extends Monad<B> {
    either<C>(f: (e: E) => C, g: (b: B) => C): C;
    mapError<F>(g: (e: E) => F): Result<F, B>;
}

class Ok<E, B> implements ResultInterface<E, B> {

    value: B;

    either<C>(_f: (e: E) => C, g: (b: B) => C): C {
        return g(this.value);
    }

    map<C>(f: (a: B) => C): Result<E, C> {
        return new Ok(f(this.value));
    }

    andThen<C>(f: (b: B) => Result<E, C>): Result<E, C> {
        return f(this.value);
    }

    mapError<F>(_g: (e: E) => F): Result<F, B> {
        return new Ok(this.value);
    }

    constructor(value: B) {
        this.value = value;
    }

}

class Err<E, B> implements ResultInterface<E, B> {

    error: E;

    either<C>(f: (e: E) => C, _g: (b: B) => C): C {
        return f(this.error);
    }

    map<C>(_f: (a: B) => C): Result<E, C> {
        return new Err(this.error);
    }

    andThen<C>(_f: (b: B) => Result<E, C>): Result<E, C> {
        return new Err(this.error);
    }

    mapError<F>(g: (e: E) => F): Result<F, B> {
        return new Err(g(this.error));
    }

    constructor(error: E) {
        this.error = error;
    }

}

type Result<E, A> = Ok<E, A> | Err<E, A>;

function fromUnsafe<A, E>(f: () => A, error: E): Result<E, A> {
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
    fromUnsafe,
};
