// ----- Imports ----- //

import type { Option } from '../vendor/@guardian/types/index';
import { none, OptionKind, some } from '../vendor/@guardian/types/index';
import type { ReactElement } from 'react';
import { Result } from 'result';

// ----- Classes ----- //

/**
 * Represents a value that may or may not exist; it's either a Some or a None.
 */
abstract class Optional<A> {
	// ----- Abstract Methods

	/**
	 * Like {@linkcode map} but applies a function that returns an
	 * {@linkcode Optional}. Then "flattens" the result for you so you don't
	 * end up with `Optional<Optional<A>>`. It's the same as
	 * {@linkcode Array.flatMap}, which `map`s a function that returns an
	 * `Array`, and then "flattens" the resulting `Array<Array<A>>`.
	 * @param f The function to apply
	 * @returns {Optional<B>} A new {@linkcode Optional}
	 * @example
	 * const getUser = (id: number): Optional<User> => {...};
	 * const getUserName = (user: User): Optional<string> => {...};
	 *
	 * const userId = 1;
	 * const username: Optional<string> =
	 * 	getUser(userId).flatMap(getUserName);
	 */
	abstract flatMap<B>(f: (a: A) => Optional<B>): Optional<B>;

	/**
	 * Returns the value if `Some`, otherwise returns `b`. You can think of it
	 * as "unwrapping" the {@linkcode Optional}, getting you back a plain value.
	 * @param b The value to fall back to if the `Optional` is `None`
	 * @returns {A | B} The value for a `Some`, `b` for a `None`
	 * @example
	 * const bylineOne = Optional.some('CP Scott');
	 * bylineOne.withDefault('Jane Smith'); // Returns 'CP Scott'
	 *
	 * const bylineTwo = Optional.none();
	 * bylineTwo.withDefault('Jane Smith'); // Returns 'Jane Smith'
	 */
	abstract withDefault<B>(b: B): A | B;

	/**
	 * Converts an {@linkcode Optional} into a {@linkcode Result}. If the
	 * optional is a `Some` this will be an `Ok`; if the optional is a `None`
	 * this will take the supplied error and produce an `Err`.
	 * @param e The error to use when creating an `Err` from a `None`
	 * @example
	 * const opt = Optional.some('CP Scott');
	 * const result = opt.toResult('Missing name'); // Ok('CP Scott')
	 *
	 * const opt2 = Optional.none();
	 * const result2 = opt2.toResult('Missing name'); // Err('Missing name')
	 * @returns {Result<E, A>} A {@linkcode Result}
	 */
	abstract toResult<E>(e: E): Result<E, A>;

	/**
	 * Temporary method to convert to the old `Option` type.
	 */
	abstract toOption(): Option<A>;

	/**
	 * Checks if an {@linkcode Optional} is a `Some`. Can be used in type
	 * guards to narrow the type and get access to the `value` inside a `Some`.
	 * See also {@linkcode isNone}.
	 * @returns {boolean} A type predicate
	 * @example
	 * const name: Optional<string> = Optional.some('CP Scott');
	 *
	 * console.log(name.value); // Type Error: 'value' does not exist
	 *
	 * if (name.isSome()) {
	 *   console.log(name.value); // Works!
	 * }
	 */
	abstract isSome(): this is Some<A>;

	/**
	 * Checks if an {@linkcode Optional} is a `None`. Can be used in type guards
	 * to narrow the type. See also {@linkcode isSome}.
	 * @returns {boolean} A type predicate
	 * @example
	 * const name: Optional<string> = Optional.none();
	 *
	 * if (name.isNone()) {
	 *   console.log('Missing name!');
	 * }
	 */
	abstract isNone(): this is None<A>;

	/**
	 * A way to optionally render some React code, depending on the value of the
	 * {@linkcode Optional}. It takes a "rendering" function, i.e. a function
	 * that returns a ReactElement, to apply if this is a `Some`. If this is
	 * a `None`, it will instead return `null`, the way to render nothing in
	 * React.
	 *
	 * @param f The function to apply
	 * @returns {ReactElement | null} A rendered `ReactElement` if this is a
	 * `Some`, or `null` if this is a `None`
	 * @example
	 * const name: Optional<string> = Optional.some('CP Scott');
	 * name.maybeRender(n => <p>{n}</p>); // <p>CP Scott</p>
	 *
	 * const name: Optional<string> = Optional.none();
	 * name.maybeRender(n => <p>{n}</p>); // null
	 */
	abstract maybeRender(f: (a: A) => ReactElement | null): ReactElement | null;

