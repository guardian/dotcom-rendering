const fetch = require('node-fetch');
const os = require('os');
const { exec } = require('child_process');

class GuStatsReportPlugin {
	constructor(config) {
		this.buildName = config?.buildName;
		this.project = config?.project;
		this.team = config?.team;
		this.sessionId = config?.sessionId;
		this.buildCount = 0;

		this.gitBranch = undefined;
		this.gitHash = undefined;

		// Since we can't make asynchronous calls in the constructor, we'll call these fetch
		// methods, and they'll update this.gitBranch and this.gitHash once the data is fetched.
		this.fetchGitBranch();
		this.fetchGitHash();

		if (config?.displayDisclaimer)
			console.log(
				'[gu-stats-report] This project reports build information, stats & basic machine information for internal use only. We will use this information to help us improve developer experience for this project.',
			);
	}

	isValidConfig() {
		if (!this.buildName || !this.project || !this.team) return false;
		return true;
	}

	fetchGitBranch() {
		exec('git branch --show-current', (err, stdout) => {
			if (err)
				return console.error(
					'[gu-stats-report] Failed to get current git branch',
				);
			this.gitBranch = stdout.trim();
		});
	}

	fetchGitHash() {
		exec('git rev-parse --short HEAD', (err, stdout) => {
			if (err)
				return console.error(
					'[gu-stats-report] Failed to get current git hash',
				);
			this.gitHash = stdout.trim();
		});
	}

	apply(compiler) {
		const onDone = (stats) => {
			// Increment the buildCount
			this.buildCount += 1;

			if (!this.isValidConfig)
				return console.log(
					'[gu-stats-report] Unable to report stats - invalid config',
				);

			const URL = 'https://logs.code.dev-guardianapis.com/log';
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
						? console.log(
								`[gu-stats-report] Stats reported for '${this.buildName}' build. (Session build count - ${this.buildCount})`,
						  )
						: console.error(
								`[gu-stats-report] ${this.buildName} (${this.buildCount}): Failed to report stats (${status})`,
						  ),
				)
				.catch(() =>
					console.error(
						`[gu-stats-report] ${this.buildName} (${this.buildCount}): Failed to report stats`,
					),
				);
		};

		if (compiler.hooks) {
			const plugin = { name: 'GuStatsReportPlugin' };
			compiler.hooks.done.tap(plugin, onDone);
		}
	}
}

module.exports = GuStatsReportPlugin;
