// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

import { mergeWithRules } from 'webpack-merge';
import { base } from './base.mjs';
import { web } from './client.web.mjs';

/** @type {import("webpack").Configuration} */
export const webLegacy = {
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
								[
									'@babel/preset-env',
									{
										targets: {
											ie: '11',
										},
										modules: false,
									},
								],
							],
							compact: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
};

/**
 * Replace module rules if test matches
 * @see
 * https://github.com/survivejs/webpack-merge?tab=readme-ov-file#mergewithrules
 */
const merge = mergeWithRules({
	module: {
		rules: {
			test: 'match',
			use: 'replace',
		},
	},
});

export default merge(base(import.meta.url), web, webLegacy);