	// ----- Static Methods

	/**
	 * Turns a value that may be `null` or `undefined` into an
	 * {@linkcode Optional}. If it's `null` or `undefined` the `Optional` will
	 * be a `None`. If it's some other value the `Optional` will be a `Some`
	 * "wrapping" that value.
	 * @param a The value that may be `null` or `undefined`
	 * @returns {Optional<A>} An {@linkcode Optional}
	 */
	static fromNullable<A>(a: A | null | undefined): Optional<A> {
		return a === null || a === undefined ? new None() : new Some(a);
	}

	/**
	 * Temporary method to convert from the old `Option` type.
	 */
	static fromOption<A>(o: Option<A>): Optional<A> {
		return o.kind === OptionKind.Some
			? Optional.some(o.value)
			: Optional.none();
	}

	/**
	 * Takes a value and wraps it up into a `Some`.
	 * @example
	 * const maybeName: Optional<string> = Optional.some('CP Scott');
	 */
	static some<A>(a: A): Optional<A> {
		return new Some(a);
	}

	/**
	 * Creates a `None`.
	 * @example
	 * const maybeName: Optional<string> = Optional.none();
	 */
	static none<A>(): Optional<A> {
		return new None();
	}

	/**
	 * Takes two {@linkcode Optional|Optionals} and applies a function if both
	 * are `Some`, does nothing if either are a `None`.
	 * @param optA The first Optional
	 * @param optB The second Optional
	 * @param f The function to apply
	 * @returns {Optional<C>} A new {@linkcode Optional}
	 * @example
	 * const firstName = Optional.some('CP');
	 * const lastName = Optional.some('Scott');
	 *
	 * const fullName: Optional<string> = Optional.map2(
	 * 	firstName,
	 * 	lastName,
	 * 	(first, last) => `${first} ${last}`,
	 * )
	 */
	static map2<A, B, C>(
		optA: Optional<A>,
		optB: Optional<B>,
		f: (a: A, b: B) => C,
	): Optional<C> {
		return optA.flatMap((a) => optB.map((b) => f(a, b)));
	}

	// ----- Methods

	/**
	 * Applies a function to a `Some`, does nothing to a `None`.
	 * @param f The function to apply
	 * @returns {Optional<B>} A new {@linkcode Optional}
	 * @example
	 * const creditOne = Optional.some('Nicéphore Niépce');
	 * // Returns Some('Photograph: Nicéphore Niépce')
	 * creditOne.map(name => `Photograph: ${name}`);
	 *
	 * const creditTwo = Optional.none();
	 * creditTwo.map(name => `Photograph: ${name}`); // Returns None
	 *
	 * // All together
	 * credit.map(name => `Photograph: ${name}`).withDefault('');
	 */
	map<B>(f: (a: A) => B): Optional<B> {
		return this.flatMap((a) => Optional.some(f(a)));
	}
}

class Some<A> extends Optional<A> {
	/**
	 * The value wrapped inside a `Some`. Can be extracted directly if
	 * {@linkcode Optional.isSome|isSome} is used in a type guard, or using
	 * {@linkcode Optional.withDefault|withDefault}.
	 */
	value: A;

	flatMap<B>(f: (a: A) => Optional<B>): Optional<B> {
		return f(this.value);
	}

	withDefault<B>(_b: B): A | B {
		return this.value;
	}

	toResult<E>(_e: E): Result<E, A> {
		return Result.ok(this.value);
	}

	toOption(): Option<A> {
		return some(this.value);
	}

	isSome(): this is Some<A> {
		return true;
	}

	isNone(): this is None<A> {
		return false;
	}

	maybeRender(f: (a: A) => ReactElement | null): ReactElement | null {
		return f(this.value);
	}

	constructor(a: A) {
		super();
		this.value = a;
	}
}

class None<A> extends Optional<A> {
	flatMap<B>(_f: (a: A) => Optional<B>): Optional<B> {
		return Optional.none();
	}

	withDefault<B>(b: B): A | B {
		return b;
	}

	toResult<E>(e: E): Result<E, A> {
		return Result.err(e);
	}

	toOption(): Option<A> {
		return none;
	}

	isSome(): this is Some<A> {
		return false;
	}

	isNone(): this is None<A> {
		return true;
	}

	maybeRender(_f: (a: A) => ReactElement | null): ReactElement | null {
		return null;
	}
}

// ----- Exports ----- //

export { Optional };
