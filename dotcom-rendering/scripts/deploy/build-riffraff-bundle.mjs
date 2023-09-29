import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as url from 'node:url';
import cpy from 'cpy';
import execa from 'execa';
import { log, warn } from '../env/log.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const target = path.resolve(dirname, '../..', 'target');

// This task generates the riff-raff bundle. It creates the following
// directory layout under target/
//
// target
// ├── build.json
// ├── riff-raff.yaml
// ├── ${copyFrontendStatic()}
// ├── ${copyApp('rendering')}
// └── ${copyApp('renderi-front')}



/**
 * This comprises of the CloudFormation files and app artifacts that
 * are needed to run an app.
 *
 * It generates a folder like this:
 * ├── ${appName}-cfn
 * │   ├── DotcomRendering-${appName}-CODE.template.json
 * │   └── DotcomRendering-${appName}-PROD.template.json
 * └── ${appName}
 *     └── dist
 *         └── ${appName}.zip
 *
 * Except for the instance where appName === 'rendering' due to backwards compatibility
 *
 * @param appName {string}
 **/
const copyApp = (appName) => {
	// This is a little hack to be backwards compatible with the naming for when this was a single stack app
	const cfnTemplateName = appName === 'rendering' ? '' : `-${appName}`;
	const cfnFolder = appName === 'rendering' ? 'frontend-cfn' : `${appName}-cfn`;

	log(` - copying stack ${appName}`);
	const jobs = [];

	log(` - ${appName}: copying cloudformation config`);
	jobs.push(
		cpy(
			[
				`cdk.out/DotcomRendering${cfnTemplateName}-CODE.template.json`,
				`cdk.out/DotcomRendering${cfnTemplateName}-PROD.template.json`,
			],
			path.resolve(target, cfnFolder),
		),
	);

	log(` - ${appName}: copying makefile`);
	jobs.push(cpy(['makefile'], path.resolve(target, appName)));

	log(` - ${appName}: copying server dist`);
	jobs.push(
		cpy(
			path.resolve(dirname, '../../dist/**'),
			path.resolve(target, appName, 'dist'),
			{
				nodir: true,
			},
		),
	);

	log(`' - ${appName}: copying scripts`);
	jobs.push(
		cpy(
			path.resolve(dirname, '../../scripts/**'),
			path.resolve(target, appName, 'scripts'),
			{
				nodir: true,
			},
		),
	);

	return jobs;
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
	const jobs = [];

	log(' - copying static');
	jobs.push(
		cpy(
			path.resolve(dirname, '../../src/static/**'),
			path.resolve(target, 'frontend-static', 'static', 'frontend'),
			{
				nodir: true,
			},
		),
	);


	const source = path.resolve(dirname, '../../dist');
	const dest = path.resolve(target, 'frontend-static', 'assets');

	log(' - copying dist => assets');
	jobs.push(
		cpy(path.resolve(source, '**/*.!(html|json)'), dest, {
			nodir: true,
		}),
	);

	log(' - copying stats => assets');
	jobs.push(
		cpy(path.resolve(source, 'stats'), path.resolve(dest, 'stats'), {
			nodir: true,
		}),
	);

	return jobs;
};


const copyRiffRaff = () => {
	log(' - copying riffraff yaml');
	return cpy(['riff-raff.yaml'], target, { cwd: dirname });
};

Promise.all([
	...copyApp('rendering'),
	...copyApp('render-front'),
	...copyFrontendStatic(),
	copyRiffRaff(),
]).catch((err) => {
	warn(err.stack);
	process.exit(1);
});
