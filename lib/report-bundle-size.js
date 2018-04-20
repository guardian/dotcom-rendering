// @flow
/* eslint-disable no-underscore-dangle */

const filesizegzip = require('filesizegzip');
const columnify = require('columnify');
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');

module.exports = class {
    constructor({ configCount = 1 }) {
        this.configCount = configCount;
        this.configsBuilt = 0;
        this.messages = {};
    }
    apply(compiler) {
        compiler.plugin('done', ({ compilation }) => {
            this.configsBuilt = this.configsBuilt + 1;

            const platform = compilation.compiler.name;

            this.messages[
                chalk.underline(
                    `${platform.replace(/^./, match =>
                        match.toUpperCase(),
                    )} bundles`,
                )
            ] =
                '';

            // Object.entries(compilation.assets)
            //     .filter(([key]) => key.endsWith('js'))
            //     .forEach(([file, { _value }]) => {
            //         this.messages[file] =
            //             platform === 'server'
            //                 ? chalk.dim(prettyBytes(_value.length))
            //                 : filesizegzip(_value, true);
            //     });
            Object.entries(compilation.assets)
                .filter(([key]) => key.endsWith('js'))
                .forEach(([file, { children }]) => {
                    this.messages[file] =
                        platform === 'server'
                            ? chalk.dim(prettyBytes(children[0]._value.length))
                            : filesizegzip(children[0]._value, true);
                });

            if (this.configCount === this.configsBuilt) {
                console.log(
                    `${columnify(this.messages, {
                        showHeaders: false,
                        config: { value: { align: 'right' } },
                    })}\n`,
                );
            } else {
                this.messages[''] = '';
            }
        });
    }
};
