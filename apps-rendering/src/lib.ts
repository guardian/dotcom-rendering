// ----- Imports ----- //

import type { Option, Result } from '@guardian/types';
import {
	err,
	fromNullable,
	map,
	none,
	ok,
	OptionKind,
	ResultKind,
	some,
	withDefault,
} from '@guardian/types';
import type { ReactElement } from 'react';

// ----- Functions ----- //

const compose =
	<A, B, C>(f: (_b: B) => C, g: (_a: A) => B) =>
	(a: A): C =>
		f(g(a));

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

const maybeRender = <A>(
	oa: Option<A>,
	f: (a: A) => ReactElement | null,
): ReactElement | null => fold(f, null)(oa);

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

const resultFromNullable =
	<E>(e: E) =>
	<A>(a: A | null | undefined): Result<E, A> =>
		a === null || a === undefined ? err(e) : ok(a);

const parseIntOpt = (int: string): Option<number> => {
	const parsed = parseInt(int);

	return isNaN(parsed) ? none : some(parsed);
};

const resultMap3 =
	<A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
	<E>(resultA: Result<E, A>) =>
	(resultB: Result<E, B>) =>
	(resultC: Result<E, C>): Result<E, D> => {
		if (resultA.kind === ResultKind.Err) {
			return resultA;
		}

		if (resultB.kind === ResultKind.Err) {
			return resultB;
		}

		if (resultC.kind === ResultKind.Err) {
			return resultC;
		}

		return ok(f(resultA.value, resultB.value, resultC.value));
	};

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
	result.kind === ResultKind.Ok ? result.value : undefined;

const resultMap2 =
	<A, B, C>(f: (a: A, b: B) => C) =>
	<E>(resultA: Result<E, A>) =>
	(resultB: Result<E, B>): Result<E, C> => {
		if (resultA.kind === ResultKind.Err) {
			return resultA;
		}

		if (resultB.kind === ResultKind.Err) {
			return resultB;
		}

		return ok(f(resultA.value, resultB.value));
	};

const fold =
	<A, B>(f: (value: A) => B, ifNone: B) =>
	(opt: Option<A>): B => {
		return withDefault(ifNone)(map(f)(opt));
	};
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
	resultFromNullable,
	optionMap3,
	parseIntOpt,
	resultMap2,
	resultMap3,
	resultToNullable,
	fold,
};
