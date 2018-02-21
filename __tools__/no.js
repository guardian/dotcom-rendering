// @flow
const chalk = require('chalk');

console.log(
    `\n${chalk.bgRed.black(
        `run \`guui ${process.env.npm_lifecycle_event}\` instead`,
    )}\n`,
);
