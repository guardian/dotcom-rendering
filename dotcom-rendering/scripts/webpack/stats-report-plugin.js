const fetch = require('node-fetch');

class GuStatsReportPlugin {
	constructor(config) {
		this.buildName = config?.buildName || 'unknown';
	}

	apply(compiler) {
		const onDone = (stats) => {
			`console.log('Stats Report Plugin: Done!!');`;

			// console.log(stats);]
			console.log(Object.keys(stats.compilation));
			console.log(
				stats.compilation.endTime - stats.compilation.startTime,
			);

			const URL = 'https://logs.code.dev-guardianapis.com/log';
			fetch(URL, {
				method: 'POST',
				body: JSON.stringify({
					label: 'buildstats',
					properties: [
						{
							name: 'buildName',
							value: this.buildName,
						},
						{
							name: 'project',
							value: 'dotcom-rendering',
						},
						{
							name: 'team',
							value: 'dotcom',
						},
					],
					metrics: [
						{
							name: 'buildTime',
							value:
								stats.compilation.endTime -
									stats.compilation.startTime || 0,
						},
					],
				}),
			}).then(() => console.log('Stats reported!'));
		};

		if (compiler.hooks) {
			const plugin = { name: 'GuStatsReportPlugin' };
			compiler.hooks.done.tap(plugin, onDone);
		}
	}
}

module.exports = GuStatsReportPlugin;
