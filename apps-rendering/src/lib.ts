// ----- Imports ----- //

import { maybeRender, pipe } from '@guardian/common-rendering/src/lib';
import {
	ArticleDesign,
	ArticleFormat,
	ArticleDisplay,
	ArticleTheme,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import type { Format, Option, Result } from '@guardian/types';
import { Design, Display, Theme, Pillar, Special } from '@guardian/types';
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

const convertFormatToArticleFormat = (format: Format): ArticleFormat => {
	return {
		design: convertDesignToArticleDesign(format.design),
		display: convertDisplayToArticleDisplay(format.display),
		theme: convertThemeToArticleTheme(format.theme),
	};
};

const convertDesignToArticleDesign = (design: Design): ArticleDesign => {
	switch (design) {
		case Design.Media:
			return ArticleDesign.Media;
		case Design.Review:
			return ArticleDesign.Review;
		case Design.Analysis:
			return ArticleDesign.Analysis;
		case Design.Comment:
			return ArticleDesign.Comment;
		case Design.Letter:
			return ArticleDesign.Letter;
		case Design.Feature:
			return ArticleDesign.Feature;
		case Design.LiveBlog:
			return ArticleDesign.LiveBlog;
		case Design.DeadBlog:
			return ArticleDesign.DeadBlog;
		case Design.Recipe:
			return ArticleDesign.Recipe;
		case Design.MatchReport:
			return ArticleDesign.MatchReport;
		case Design.Interview:
			return ArticleDesign.Interview;
		case Design.Editorial:
			return ArticleDesign.Editorial;
		case Design.Quiz:
			return ArticleDesign.Quiz;
		case Design.Interactive:
			return ArticleDesign.Interactive;
		case Design.PhotoEssay:
			return ArticleDesign.PhotoEssay;
		case Design.PrintShop:
			return ArticleDesign.PrintShop;
		case Design.Obituary:
			return ArticleDesign.Obituary;
		case Design.Correction:
			return ArticleDesign.Correction;
		case Design.FullPageInteractive:
			return ArticleDesign.FullPageInteractive;
		case Design.Article:
		default:
			return ArticleDesign.Standard;
	}
};

const convertDisplayToArticleDisplay = (display: Display): ArticleDisplay => {
	switch (display) {
		case Display.Immersive:
			return ArticleDisplay.Immersive;
		case Display.Showcase:
			return ArticleDisplay.Showcase;
		case Display.NumberedList:
			return ArticleDisplay.NumberedList;
		case Display.Standard:
		default:
			return ArticleDisplay.Standard;
	}
};

const convertThemeToArticleTheme = (theme: Theme): ArticleTheme => {
	switch (theme) {
		case Pillar.Opinion:
			return ArticlePillar.Opinion;
		case Pillar.Sport:
			return ArticlePillar.Sport;
		case Pillar.Culture:
			return ArticlePillar.Culture;
		case Pillar.Lifestyle:
			return ArticlePillar.Lifestyle;
		case Special.SpecialReport:
			return ArticleSpecial.SpecialReport;
		case Special.Labs:
			return ArticleSpecial.Labs;
		case Pillar.News:
		default:
			return ArticlePillar.News;
	}
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
	convertFormatToArticleFormat,
};
