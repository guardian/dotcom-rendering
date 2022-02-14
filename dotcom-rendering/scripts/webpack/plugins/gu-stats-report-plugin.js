const fetch = require('node-fetch');
const os = require('os');
const { exec } = require('child_process');
const chalk = require('chalk');

const PLUGIN_NAME = 'GuStatsReportPlugin';

class GuStatsReportPlugin {
	constructor(config) {
		this.buildName = config?.buildName;
		this.project = config?.project;
		this.team = config?.team;
		this.sessionId = config?.sessionId;
		this.buildCount = 0;
		this.logger = console;

		this.gitBranch = undefined;
		this.gitHash = undefined;

		// Since we can't make asynchronous calls in the constructor, we'll call these fetch
		// methods, and they'll update this.gitBranch and this.gitHash once the data is fetched.
		this.fetchGitBranch();
		this.fetchGitHash();

		if (config?.displayDisclaimer)
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

	apply(compiler) {
		this.logger = compiler.getInfrastructureLogger(PLUGIN_NAME);

		const onDone = (stats) => {
			// Increment the buildCount
			this.buildCount += 1;

			if (!this.isValidConfig)
				return this.logger.error(
					'Unable to report stats - invalid config',
				);

			const URL = 'https://logs.guardianapis.com/log';
			fetch(URL, {
				method: 'POST',
				body: JSON.stringify({
					label: 'buildstats',
					properties: [
						{
							name: 'project',
							value: 'dotcom-rendering',
						},
						{
							name: 'team',
							value: 'dotcom',
						},
						{
							name: 'buildName',
							value: this.buildName,
						},
						{
							name: 'buildCount',
							value: this.buildCount,
						},
						{
							name: 'gitHash',
							value: this.gitHash || 'unknown',
						},
						{
							name: 'gitBranch',
							value: this.gitBranch || 'unknown',
						},
						{
							name: 'sessionId',
							value: this.sessionId,
						},
						{
							name: 'cpus',
							value: os.cpus().length,
						},
						{
							name: 'memoryKb',
							value: Math.round(os.totalmem() / 1024),
						},
					],
					metrics: [
						{
							name: 'buildTime',
							value:
								stats.compilation.endTime -
									stats.compilation.startTime || 0,
						},
						{
							name: 'memoryUsageKb',
							// Memory usage in kb to 2dp
							// Why use RSS? https://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for
							value:
								Math.round(
									(process.memoryUsage().rss / 1024) * 100,
								) / 100,
						},
					],
				}),
			})
				.then(({ ok, status }) =>
					ok
						? this.logger.log(
								`Stats reported for '${this.buildName}' build. (Session build count - ${this.buildCount})`,
						  )
						: this.logger.error(
								`${this.buildName} (${this.buildCount}): Failed to report stats (${status})`,
						  ),
				)
				.catch(() =>
					this.logger.error(
						`${this.buildName} (${this.buildCount}): Failed to report stats`,
					),
				);
		};

		if (compiler.hooks) {
			const plugin = { name: PLUGIN_NAME };
			compiler.hooks.done.tap(plugin, onDone);
		}
	}
}

module.exports = GuStatsReportPlugin;
