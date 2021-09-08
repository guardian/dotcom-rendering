// ----- Imports ----- //

import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";

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

// ----- Exports ----- //

export { darkModeCss };
