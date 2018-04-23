// @flow
/* eslint-disable no-underscore-dangle */

const filesizegzip = require('filesizegzip');
const columnify = require('columnify');
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');

module.exports = class BundleSizePlugin {
    constructor({ configCount = 1 }) {
        this.configCount = configCount;
        this.configsBuilt = 0;
        this.messages = {};
    }
    apply(compiler) {
        compiler.hooks.done.tap('BundleSizePlugin', ({ compilation }) => {
            this.configsBuilt = this.configsBuilt + 1;

            const platform = compilation.compiler.name;

            Object.entries(compilation.assets)
                .filter(([key]) => key.endsWith('js'))
                .forEach(([file, { children }]) => {
                    this.messages[chalk.dim('│ ') + file] =
                        platform === 'server'
                            ? chalk.dim(
                                  prettyBytes(children[0]._value.length) +
                                      ' '.repeat(7),
                              )
                            : filesizegzip(children[0]._value, true);
                });

            if (this.configCount === this.configsBuilt) {
                console.log(
                    `\n${columnify(this.messages, {
                        showHeaders: false,
                        config: { value: { align: 'right' } },
                    })}\n`,
                );
            }
        });
    }
};
