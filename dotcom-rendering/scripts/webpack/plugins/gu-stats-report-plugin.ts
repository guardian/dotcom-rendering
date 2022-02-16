import fetch from 'node-fetch';
import os from 'os';
import { exec } from 'child_process';
import type { Compiler, Stats, WebpackPluginInstance } from 'webpack';

const PLUGIN_NAME = 'GuStatsReportPlugin';

class GuStatsReportPlugin implements WebpackPluginInstance {
	protected buildName: string;

	protected project: string;

	protected team: string;

	protected sessionId: string;

	protected buildCount = 0;

	protected logger: {
		error: (...args: unknown[]) => void;
		log: (...args: unknown[]) => void;
	} = console;

	protected gitBranch: string = 'unknown';

	protected gitHash: string = 'unknown';

	constructor(config?: {
		team: string;
		buildName: string;
		project: string;
		sessionId: string;
		displayDisclaimer?: boolean;
	}) {
		this.buildName = config?.buildName ?? 'unknown';
		this.project = config?.project ?? 'unknown';
		this.team = config?.team ?? 'unknown';
		this.sessionId = config?.sessionId ?? 'unknown';

		// Since we can't make asynchronous calls in the constructor, we'll call these fetch
		// methods, and they'll update this.gitBranch and this.gitHash once the data is fetched.
		this.fetchGitBranch();
		this.fetchGitHash();

		if (config?.displayDisclaimer)
			this.logger.log(
				'This project reports compilation and machine stats to improve the development experience.',
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

	apply(compiler: Compiler) {
		this.logger = compiler.getInfrastructureLogger(PLUGIN_NAME);

		const onDone = (stats: Stats) => {
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
							value: String(this.buildCount),
						},
						{
							name: 'gitHash',
							value: this.gitHash,
						},
						{
							name: 'gitBranch',
							value: this.gitBranch,
						},
						{
							name: 'sessionId',
							value: this.sessionId,
						},
						{
							name: 'cpus',
							value: String(os.cpus().length),
						},
						{
							name: 'memoryKb',
							value: String(Math.round(os.totalmem() / 1024)),
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

export default GuStatsReportPlugin;
