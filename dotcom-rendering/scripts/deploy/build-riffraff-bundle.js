import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import cpy from 'cpy';
import execa from 'execa';
import { log, warn } from '../env/log';

const target = resolve(__dirname, '../..', 'target');

// This task generates the riff-raff bundle. It creates the following
// directory layout under target/
//
// target
// ├── build.json
// ├── riff-raff.yaml
// ├── frontend-cfn
// |   └── cloudformation.yml
// ├── frontend-static
// │   ├── assets
// │   │   └── **
// │   │       └── *
// │   └── static
// │       ├── frontend
// │       │   └── **
// │       │       └── *
// │       └── etc
// └── rendering
//     └── dist
//         └── rendering.zip

const copyCfn = () => {
	log(' - copying cloudformation config');
	return cpy([`cloudformation.yml`], resolve(target, 'frontend-cfn'));
};

const copyStatic = () => {
	log(' - copying static');
	return cpy(
		['**/*'],
		resolve(target, 'frontend-static', 'static', 'frontend'),
		{
			cwd: resolve(__dirname, '../..', 'src/static'),
			parents: true,
			nodir: true,
		},
	);
};

const copyDist = () => {
	log(' - copying dist');
	return cpy(
		['**/*.!(html|json)'],
		resolve(target, 'frontend-static', 'assets'),
		{
			cwd: resolve(__dirname, '../../dist'),
			parents: true,
			nodir: true,
		},
	);
};

const copyRiffRaff = () => {
	log(' - copying riffraff yaml');
	return cpy(['riff-raff.yaml'], target, { cwd: __dirname });
};

const zipBundle = () => {
	log(' - zipping bundle');
	return execa(
		'zip',
		['--recurse-paths', 'rendering.zip', '../', '--exclude', '.git/**\\*'],
		{
			shell: true,
			maxBuffer: 200000000, // increase if you get a maxBuffer exceeded error
		},
	).then(() => {
		return cpy(['rendering.zip'], resolve(target, 'rendering', 'dist'));
	});
};

const createBuildConfig = () => {
	log(' - creating build.json');
	const buildConfig = {
		projectName: process.env.PROJECT || 'dotcom:rendering',
		buildNumber: process.env.BUILD_NUMBER || '0',
		startTime: process.env.BUILD_START_DATE || new Date().toISOString(),
		revision: process.env.BUILD_VCS_NUMBER || 'unknown',
		vcsURL: 'git@github.com:guardian/dotcom-rendering.git',
		branch: process.env.BRANCH_NAME || 'unknown',
	};

	return writeFile(
		resolve(target, 'build.json'),
		JSON.stringify(buildConfig, null, 2),
	);
};

Promise.all([copyCfn(), copyStatic(), copyDist(), copyRiffRaff()])
	.then(zipBundle)
	.then(createBuildConfig)
	.catch((err) => {
		warn(err.stack);
		process.exit(1);
	});
