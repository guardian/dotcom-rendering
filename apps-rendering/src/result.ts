// ----- Imports ----- //

import type { Option } from '../vendor/@guardian/types/index';
import { none, some } from '../vendor/@guardian/types/index';
import { Optional } from 'optional';

// ----- Classes ----- //
/**
 * The return type of the {@linkcode Result.partition} method.
 */
type Partitioned<E, A> = { errs: E[]; oks: A[] };

/**
 * Represents either a value or an error; it's either an `Ok` or an `Err`.
 */
abstract class Result<E, A> {
	// ----- Abstract Methods

	/**
	 * Like {@linkcode map} but applies to a {@linkcode Result} a function that
	 * *also* returns a `Result`, and unwraps them to avoid nested `Result`s.
	 * Can be useful for stringing together operations that might fail.
	 * It's the same as {@linkcode Array.flatMap}, which `map`s a function that
	 * returns an `Array`, and then "flattens" the resulting `Array<Array<A>>`.
	 * @param f The function to apply
	 * @returns {Result<E, B>} A new {@linkcode Result}
	 * @example
	 * const requestUser = (id: number): Result<string, User> => {...};
	 * const getEmail = (user: User): Result<string, string> => {...};
	 *
	 * // Request fails: Err('Network failure')
	 * // Request succeeds, problem accessing email: Err('Email field missing')
	 * // Both succeed: Ok('email_address')
	 * requestUser(id).flatMap(getEmail);
	 */
	abstract flatMap<B>(f: (a: A) => Result<E, B>): Result<E, B>;

	/**
	 * The method for turning a {@linkcode Result} into a plain value.
	 * If this is an `Err`, apply the first function to the error value and
	 * return the result. If this is an `Ok`, apply the second function to
	 * the value and return the result.
	 * @param f The function to apply if this is an `Err`
	 * @param g The function to apply if this is an `Ok`
	 * @returns {C} The result of applying either `f` or `g`
	 * @example
	 * const flakyTaskResult: Result<string, number> =
	 *  flakyTask(options);
	 *
	 * flakyTestResult.either(
	 *     error => `Uh oh, an error: ${error}`,
	 *     data => `We got the data! Here it is: ${data}`,
	 * )
	 */
	abstract either<C>(f: (e: E) => C, g: (a: A) => C): C;

	/**
	 * The companion to {@linkcode map}.
	 * Applies a function to the error in `Err`, does nothing to an `Ok`.
	 * @param g The function to apply if this is an `Err`
	 * @returns {Result<E, F>} A new {@linkcode Result} with a different error
	 */
	abstract mapError<F>(g: (e: E) => F): Result<F, A>;

	/**
	 * Converts a {@linkcode Result} into an {@linkcode Optional}. If the result
	 * is an `Ok` this will be a `Some`, if the result is an `Err` this will be
	 * a `None`.
	 * @returns {Optional<A>} An {@linkcode Optional}
	 */
	abstract toOptional(): Optional<A>;

	/**
	 * Temporary method to convert to the old `Option` type. Same functionality
	 * as {@linkcode toOptional} but with `Option`.
	 */
	abstract toOption(): Option<A>;

	/**
	 * Checks if a {@linkcode Result} is an `Ok`. Can be used in type guards to
	 * narrow the type and get access to the `value` inside an `Ok`.
	 * See also {@linkcode isErr}.
	 * @returns {boolean} A type predicate
	 * @example
	 * const name: Result<string, string> = Result.ok('CP Scott');
	 *
	 * console.log(name.value); // Type Error: 'value' does not exist
	 *
	 * if (name.isOk()) {
	 *   console.log(name.value); // Works!
	 * }
	 */
	abstract isOk(): this is Ok<E, A>;

	/**
	 * Checks if a {@linkcode Result} is an `Err`. Can be used in type guards to
	 * narrow the type and get access to the `error` inside an `Err`.
	 * See also {@linkcode isOk}.
	 * @returns {boolean} A type predicate
	 * @example
	 * const name: Result<string, string> = Result.err('Missing name!');
	 *
	 * console.log(name.error); // Type Error: 'value' does not exist
	 *
	 * if (name.isErr()) {
	 *   console.log(name.error); // Works!
	 * }
	 */
	abstract isErr(): this is Err<E, A>;

	// ----- Static Methods

	/**
	 * Takes a value and wraps it up into an `Ok`.
	 * @example
	 * const maybeName: Result<string, string> =
	 * 	Result.ok('CP Scott');
	 */
	static ok<E, A>(a: A): Result<E, A> {
		return new Ok(a);
	}

