// ----- Imports ----- //

import { maybeRender, pipe } from '@guardian/common-rendering/src/lib';
import type { Option } from '@guardian/types';
import {
	fromNullable,
	map,
	none,
	OptionKind,
	some,
	withDefault,
} from '@guardian/types';
import { Optional } from 'optional';
import { Result } from 'result';

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

const parseIntOpt = (int: string): Option<number> => {
	const parsed = parseInt(int);

	return isNaN(parsed) ? none : some(parsed);
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
