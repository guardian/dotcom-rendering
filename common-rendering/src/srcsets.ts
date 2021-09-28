// ----- Imports ----- //

import { createHash } from "crypto";
import type { Result } from "@guardian/types";
import { fromUnsafe, ResultKind } from "@guardian/types";

// ----- Setup ----- //

const imageResizer = "https://i.guim.co.uk/img";

const defaultWidths = [140, 500, 1000, 1500, 2000, 2500, 3000];

// Percentage.
const defaultQuality = 85;
const lowerQuality = 45;

// ----- Types ----- //

const enum Dpr {
  One,
  Two,
}

interface Srcsets {
  srcset: string;
  dpr2Srcset: string;
}

// ----- Functions ----- //

const getSubdomain = (domain: string): string => domain.split(".")[0];

const sign = (salt: string, path: string): string =>
  createHash("md5")
    .update(salt + path)
    .digest("hex");

function src(salt: string, input: string, width: number, dpr: Dpr): string {
  const maybeUrl: Result<string, URL> = fromUnsafe(
    () => new URL(input),
    "invalid url"
  );

  switch (maybeUrl.kind) {
    case ResultKind.Ok: {
      const url = maybeUrl.value;
      const service = getSubdomain(url.hostname);

      const params = new URLSearchParams({
        width: width.toString(),
        quality:
          dpr === Dpr.Two ? lowerQuality.toString() : defaultQuality.toString(),
        fit: "bounds",
      });

      const path = `${url.pathname}?${params.toString()}`;
      const sig = sign(salt, path);

      return `${imageResizer}/${service}${path}&s=${sig}`;
    }
    case ResultKind.Err:
    default: {
      return input;
    }
  }
}

const srcsetWithWidths = (widths: number[]) => (
  url: string,
  salt: string,
  dpr: Dpr
): string =>
  widths.map((width) => `${src(salt, url, width, dpr)} ${width}w`).join(", ");

const srcset: (
  url: string,
  salt: string,
  dpr: Dpr
) => string = srcsetWithWidths(defaultWidths);

const srcsets = (url: string, salt: string): Srcsets => ({
  srcset: srcset(url, salt, Dpr.One),
  dpr2Srcset: srcset(url, salt, Dpr.Two),
});

// ----- Exports ----- //

export type { Srcsets };

export { Dpr, src, srcset, srcsets, srcsetWithWidths };
