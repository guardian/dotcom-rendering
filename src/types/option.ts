// ----- Imports ----- //

import { Monad } from './monad';
import { identity } from 'lib';


// ----- Classes ----- //

interface OptionInterface<A> extends Monad<A> {
    withDefault(a: A): A;
}

class Some<A> implements OptionInterface<A> {

    value: A;

    /**
     * Returns the value if `Some`, otherwise returns `a`. You can think of it
     * as "unwrapping" the `Option`, getting you back a plain value
     * @param a The value to fall back to if the `Option` is `None`
     * @returns {A} The value for a `Some`, `a` for a `None`
     * @example
     * const bylineOne = new Some('CP Scott');
     * bylineOne.withDefault('Jane Smith'); // Returns 'CP Scott'
     *
     * const bylineTwo = new None();
     * bylineTwo.withDefault('Jane Smith'); // Returns 'Jane Smith'
     */
    withDefault(_a: A): A {
        return this.value;
    }

    /**
     * Also called `map` (we've called it `fmap` for
     * [reasons](https://github.com/guardian/apps-rendering/pull/166)).
     * Applies a function to a `Some`, does nothing to a `None`.
     * @param f The function to apply
     * @returns {Option<B>} A new `Option`
     * @example
     * const creditOne = new Some('Nicéphore Niépce');
     * // Returns Some('Photograph: Nicéphore Niépce')
     * creditOne.fmap(name => `Photograph: ${name}`);
     * 
     * const creditTwo = new None();
     * creditTwo.fmap(name => `Photograph: ${name}`); // Returns None()
     * 
     * // All together
     * credit.fmap(name => `Photograph: ${name}`).withDefault('');
     */
    fmap<B>(f: (a: A) => B): Option<B> {
        return new Some(f(this.value));
    }

    /**
     * Like `fmap` but applies a function that *also* returns an `Option`.
     * Then "unwraps" the result for you so you don't end up with
     * `Option<Option<A>>`
     * @param f The function to apply
     * @returns {Option<B>} A new `Option`
     * @example
     * type GetUser = number => Option<User>;
     * type GetUserName = User => Option<string>;
     * 
     * const userId = 1;
     * const username: Option<string> = getUser(userId).andThen(getUserName);
     */
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

    fmap<B>(_f: (a: A) => B): Option<B> {
        return new None();
    }

    andThen<B>(_f: (a: A) => Option<B>): Option<B> {
        return new None();
    }

}

/**
 * Represents a value that may or may not exist; it's either a Some or a None.
 * @extends Monad
 */
type Option<A> = Some<A> | None<A>;


// ----- Constructors ----- //

/**
 * Turns a value that may be `null` or `undefined` into an `Option`.
 * If it's `null` or `undefined` the `Option` will be a `None`. If it's
 * some other value the `Option` will be a `Some` "wrapping" that value.
 * @param a The value that may be `null` or `undefined`
 * @returns {Option<A>} An `Option`
 */
const fromNullable = <A>(a: A | null | undefined): Option<A> =>
    a === null || a === undefined ? new None() : new Some(a);

// ----- Serialisation ----- //

/**
 * Transforms Option into a type that JSON.stringify understands
 * @param opt The option to be made serialisable
 */
const toSerialisable = <A>(opt: Option<A>): A | null =>
    opt.fmap<A | null>(identity).withDefault(null);


// ----- Exports ----- //

export {
    Option,
    Some,
    None,
    fromNullable,
    toSerialisable,
};
