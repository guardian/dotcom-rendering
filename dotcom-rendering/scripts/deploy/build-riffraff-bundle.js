const { promisify } = require('util');
const writeFile = promisify(require('fs').writeFile);
const cpy = require('cpy');
const execa = require('execa');
const rimraf = require('rimraf');
const path = require('path');
const { warn, log } = require('../env/log');

const target = path.resolve(__dirname, '../..', 'target');

// This task generates the riff-raff bundle. It creates the following
// directory layout under target/
//
// target
// ├── build.json
// ├── riff-raff.yaml
// ├── frontend-cfn
// │   ├── DotcomRendering-CODE.template.json
// │   ├── DotcomRendering-PROD.template.json
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
	return cpy(
		[
			'cdk.out/DotcomRendering-CODE.template.json',
			'cdk.out/DotcomRendering-PROD.template.json',
		],
		path.resolve(target, 'frontend-cfn'),
	);
};

const copyStatic = () => {
	log(' - copying static');
	return cpy(
		['**/*'],
		path.resolve(target, 'frontend-static', 'static', 'frontend'),
		{
			cwd: path.resolve(__dirname, '../../src/static'),
			parents: true,
			nodir: true,
		},
	);
};

const copyDist = () => {
	log(' - copying dist');
	return cpy(
		['**/*.!(html|json)', 'stats/*'],
		path.resolve(target, 'frontend-static', 'assets'),
		{
			cwd: path.resolve(__dirname, '../../dist'),
			parents: true,
			nodir: true,
		},
	);
};

const copyScripts = () => {
	log(' - copying scripts');
	return cpy(['**/*'], path.resolve(target, 'rendering', 'scripts'), {
		cwd: path.resolve(__dirname, '../../scripts'),
		parents: true,
		nodir: true,
	});
};

const copyDistServer = () => {
	log(' - copying server dist');
	return cpy(['**/*'], path.resolve(target, 'rendering', 'dist'), {
		cwd: path.resolve(__dirname, '../../dist'),
		parents: true,
		nodir: true,
	});
};

const copyMakefile = () => {
	log(' - copying makefile');
	return cpy(['makefile'], path.resolve(target, 'rendering'));
};

const copyRiffRaff = () => {
	log(' - copying riffraff yaml');
	return cpy(['riff-raff.yaml'], target, { cwd: __dirname });
};

const zipBundle = () => {
	log(' - zipping bundle');
	return execa('zip', ['--move', '--recurse-paths', 'rendering.zip', '.'], {
		cwd: path.resolve(target, 'rendering'),
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
		path.resolve(target, 'build.json'),
		JSON.stringify(buildConfig, null, 2),
	);
};

Promise.all([
	copyCfn(),
	copyMakefile(),
	copyStatic(),
	copyDist(),
	copyDistServer(),
	copyScripts(),
	copyRiffRaff(),
])
	.then(zipBundle)
	.then(createBuildConfig)
	.catch((err) => {
		warn(err.stack);
		process.exit(1);
	});
