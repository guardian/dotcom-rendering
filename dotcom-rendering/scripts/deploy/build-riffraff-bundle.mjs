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
		path.resolve(dirname, '../../src/static/**'),
		path.resolve(target, 'frontend-static', 'static', 'frontend'),
		{
			nodir: true,
		},
	);
};

const copyDist = () => {
	log(' - copying dist');
	const source = path.resolve(dirname, '../../dist');
	const dest = path.resolve(target, 'frontend-static', 'assets');
	return Promise.all([
		cpy(path.resolve(source, '**/*.!(html|json)'), dest, {
			nodir: true,
		}),
		cpy(path.resolve(source, 'stats'), path.resolve(dest, 'stats'), {
			nodir: true,
		}),
	]);
};

const copyScripts = () => {
	log(' - copying scripts');
	return cpy(
		path.resolve(dirname, '../../scripts/**'),
		path.resolve(target, 'rendering', 'scripts'),
		{
			nodir: true,
		},
	);
};

const copyDistServer = () => {
	log(' - copying server dist');
	return cpy(
		path.resolve(dirname, '../../dist/**'),
		path.resolve(target, 'rendering', 'dist'),
		{
			nodir: true,
		},
	);
};

const copyMakefile = () => {
	log(' - copying makefile');
	return cpy(['makefile'], path.resolve(target, 'rendering'));
};

const copyRiffRaff = () => {
	log(' - copying riffraff yaml');
	return cpy(['riff-raff.yaml'], target, { cwd: dirname });
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
	.catch((err) => {
		warn(err.stack);
		process.exit(1);
	});
