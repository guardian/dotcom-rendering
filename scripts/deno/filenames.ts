import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { walk } from "https://deno.land/std@0.190.0/fs/walk.ts";
import {
  basename,
  dirname,
  fromFileUrl,
  join,
  resolve,
} from "https://deno.land/std@0.190.0/path/mod.ts";
import { camelCase, pascalCase } from "https://deno.land/x/case@2.1.1/mod.ts";

const dir = resolve(
  join(
    dirname(fromFileUrl(import.meta.url)),
    "..",
    "..",
    "dotcom-rendering",
    "src",
  ),
);

const re = /\.tsx?$/;
const acronym = /[A-Z]{2,}/g;

const mismatches: [string, string][] = [];

for await (
  const { path } of walk(dir, {
    includeDirs: false,
  })
) {
  if (!path.match(re)) continue;
  const filename = basename(path);
  const parts = filename.split(".");
  const formattedParts = parts
    .map((part) =>
      part.replaceAll(acronym, (letters) => letters.split("").join(" "))
    )
    .map((part, index) =>
      index === 0 && filename.endsWith(".tsx")
        ? pascalCase(part)
        : camelCase(part)
    );

  try {
    assertEquals(parts, formattedParts);
  } catch (_) {
    mismatches.push([filename, formattedParts.join(".")]);
  }
}

console.log(mismatches);
Deno.exit(mismatches.length > 0 ? 1 : 0);
