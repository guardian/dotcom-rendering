// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const webpackPreprocessor = require('cypress-webpack-preprocessor-v5');

module.exports = (on, config) => {
	config.env = { ...config.env, ...process.env };

	const webpackConfig = webpackPreprocessor.defaultOptions;
	webpackConfig.webpackOptions.module.rules[0].exclude = require('../../scripts/webpack/browser').babelExclude;

	on('file:preprocessor', webpackPreprocessor(webpackConfig));
	return config;
};
