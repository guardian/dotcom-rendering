// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import type { Option } from '../vendor/@guardian/types/index';
import {
	fromNullable,
	map,
	none,
	OptionKind,
	some,
	withDefault,
} from '../vendor/@guardian/types/index';
import { Optional } from 'optional';
import type { ReactElement } from 'react';
import { Result } from 'result';

// ----- Types ----- //

type Styleable<Props> = Props & {
	css?: SerializedStyles;
	className?: string;
};

// ----- Functions ----- //

const compose =
	<A, B, C>(f: (_b: B) => C, g: (_a: A) => B) =>
	(a: A): C =>
		f(g(a));

const identity = <A>(a: A): A => a;

// The nodeType for ELEMENT_NODE has the value 1.
function isElement(node: Node): node is Element {
	return node.nodeType === 1;
}

const toArray = Array.of.bind(null);

function memoise<A>(fn: () => A): () => A {
	let state: A | null = null;
	const memoised: () => A = () => {
		if (!state) {
			state = fn();
		}
		return state;
	};
	return memoised;
}

function errorToString(error: unknown, fallback: string): string {
	if (typeof error === 'object' && !Array.isArray(error)) {
		return error?.toString() ?? fallback;
	}

	return fallback;
}

// Based on a suggestion from the typescript-eslint project
// https://github.com/typescript-eslint/typescript-eslint/issues/2118#issuecomment-641464651
const isObject = (a: unknown): a is Record<string, unknown> =>
	typeof a === 'object' && a !== null;

function handleErrors(response: Response): Response | never {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}

const index =
	(i: number) =>
	<A>(arr: A[]): Option<A> =>
		fromNullable(arr[i]);

const indexOptional =
	(i: number) =>
	<A>(arr: A[]): Optional<A> =>
		Optional.fromNullable(arr[i]);

const resultFromNullable =
	<E>(e: E) =>
	<A>(a: A | null | undefined): Result<E, A> =>
		a === null || a === undefined ? Result.err(e) : Result.ok(a);

/**
 * Attempts to parse a `string` into an integer (`number`). Returns an
 * {@linkcode Optional} `Some` if a valid number, and a `None` if not.
 * Note: `NaN`s are considered invalid.
 *
 * @param str A `string` to be parsed
 * @returns {Optional<number>} A valid number in a `Some`, or a `None`
 */
const parseIntOpt = (str: string): Optional<number> => {
	const parsed = parseInt(str);

	return isNaN(parsed) ? Optional.none() : Optional.some(parsed);
};

const resultMap3 =
	<A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
	<E>(resultA: Result<E, A>) =>
	(resultB: Result<E, B>) =>
	(resultC: Result<E, C>): Result<E, D> =>
		resultA.flatMap((a) =>
			resultB.flatMap((b) => resultC.map((c) => f(a, b, c))),
		);

const optionMap3 =
	<A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
	(optA: Option<A>, optB: Option<B>, optC: Option<C>): Option<D> => {
		if (
			optA.kind === OptionKind.Some &&
			optB.kind === OptionKind.Some &&
			optC.kind === OptionKind.Some
		) {
			return some(f(optA.value, optB.value, optC.value));
		}
		return none;
	};

const resultToNullable = <E, A>(result: Result<E, A>): A | undefined =>
	result.isOk() ? result.value : undefined;

const resultMap2 =
	<A, B, C>(f: (a: A, b: B) => C) =>
	<E>(resultA: Result<E, A>) =>
	(resultB: Result<E, B>): Result<E, C> =>
		resultA.flatMap((a) => resultB.map((b) => f(a, b)));

const fold =
	<A, B>(f: (value: A) => B, ifNone: B) =>
	(opt: Option<A>): B => {
		return withDefault(ifNone)(map(f)(opt));
	};

const toNullable = <A>(opt: Option<A>): A | undefined =>
	withDefault<A | undefined>(undefined)(opt);

/**
 * A convenience method for "piping" a value through a series of functions,
 * creating a "pipeline" of code. It is equivalent to a series of nested
 * function calls, but without the need for so many brackets, and with the
 * function names appearing in the order that they will be called. See the
 * example for more details.
 *
 * It's variadic, meaning that it takes a variable number of arguments. In this
 * case it means it can take one or more functions to "pipe" the value through.
 *
 * @param a A value to pass to the first function
 * @param f The first function to pass the value to
 * @param g The second function, which takes the result of the first, `f`
 * @param h The third function, which takes the result of the second, `g`
 * @example
 * const addThree = (n: number): number => n + 3
 * const subTwo = (n: number): number => n - 2
 * const multFour = (n: number): number => n * 4
 *
 * const num = 42
 *
 * // The function names are written in the opposite order to the one they're
 * // called in: <-
 * const resultOne = multFour(subTwo(addThree(num)));
 *
 * // The function names are written in the order in which they're called: ->,
 * // and the enclosing brackets are not required
 * const resultTwo = pipe(
 *     num,
 *     addThree,
 *     subTwo,
 *     multFour,
 * );
 */
function pipe<A, B>(a: A, f: (_a: A) => B): B;
function pipe<A, B, C>(a: A, f: (_a: A) => B, g: (_b: B) => C): C;
function pipe<A, B, C, D>(
	a: A,
	f: (_a: A) => B,
	g: (_b: B) => C,
	h: (_c: C) => D,
): D;
function pipe<A, B, C, D>(
	a: A,
	f: (_a: A) => B,
	g?: (_b: B) => C,
	h?: (_c: C) => D,
): unknown {
	if (g !== undefined && h !== undefined) {
		return h(g(f(a)));
	} else if (g !== undefined) {
		return g(f(a));
	}

	return f(a);
}

/**
 * A convenience function for conditional rendering, based on the presence of
 * a value. If the value is present (i.e. non-optional, a `Some`), then some UI
 * will be rendered using function `f`. If the value is missing (i.e. a `None`),
 * then no UI will be rendered (i.e. a `null` value will be returned as per the
 * React spec).
 *
 * @param oa A value, of type `A`, that may be missing (i.e. optional)
 * @param f A function that renders some React code.
 * Will be called with the value of type `A` if it is present
 * @returns {ReactElement | null} A rendered `ReactElement`, or `null`
 * @example
 * const one: Option<string> = some("A headline");
 * const two: Option<string> = none;
 *
 * // Will render the h1 tag
 * const headlineOne = maybeRender(one, (text: string) =>
 *     <h1>{text}</h1>
 * )
 *
 * // Will render nothing (null)
 * const headlineTwo = maybeRender(two, (text: string) =>
 *     <h1>{text}</h1>
 * )
 */
const maybeRender = <A>(
	oa: Option<A>,
	f: (a: A) => ReactElement | null,
): ReactElement | null =>
	pipe(oa, map(f), withDefault<ReactElement | null>(null));

// ----- Exports ----- //

export {
	compose,
	pipe,
	identity,
	isElement,
	toArray,
	memoise,
	errorToString,
	isObject,
	maybeRender,
	handleErrors,
	index,
	indexOptional,
	resultFromNullable,
	optionMap3,
	parseIntOpt,
	resultMap2,
	resultMap3,
	resultToNullable,
	fold,
	toNullable,
};

export type { Styleable };
