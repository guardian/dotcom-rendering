import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

/**
 * In Node 16, this can be turned into
 * `import {devDependencies} from "../../../package.json" assert { type: "json" };`
 *
 * @see https://simonplend.com/import-json-in-es-modules/
 */
const readDevDependencies = async () => {
	const path = join(
		fileURLToPath(import.meta.url),
		'../../..',
		'package.json',
	);

	const pkg = await readFile(path, 'utf-8');

	const { devDependencies } = JSON.parse(pkg);

	return devDependencies;
};

const devDependencies = await readDevDependencies();

if (devDependencies) {
	const { warn, log } = await import('./log');

	warn('Don’t use devDependencies');
	log('See https://github.com/guardian/dotcom-rendering/pull/4001');
	process.exit(1);
}
