import type { Option } from './option';
declare enum ResultKind {
	Ok = 0,
	Err = 1,
}
declare type Ok<A> = {
	kind: ResultKind.Ok;
	value: A;
};
declare type Err<E> = {
	kind: ResultKind.Err;
	err: E;
};
/**
 * Represents either a value or an error; it's either an `Ok` or an `Err`.
 */
declare type Result<E, A> = Err<E> | Ok<A>;
declare const ok: <A>(a: A) => Ok<A>;
declare const err: <E>(e: E) => Err<E>;
/**
 * Converts an operation that might throw into a `Result`
 * @param f The operation that might throw
 * @param error The error to return if the operation throws
 */
declare function fromUnsafe<A, E>(f: () => A, error: E): Result<E, A>;
/**
 * The method for turning a `Result<E, A>` into a plain value.
 * If this is an `Err`, apply the first function to the error value and
 * return the result. If this is an `Ok`, apply the second function to
 * the value and return the result.
 * @param f The function to apply if this is an `Err`
 * @param g The function to apply if this is an `Ok`
 * @param result The Result
 * @example
 * const flakyTaskResult: Result<string, number> = flakyTask(options);
 *
 * either(
 *     data => `We got the data! Here it is: ${data}`,
 *     error => `Uh oh, an error: ${error}`,
 * )(flakyTaskResult)
 */
declare const either: <E, A, C>(
	f: (e: E) => C,
	g: (a: A) => C,
) => (result: Result<E, A>) => C;
/**
 * The companion to `map`.
 * Applies a function to the error in `Err`, does nothing to an `Ok`.
 * @param f The function to apply if this is an `Err`
 * @param result The Result
 */
declare const mapError: <E, F>(
	f: (e: E) => F,
) => <A>(result: Result<E, A>) => Result<F, A>;
/**
 * Converts a `Result<E, A>` into an `Option<A>`. If the result is an
 * `Ok` this will be a `Some`, if the result is an `Err` this will be
 * a `None`.
 * @param result The Result
 */
declare const toOption: <E, A>(result: Result<E, A>) => Option<A>;
/**
 * Similar to `Option.map`.
 * Applies a function to the value in an `Ok`, does nothing to an `Err`.
 * @param f The function to apply if this is an `Ok`
 * @param result The Result
 */
declare const map: <A, B>(
	f: (a: A) => B,
) => <E>(result: Result<E, A>) => Result<E, B>;
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
 * andThen(getEmail)(requestUser(id))
 */
declare const andThen: <E, A, B>(
	f: (a: A) => Result<E, B>,
) => (result: Result<E, A>) => Result<E, B>;
/**
 * The return type of the `partition` function
 */
declare type Partitioned<E, A> = {
	errs: E[];
	oks: A[];
};
/**
 * Takes a list of `Result`s and separates out the `Ok`s from the `Err`s.
 * @param results A list of `Result`s
 * @return {Partitioned} An object with two fields, one for the list of `Err`s
 * and one for the list of `Ok`s
 */
declare const partition: <E, A>(results: Result<E, A>[]) => Partitioned<E, A>;
export {
	ResultKind,
	ok,
	err,
	fromUnsafe,
	partition,
	either,
	mapError,
	toOption,
	map,
	andThen,
};
export type { Result };
