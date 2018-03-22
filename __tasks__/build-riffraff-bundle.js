// @flow

const execa = require('execa');
const path = require('path');
const cpy = require('cpy');
const fs = require('fs');
const { warn, log } = require('./log');

// This task generates the riff-raff bundle. It creates the following
// directory layout under target/
//
// target/
// ├── riffraff.yaml
// ├── build.json
// ├── guui/
// │   └── dist/
// │       └── guui.zip
// ├── frontend-static/
//     ├── javascripts/
//     │   ├── ...js
//     │   └── manifest.json
//     └── stylesheets/
//         └── ...css

function copyCss(root = 'target') {
    return cpy(
        ['src/static/css/*'],
        path.resolve(root, 'frontend-static', 'stylesheets'),
    ).then(() => {
        log('Finished copying css');
    });
}

function copyJavascript(root = 'target') {
    return cpy(
        ['dist/*.js', 'dist/manifest.json'],
        path.resolve(root, 'frontend-static', 'javascripts'),
    ).then(() => {
        log('Finished copying javascript');
    });
}

function copyRiffRaff(root = 'target') {
    return cpy(['riff-raff.yaml'], root, {
        nodir: true,
    }).then(() => {
        log('Finished copying riffraff yaml');
    });
}

function zipBundle(root = 'target') {
    return execa('zip', ['-r', 'guui.zip', '*', '-x', 'node_modules/**\\*'], {
        shell: true,
    })
        .then(() => {
            cpy(['guui.zip'], path.resolve(root, 'guui', 'dist'));
        })
        .then(() => {
            log('Finished zipping bundle');
        });
}

function createBuildConfig(root = 'target') {
    const env = (p, dflt) => process.env[p] || dflt;

    const buildConfig = {
        projectName: env('PROJECT', 'dotcom:guui'),
        buildNumber: env('BUILD_NUMBER', '0'),
        startTime: env('BUILD_START_DATE', new Date().toISOString()),
        revision: env('BUILD_VCS_NUMBER', 'unknown'),
        vcsURL: 'git@github.com:guardian/guui.git',
        branch: env('BRANCH_NAME', 'unknown'),
    };

    return new Promise(resolve => {
        fs.writeFile(
            path.resolve(root, 'build.json'),
            JSON.stringify(buildConfig),
            err => {
                if (err) {
                    warn(err);
                }
            },
        );
        resolve();
    }).then(() => {
        log('Finished building build.json');
    });
}

(async () => {
    try {
        await copyCss()
            .then(copyJavascript)
            .then(copyRiffRaff)
            .then(zipBundle)
            .then(createBuildConfig)
            .then(() => log('Finished creating riff-raff bundle'));
    } catch (e) {
        warn('Failed to generate riffraff bundle');
        throw e;
    }
})();
