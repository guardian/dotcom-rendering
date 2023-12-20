// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

// THIS IS ONE IS TRICKIER, THIS IS MORE OF A GUIDE FOR HOW TO PROCEED.
// IT'S NOT FINISHED.

import { mergeWithRules } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import { base } from './base.mjs';
import { server } from './bundle.server.mjs';

/** @type {import("webpack").Configuration} */
export const devServer = {
	externals: [
		// https://github.com/liady/webpack-node-externals/issues/105

		nodeExternals({
			allowlist: [/^@guardian/],
			additionalModuleDirs: [
				// Since we use yarn-workspaces for the monorepo, node_modules
				// will be co-located both in the
				// '(project-root)/dotcom-rendering/node_modules' directory
				// (default for webpack-node-externals) but also in project
				// root, and any workspaces we link to. We want to make sure all
				// of these are removed from the server build.
				'../node_modules',
			],
		}),
		// @aws-sdk modules are only used in CODE/PROD, so we don't need to
		// include them in the development bundle
		({ request }, callback) => {
			return request?.startsWith('@aws-sdk')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
	],
	module: {
		rules: [
			{
				test: /(\.tsx|\.js|\.ts)$/,
				use: [
					{
						loader: 'swc-loader',
						options: {
							minify: false,
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
			use: [{ loading: 'match', options: 'merge' }],
		},
	},
});

export default merge(base(import.meta.url), server, devServer);
