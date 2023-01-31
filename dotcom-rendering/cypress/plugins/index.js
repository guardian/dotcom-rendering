// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import path from 'path';

const webpackPreprocessor = require('cypress-webpack-preprocessor-v5');

module.exports = (on, config) => {
	config.env = { ...config.env, ...process.env };

	const webpackConfig = webpackPreprocessor.defaultOptions;
	// Adding this here so that we can use a module from source code in the cypress tests
	webpackConfig.webpackOptions.resolve = {
		extensions: ['.ts', '.js'],
		alias: {
			src: path.resolve(__dirname, `../../src`),
		},
	};
	const rules = webpackConfig.webpackOptions.module.rules;
	rules[0].exclude =
		require('../../scripts/webpack/webpack.config.browser').babelExclude;

	rules.push({
		test: /\.ts$/,
		exclude: ['/node_modules/'],
		loader: 'ts-loader',
		options: {
			compilerOptions: {
				noEmit: false,
			},
		},
	});
	on('file:preprocessor', webpackPreprocessor(webpackConfig));
	return config;
};
