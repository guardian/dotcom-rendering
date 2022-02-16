import execa from 'execa';
import { warn, log } from '../env/log';

const run = async () => {
	try {
		await execa('command', ['-v', 'fast']);
		const { stdout } = await execa('fast', [
			'--start-cmd',
			'make build;make start',
			'--target-url',
			'http://localhost:9000/ArticlePerfTest',
			'--append',
		]);

		log(stdout);
	} catch (e) {
		warn(e.stack);
		process.exit(1);
	}
};

// eslint-disable-next-line no-void -- can’t satisfy both lint rules
void run();
