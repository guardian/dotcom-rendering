const filenameStr = require('fs')
    .readdirSync('dist')
    .filter((fileName) => fileName.endsWith('js'))
    .reduce((prevString, filename) => `./dist/${filename} ${prevString}`, '');

require('child_process').exec(
    `yarn create-polyfill-service-url analyse --file ${filenameStr}`,
    (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            return;
        }

        if (stderr) {
            console.error(stderr);
            return;
        }

        if (stdout) console.log(stdout);
    },
);
