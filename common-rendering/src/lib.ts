// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";
import type { Option } from '@guardian/types';
import { map, withDefault } from '@guardian/types';
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

const maybeRender = <A>(
	oa: Option<A>,
	f: (a: A) => ReactElement | null,
): ReactElement | null =>
  pipe(oa, map(f), withDefault<ReactElement | null>(null));

// ----- Exports ----- //

export { darkModeCss, maybeRender, pipe };
