const execa = require('execa');
const { warn } = require('../../../scripts/log');

execa('find', ['src', '-type', 'f', '-name', '*index*.ts*'])
	.then(({ stdout }) => {
		if (stdout !== '') {
			warn(
				'The following files contain “index” in them and should be renamed:\n\n' +
					stdout +
					'\n',
			);
			process.exit(1);
		}
	})
	.catch(() => {
		process.exit(1);
	});
