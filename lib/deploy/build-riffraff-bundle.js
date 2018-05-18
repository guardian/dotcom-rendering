// @flow

const { promisify } = require('util');
const writeFile = promisify(require('fs').writeFile);

const execa = require('execa');
const path = require('path');
const cpy = require('cpy');
const { warn, log } = require('../log');
const { getSites, root, dist, target } = require('../../config');

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
// │           ├── dotcom
// │           │   └── **
// │           │       └── *
// │           └── etc
// └── guui
//     └── dist
//         └── guui.zip

const copyStatic = () =>
    getSites().then(sites =>
        Promise.all(
            sites.map(site =>
                cpy(
                    ['**/*'],
                    path.resolve(
                        target,
                        'frontend-static',
                        'guui',
                        'static',
                        site,
                    ),
                    {
                        cwd: path.resolve(root, 'sites', site, 'static'),
                        parents: true,
                        nodir: true,
                    },
                ).then(() => {
                    log('Finished copying css');
                }),
            ),
        ),
    );

const copyDist = () =>
    cpy(
        ['**/*.js'],
        path.resolve(target, 'frontend-static', 'guui', 'assets', 'javascript'),
        {
            cwd: path.resolve(dist),
            parents: true,
            nodir: true,
        },
    ).then(() => {
        log('Finished copying javascript');
    });

const copyRiffRaff = () =>
    cpy(['riff-raff.yaml'], target, { cwd: __dirname }).then(() => {
        log('Finished copying riffraff yaml');
    });

const zipBundle = () =>
    execa('zip', ['-r', 'guui.zip', '*', '-x', 'node_modules/**\\*'], {
        shell: true,
    })
        .then(() => {
            cpy(['guui.zip'], path.resolve(target, 'guui', 'dist'));
        })
        .then(() => {
            log('Finished zipping bundle');
        });

const createBuildConfig = () => {
    const buildConfig = {
        projectName: process.env.PROJECT || 'dotcom:guui',
        buildNumber: process.env.BUILD_NUMBER || '0',
        startTime: process.env.BUILD_START_DATE || new Date().toISOString(),
        revision: process.env.BUILD_VCS_NUMBER || 'unknown',
        vcsURL: 'git@github.com:guardian/guui.git',
        branch: process.env.BRANCH_NAME || 'unknown',
    };

    return writeFile(
        path.resolve(target, 'build.json'),
        JSON.stringify(buildConfig, null, 2),
    ).then(() => {
        log('Finished building build.json');
    });
};

Promise.all([copyStatic(), copyDist(), copyRiffRaff()])
    .then(zipBundle)
    .then(createBuildConfig)
    .then(() => log('Finished creating riff-raff bundle'))
    .catch(err => {
        warn(err.stack);
        process.exit(1);
    });
