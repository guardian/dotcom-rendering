// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

import { merge } from 'webpack-merge';
import { base } from './base.mjs';
import { web } from './client.web.mjs';

/** @type {import("webpack").Configuration} */
export const webVariant = {};

export default merge(base(import.meta.url), web, webVariant);
