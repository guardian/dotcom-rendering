// @flow
const chalk = require('chalk');

module.exports = {
    log: message =>
        console.log(
            `${chalk.white('𝐆𝐔𝐔𝐈')} ${chalk.dim(
                message.replace(/^([a-z])/, match => match.toUpperCase()),
            )}`,
        ),
    warn: message =>
        console.log(
            `${chalk.white('𝐆𝐔𝐔𝐈')} ${chalk.red.dim(
                message.replace(/^([a-z])/, match => match.toUpperCase()),
            )}`,
        ),
};
