const { execFileSync } = require('node:child_process');
const { warn } = require('../../../scripts/log');

try {
	const stdout = execFileSync(
		'find',
		['src', '-type', 'f', '-name', '*index*.ts*'],
		{
			encoding: 'utf8',
		},
	);
	if (stdout !== '') {
		warn(
			'The following files contain "index" in them and should be renamed:\n\n' +
				stdout +
				'\n',
		);
		process.exit(1);
	}
} catch (error) {
	console.log('Error finding index files', error);
	process.exit(1);
}
