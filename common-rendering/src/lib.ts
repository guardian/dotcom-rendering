// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import type { Option } from './types/option';
import { map, withDefault } from './types/option';
import { ReactElement } from 'react';

// ----- Functions ----- //

const darkModeCss = (supportsDarkMode: boolean) => (
  styles: TemplateStringsArray,
  ...placeholders: string[]
): SerializedStyles =>
  supportsDarkMode
    ? css`
        @media (prefers-color-scheme: dark) {
          ${styles
            .map(
              (style, i) => `${style}${placeholders[i] ? placeholders[i] : ""}`
            )
            .join("")}
        }
      `
    : css``;

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
 * // The function names are written in the opposite order to the one they're called in: <-
 * const resultOne = multFour(subTwo(addThree(num)));
 *
 * // The function names are written in the order in which they're called: ->, and the enclosing brackets are not required
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

export { darkModeCss, maybeRender, pipe };
