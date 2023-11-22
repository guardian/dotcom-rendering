import path from 'node:path';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { defineConfig } from 'cypress';
import { babelExclude } from './webpack/webpack.config.client.js';

// https://docs.cypress.io/guides/references/configuration

module.exports = defineConfig({
	viewportWidth: 1500,
	viewportHeight: 860,
	video: false,
	chromeWebSecurity: false,
	numTestsKeptInMemory: 5,
	blockHosts: [
		'*ophan.theguardian.com',
		'pixel.adsafeprotected.com',
		'*permutive.com',
		'*adnxs.com',
		'*adsystem.com',
		'*casalemedia.com',
		'*pubmatic.com',
		'*360yield.com',
		'*omnitagjs.com',
		'*the-ozone-project.com',
		'*openx.net',
	],
	retries: {
		runMode: 5,
		openMode: 0,
	},
	e2e: {
		setupNodeEvents(on, config) {
			config.env = { ...config.env, ...process.env };

			const webpackConfig = webpackPreprocessor.defaultOptions;
			webpackConfig.webpackOptions.resolve = {
				extensions: ['.ts', '.js'],
			};
			const rules = webpackConfig.webpackOptions.module.rules;
			rules[0].exclude = babelExclude;

			// Adding this here so that we can import the fixture in the sign-in-gate.cy.js file
			rules.push({
				test: path.resolve(__dirname, `./fixtures/generated/articles`),
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
		},
		baseUrl: 'http://localhost:9000/',
	},
});