	/**
	 * Takes an error value and wraps it up into an `Err`.
	 * @example
	 * const maybeName: Result<string, string> =
	 * 	Result.err('Missing name!');
	 */
	static err<E, A>(e: E): Result<E, A> {
		return new Err(e);
	}

	/**
	 * Converts an operation that might throw into a {@linkcode Result}.
	 * @param f The operation that might throw
	 * @param error The error to return if the operation throws
	 * @example
	 * Result.fromUnsafe(
	 *  () => new URL('https://www.theguardian.com'),
	 *  'Could not create the URL',
	 * )
	 */
	static fromUnsafe<E, A>(f: () => A, error: E): Result<E, A> {
		try {
			return Result.ok(f());
		} catch (_) {
			return Result.err(error);
		}
	}

	/**
	 * Takes a list of {@linkcode Result|Results} and separates out the `Ok`s
	 * from the `Err`s.
	 * @param results A list of `Result`s
	 * @return {Partitioned} A {@linkcode Partitioned} object with two fields,
	 * one for the list of `Err`s and one for the list of `Ok`s
	 * @example
	 * const results: Result<string, number>[] = ...;
	 *
	 * const partitioned = Result.partition(results);
	 * console.log(`Successes: ${partitioned.oks}`);
	 * console.log(`Errors: ${partitioned.errs}`);
	 */
	static partition<E, A>(results: Array<Result<E, A>>): Partitioned<E, A> {
		return results.reduce(
			({ errs, oks }: Partitioned<E, A>, result) =>
				result.either(
					(err) => ({ errs: [...errs, err], oks }),
					(ok) => ({ errs, oks: [...oks, ok] }),
				),
			{ errs: [], oks: [] },
		);
	}

	// ----- Methods

	/**
	 * Applies a function to the value in an `Ok`, does nothing to an `Err`.
	 * Similar to {@link Optional.map}.
	 * @param f The function to apply if this is an `Ok`
	 * @returns {Result<E, B>} A new {@linkcode Result}
	 * @example
	 * const creditOne = Result.ok('Nicéphore Niépce');
	 * // Returns Ok('Photograph: Nicéphore Niépce')
	 * creditOne.map(name => `Photograph: ${name}`);
	 *
	 * const creditTwo = Result.err('No credit!');
	 * // Returns Err('No credit!')
	 * creditTwo.map(name => `Photograph: ${name}`);
	 */
	map<B>(f: (a: A) => B): Result<E, B> {
		return this.flatMap((a) => Result.ok(f(a)));
	}
}

class Ok<E, A> extends Result<E, A> {
	/**
	 * The value wrapped inside an `Ok`. Can be extracted directly if
	 * {@linkcode Result.isOk|isOk} is used in a type guard, or using
	 * {@linkcode Result.either|either}.
	 */
	value: A;

	flatMap<B>(f: (a: A) => Result<E, B>): Result<E, B> {
		return f(this.value);
	}

	either<C>(_f: (e: E) => C, g: (a: A) => C): C {
		return g(this.value);
	}

	mapError<F>(_g: (e: E) => F): Result<F, A> {
		return Result.ok(this.value);
	}

	toOptional(): Optional<A> {
		return Optional.some(this.value);
	}

	toOption(): Option<A> {
		return some(this.value);
	}

	isOk(): this is Ok<E, A> {
		return true;
	}

	isErr(): this is Err<E, A> {
		return false;
	}

	constructor(a: A) {
		super();
		this.value = a;
	}
}

class Err<E, A> extends Result<E, A> {
	/**
	 * The error wrapped inside an `Err`. Can be extracted directly if
	 * {@linkcode Result.isErr|isErr} is used in a type guard, or using
	 * {@linkcode Result.either|either}.
	 */
	error: E;

	flatMap<B>(_f: (a: A) => Result<E, B>): Result<E, B> {
		return Result.err(this.error);
	}

	either<C>(f: (e: E) => C, _g: (a: A) => C): C {
		return f(this.error);
	}

	mapError<F>(g: (e: E) => F): Result<F, A> {
		return Result.err(g(this.error));
	}

	toOptional(): Optional<A> {
		return Optional.none();
	}

	toOption(): Option<A> {
		return none;
	}

	isOk(): this is Ok<E, A> {
		return false;
	}

	isErr(): this is Err<E, A> {
		return true;
	}

	constructor(e: E) {
		super();
		this.error = e;
	}
}

// ----- Exports ----- //

export { Result };
