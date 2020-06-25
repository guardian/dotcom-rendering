// ----- Imports ----- //

import { Monad } from './monad';
import { Option, some, none } from './option';


// ----- Classes ----- //

interface ResultInterface<E, B> extends Monad<B> {
    either<C>(f: (e: E) => C, g: (b: B) => C): C;
    mapError<F>(g: (e: E) => F): Result<F, B>;
    toOption(): Option<B>;
}

class Ok<E, B> implements ResultInterface<E, B> {

    value: B;

    /**
     * The method for turning a `Result<E, A>` into a plain value.
     * If this is an `Err`, apply the first function to the error value and
     * return the result. If this is an `Ok`, apply the second function to
     * the value and return the result.
     * @param f The function to apply if this is an `Err`
     * @param g The function to apply if this is an `Ok`
     * @example
     * const flakyTaskResult: Result<string, number> = flakyTask(options);
     * 
     * flakyTaskResult.either(
     *     data => `We got the data! Here it is: ${data}`,
     *     error => `Uh oh, an error: ${error}`,
     * )
     */
    either<C>(_f: (e: E) => C, g: (b: B) => C): C {
        return g(this.value);
    }

    /**
     * Similar to `Option.fmap`.
     * Applies a function to the value in an `Ok`, does nothing to an `Err`.
     * @param f The function to apply if this is an `Ok`
     */
    fmap<C>(f: (a: B) => C): Result<E, C> {
        return new Ok(f(this.value));
    }

    /**
     * Similar to `Option.andThen`. Applies to a `Result` a function that
     * *also* returns a `Result`, and unwraps them to avoid nested `Result`s.
     * Can be useful for stringing together operations that might fail.
     * @example
     * type RequestUser = number => Result<string, User>;
     * type GetEmail = User => Result<string, string>;
     * 
     * // Request fails: Err('Network failure')
     * // Request succeeds, problem accessing email: Err('Email field missing')
     * // Both succeed: Ok('email_address')
     * requestUser(id).andThen(getEmail)
     */
    andThen<C>(f: (b: B) => Result<E, C>): Result<E, C> {
        return f(this.value);
    }

    /**
     * The companion to `fmap`.
     * Applies a function to the error in `Err`, does nothing to an `Ok`.
     * @param g The function to apply if this is an `Err`
     */
    mapError<F>(_g: (e: E) => F): Result<F, B> {
        return new Ok(this.value);
    }

    /**
     * Converts a `Result<E, A>` into an `Option<A>`. If the result is an
     * `Ok` this will be a `Some`, if the result is an `Err` this will be
     * a `None`.
     */
    toOption(): Option<B> {
        return some(this.value);
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

    fmap<C>(_f: (a: B) => C): Result<E, C> {
        return new Err(this.error);
    }

    andThen<C>(_f: (b: B) => Result<E, C>): Result<E, C> {
        return new Err(this.error);
    }

    mapError<F>(g: (e: E) => F): Result<F, B> {
        return new Err(g(this.error));
    }

    toOption(): Option<B> {
        return none;
    }

    constructor(error: E) {
        this.error = error;
    }

}

/**
 * Represents either a value or an error; it's either an `Ok` or an `Err`.
 */
type Result<E, A> = Ok<E, A> | Err<E, A>;

/**
 * Converts an operation that might throw into a `Result`
 * @param f The operation that might throw
 * @param error The error to return if the operation throws
 */
function fromUnsafe<A, E>(f: () => A, error: E): Result<E, A> {
    try {
        return new Ok(f());
    } catch (_) {
        return new Err(error);
    }
}

/**
 * The return type of the `partition` function
 */
type Partitioned<A, B> = { errs: A[]; oks: B[] };

/**
 * Takes a list of `Result`s and separates out the `Ok`s from the `Err`s.
 * @param results A list of `Result`s
 * @return {Partitioned} An object with two fields, one for the list of `Err`s
 * and one for the list of `Ok`s
 */
const partition = <A, B>(results: Result<A, B>[]): Partitioned<A, B> =>
    results.reduce(({ errs, oks }: Partitioned<A, B>, result) =>
        result.either(
            err => ({ errs: [ ...errs, err ], oks }),
            ok => ({ errs, oks: [ ...oks, ok ] }),
        ),
        { errs: [], oks: [] },
    );


// ----- Exports ----- //

export {
    Result,
    Ok,
    Err,
    fromUnsafe,
    partition,
};
