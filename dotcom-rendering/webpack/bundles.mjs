/**
 * ESM re-export of bundles.js values for Vite/Rollup compatibility.
 *
 * These values must be kept in sync with bundles.js.
 * The original bundles.js uses module.exports (CJS) which Rollup
 * cannot resolve named exports from.
 */

/** @type {boolean} */
export const BUILD_VARIANT = false;

/** @type {(variant: 'Variant' | 'Control') => string} */
export const dcrJavascriptBundle = (variant) => `dcrJavascriptBundle${variant}`;
