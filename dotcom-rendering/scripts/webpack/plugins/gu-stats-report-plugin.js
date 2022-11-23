// @ts-check
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const fetch = require('node-fetch');

const PLUGIN_NAME = 'GuStatsReportPlugin';

/**
 * @typedef Config
 * @type {{ buildName : string, project: string, team: string, sessionId: string, displayDisclaimer?: boolean}}
 */

class GuStatsReportPlugin {
	/** @param {Config} config */
	constructor(config) {
		this.buildName = config.buildName;
		this.project = config.project;
		this.team = config.team;
		this.sessionId = config.sessionId;
		this.buildCount = 0;
		/** @type {Record<'log' | 'warn' | 'error', (...args: unknown[]) => void>} */
		this.logger = console;

		this.gitBranch = undefined;
		this.gitHash = undefined;

		// Since we can't make asynchronous calls in the constructor, we'll call these fetch
		// methods, and they'll update this.gitBranch and this.gitHash once the data is fetched.
		this.fetchGitBranch();
		this.fetchGitHash();

		if (config.displayDisclaimer)
			console.log(
				chalk.yellow.dim(
					'This project reports compilation and machine stats to improve the development experience.',
				),
			);
	}

	isValidConfig() {
		return !!this.buildName && !!this.project && !!this.team;
	}

	fetchGitBranch() {
		exec('git branch --show-current', (err, stdout) => {
			if (err)
				return this.logger.error('Failed to get current git branch');
			this.gitBranch = stdout.trim();
		});
	}

	fetchGitHash() {
		exec('git rev-parse --short HEAD', (err, stdout) => {
			if (err) return this.logger.error('Failed to get current git hash');
			this.gitHash = stdout.trim();
		});
	}

	/** @param {import('webpack').Compiler} compiler */
	apply(compiler) {
		this.logger = compiler.getInfrastructureLogger(PLUGIN_NAME);

		/** @param {import('webpack').Stats} stats */
		const onDone = (stats) => {
			// Increment the buildCount
			this.buildCount += 1;

			if (!this.isValidConfig)
				return this.logger.error(
					'Unable to report stats - invalid config',
				);

			// E.g. ...

			// [
			// 	{ "key": "server_build_time", "name": "DCR server build time", "value": 32000, "max": 50000 },
			// 	{ "key": "client_build_time", "name": "DCR client build time", "value": 45000, "max": 50000 }
			// ]

			const metricsFile = JSON.stringify([
				{
					key: 'build_time',
					name: 'DCR build time',
					value:
						stats.compilation.endTime -
							stats.compilation.startTime || 0,
					max: 50000,
				},
			]);

			fs.writeFile('./metrics.json', metricsFile, function (err) {
				if (err) {
					return console.log(err);
				}
				console.log('The file was saved!');
			});
		};

		if (compiler.hooks) {
			const plugin = { name: PLUGIN_NAME };
			compiler.hooks.done.tap(plugin, onDone);
		}
	}
}

module.exports = GuStatsReportPlugin;
