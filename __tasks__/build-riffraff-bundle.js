// @flow

const execa = require('execa');
const path = require('path');
const cpy = require('cpy');
const fs = require('fs');
const { promisify } = require('util');
const { warn, log } = require('./log');

const root = 'target';

// This task generates the riff-raff bundle. It creates the following
// directory layout under target/
//
// target
// ├── build.json
// ├── riff-raff.yaml
// ├── frontend-static
// │   └── guui
// │       ├── assets
// │       │   └── javascript
// │       │       └── ...js
// │       └── static
// │           └── css
// │               └── ...css
// └── guui
//     └── dist
//         └── guui.zip


const copyCss = () => cpy(
    ['src/static/css/*'],
    path.resolve(root, 'frontend-static', 'guui', 'static', 'css'),
).then(() => {
    log('Finished copying css');
});

const copyJavascript = () => cpy(
    ['dist/*.js'],
    path.resolve(root, 'frontend-static', 'guui', 'assets', 'javascript'),
).then(() => {
    log('Finished copying javascript');
});

const copyRiffRaff = () => cpy(
    ['riff-raff.yaml'],
    root,
).then(() => {
    log('Finished copying riffraff yaml');
});

const zipBundle = () => execa(
    'zip', ['-r', 'guui.zip', '*', '-x', 'node_modules/**\\*'], {
        shell: true,
    })
    .then(() => {
        cpy(['guui.zip'], path.resolve(root, 'guui', 'dist'));
    })
    .then(() => {
        log('Finished zipping bundle');
    });

const createBuildConfig = () => {
    const env = (p, dflt) => process.env[p] || dflt;

    const buildConfig = {
        projectName: env('PROJECT', 'dotcom:guui'),
        buildNumber: env('BUILD_NUMBER', '0'),
        startTime: env('BUILD_START_DATE', new Date().toISOString()),
        revision: env('BUILD_VCS_NUMBER', 'unknown'),
        vcsURL: 'git@github.com:guardian/guui.git',
        branch: env('BRANCH_NAME', 'unknown'),
    };

    const writeFile = promisify(fs.writeFile);

    return writeFile(
        path.resolve(root, 'build.json'),
        JSON.stringify(buildConfig),
    ).then(() => {
        log('Finished building build.json');
    });
};

(async () => {
    copyCss()
        .then(copyJavascript)
        .then(copyRiffRaff)
        .then(zipBundle)
        .then(createBuildConfig)
        .then(() => log('Finished creating riff-raff bundle'))
        .catch(err => {
            warn(err.stack);
            process.exit(1);
        });
})();
