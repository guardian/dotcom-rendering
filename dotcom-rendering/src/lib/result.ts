/**
 * Represents a value or an error; it's either a {@linkcode Ok} or an
 * {@linkcode Err}. Can be constructed with {@linkcode ok} or {@linkcode error}.
 * @example
 * const result: Result<string, number> = ok(5);
 * const resultTwo: Result<string, number> = error('Something went wrong');
 */
type Result<E, A> = Ok<E, A> | Err<E, A>;

abstract class ResultBase<E, A> {
	/**
	 * Whether this is an Ok or an Err. Allows TS to narrow the type so that the
	 * value or error can be accessed directly.
	 * @example
	 * if (result.ok) {
	 *   console.log(result.value);
	 * } else {
	 *   console.error(result.error);
	 * }
	 */
	abstract ok: boolean;

	/**
	 * Like {@linkcode map} but applies to a {@linkcode Result} a function that
	 * *also* returns a `Result`, and unwraps them to avoid nested `Result`s.
	 * Can be useful for stringing together operations that might fail.
	 * It's the same as {@linkcode Array.flatMap}, which `map`s a function that
	 * returns an `Array`, and then "flattens" the resulting `Array<Array<A>>`.
	 * @param f The function to apply.
	 * @returns A new {@linkcode Result} containing either a new value or one.
	 * of two errors: the one from the original `Result` if it was an
	 * {@linkcode Err}, or the one from the function `f` if it failed.
	 * @example
	 * const requestUser = (id: number): Result<string, User> => {...};
	 * const getEmail = (user: User): Result<string, string> => {...};
	 *
	 * // Request fails: Err('Network failure')
	 * // Request succeeds, problem accessing email: Err('Email field missing')
	 * // Both succeed: Ok('email_address')
	 * requestUser(id).flatMap(getEmail);
	 */
	abstract flatMap<F, B>(f: (a: A) => Result<F, B>): Result<E | F, B>;

	/**
	 * The companion to {@linkcode map}.
	 * Applies a function to the error in `Err`, does nothing to an `Ok`.
	 * @param g The function to apply if this is an `Err`.
	 * @returns A new {@linkcode Result} with a different error.
	 */
	abstract mapError<F>(g: (e: E) => F): Result<F, A>;

	/**
	 * Unwraps the {@linkcode Result}, throwing an error with the provided
	 * message if {@linkcode Err}.
	 * @param message The message to include in the thrown error.
	 * @returns The value inside the {@linkcode Result} if {@linkcode Ok}.
	 * @throws An error with the passed `message` if {@linkcode Err}.
	 */
	abstract getOrThrow(message: string): A;

	/**
	 * Unwraps the {@linkcode Result}, throwing an error with the provided
	 * message if {@linkcode Ok}.
	 * @param message The message to include in the thrown error.
	 * @returns The error inside the {@linkcode Result} if {@linkcode Err}.
	 * @throws An error with the passed `message` if {@linkcode Ok}.
	 */
	abstract getErrorOrThrow(message: string): E;

	/**
	 * Applies a function to the value in an `Ok`, does nothing to an `Err`.
	 * Similar to {@link Optional.map}.
	 * @param f The function to apply if this is an `Ok`.
	 * @returns A new {@linkcode Result} containing a new value.
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
		return this.flatMap((a) => new Ok(f(a)));
	}
}

class Ok<E, A> extends ResultBase<E, A> {
	ok = true as const;

	/**
	 * The value wrapped inside an `Ok`. Can be extracted directly if
	 * {@linkcode Ok.ok|.ok} is checked first and found to be `true`.
	 */
	value: A;

	flatMap<F, B>(f: (a: A) => Result<F, B>): Result<E | F, B> {
		return f(this.value);
	}

	mapError<F>(): Result<F, A> {
		return new Ok(this.value);
	}

	getOrThrow(): A {
		return this.value;
	}

	getErrorOrThrow(throwMessage: string): E {
		throw new Error(throwMessage);
	}

	constructor(a: A) {
		super();
		this.value = a;
	}
}

class Err<E, A> extends ResultBase<E, A> {
	ok = false as const;

	/**
	 * The value wrapped inside an `Err`. Can be extracted directly if
	 * {@linkcode Err.ok|.ok} is checked first and found to be `false`.
	 */
	error: E;

	flatMap<F, B>(): Result<E | F, B> {
		return new Err(this.error);
	}

	mapError<F>(g: (e: E) => F): Result<F, A> {
		return new Err(g(this.error));
	}

	getOrThrow(throwMessage: string): A {
		throw new Error(throwMessage);
	}

	getErrorOrThrow(): E {
		return this.error;
	}

	constructor(e: E) {
		super();
		this.error = e;
	}
}

/**
 * Constructs an instance of a {@linkcode Result}, specifically an
 * {@linkcode Ok}.
 * @param value A value to be placed inside an {@linkcode Ok}.
 * @example
 * const result: Result<string, number> = ok(5);
 * const result = ok<string, number>(5);
 */
const ok = <E, A>(value: A): Result<E, A> => new Ok(value);

/**
 * Constructs an instance of a {@linkcode Result}, specifically an
 * {@linkcode Err}.
 * @param value An error to be placed inside an {@linkcode Err}.
 * @example
 * const result: Result<string, number> = error('Something went wrong');
 * const result = error<string, number>('Something went wrong');
 */
const error = <E, A>(err: E): Result<E, A> => new Err(err);

export { Result, ok, error };
