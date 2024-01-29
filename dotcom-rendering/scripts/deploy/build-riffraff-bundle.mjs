import path from 'node:path';
import * as url from 'node:url';
import cpy from 'cpy';
import { log, warn } from '../../../scripts/log.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const target = path.resolve(dirname, '../..', 'target');

/** This task generates the riff-raff bundle. It creates the following
 * directory layout under target/
 * target
 * ├── build.json
 * ├── riff-raff.yaml
 * ├── ${copyFrontendStatic()}
 * ├── ${copyApp('rendering')} // existing rendering app
 * ├── ${copyApp('article-rendering')} // new article-rendering app
 * ├── ${copyApp('facia-rendering')} // To be implemented
 * ├── ${copyApp('misc-rendering')} // To be implemented
 * └── ${copyApp('interactive-rendering')} // To be implemented
 */

/**
 * This method creates a bundle needed to run an app including:
 * - CloudFormation files
 * - .zip artefact comprised of the JS app
 *
 * It generates a folder like this:
 * ├── ${guAppName}-cfn
 * │   ├── ${guAppName}Rendering-CODE.template.json
 * │   └── ${guAppName}Rendering-PROD.template.json
 * └── ${guAppName}
 *     └── dist
 *         └── ${guAppName}.zip
 *
 *  Except for the instance where appName === 'rendering' due to backwards compatibility
 *
 * @param guAppName {`${'article' | 'facia' | 'misc' | 'interactive'}-rendering` | 'rendering'}
 **/
const copyApp = (guAppName) => {
	/**
	 * @param {string} str
	 * @returns {string}
	 */
	const kebabToPascalCase = (str) =>
		str
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('');

	/**
	 * @param {"CODE" | "PROD"} stage
	 * @returns {string}
	 */
	const cfnTemplateName = (stage) => {
		if (guAppName === 'rendering') {
			return `DotcomRendering-${stage}.template.json`;
		} else {
			return `${kebabToPascalCase(guAppName)}-${stage}.template.json`;
		}
	};

	const cfnFolder = `${guAppName}-cfn`;

	log(` - copying app: ${guAppName}`);

	log(` - ${guAppName}: copying cloudformation config`);
	const cfnJob = cpy(
		[
			`cdk.out/${cfnTemplateName('CODE')}`,
			`cdk.out/${cfnTemplateName('PROD')}`,
		],
		path.resolve(target, cfnFolder),
	);

	log(` - ${guAppName}: copying makefile`);
	const makefileJob = cpy(['makefile'], path.resolve(target, guAppName));

	log(` - ${guAppName}: copying server dist`);
	const serverDistJob = cpy(
		path.resolve(dirname, '../../dist/**'),
		path.resolve(target, guAppName, 'dist'),
		{
			nodir: true,
		},
	);

	log(` - ${guAppName}: copying scripts`);
	const scriptsJob = cpy(
		path.resolve(dirname, '../../scripts/**'),
		path.resolve(target, guAppName, 'scripts'),
		{
			nodir: true,
		},
	);

	return [cfnJob, makefileJob, serverDistJob, scriptsJob];
};

/**
 * This method copies the static files over the frontend-static folder, which is then deployed to S3.
 *
 * It generates a folder like this:
 * ├── frontend-static
 *     ├── assets
 *     │   └── **
 *     │       └── *
 *     └── static
 *         ├── frontend
 *         │   └── **
 *         │       └── *
 *         └── etc
 */
const copyFrontendStatic = () => {
	log(' - copying static');
	const staticJob = cpy(
		path.resolve(dirname, '../../src/static/**'),
		path.resolve(target, 'frontend-static', 'static', 'frontend'),
		{
			nodir: true,
		},
	);

	const source = path.resolve(dirname, '../../dist');
	const dest = path.resolve(target, 'frontend-static', 'assets');

	log(' - copying dist => assets');
	const distToAssetsJob = cpy(
		path.resolve(source, '**/*.!(html|json)'),
		dest,
		{
			nodir: true,
		},
	);

	log(' - copying stats => assets');
	const statsToAssetsJob = cpy(
		path.resolve(source, 'stats'),
		path.resolve(dest, 'stats'),
		{
			nodir: true,
		},
	);

	return [staticJob, distToAssetsJob, statsToAssetsJob];
};

const copyRiffRaff = () => {
	log(' - copying riffraff yaml');
	return cpy(['riff-raff.yaml'], target, {
		cwd: dirname,
	});
};

Promise.all([
	...copyApp('rendering'), // existing rendering app
	...copyApp('article-rendering'), // new article-rendering app
	// ...copyApp('facia-rendering'), // To be implemented
	// ...copyApp('misc-rendering'), // To be implemented
	// ...copyApp('interactive-rendering'), // To be implemented
	...copyFrontendStatic(),
	copyRiffRaff(),
]).catch((err) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- ignore
	warn(err.stack);
	process.exit(1);
});
