const filesizegzip = require('filesizegzip');
const columnify = require('columnify');
const chalk = require('chalk');
const prettyBytes = require('pretty-bytes');

module.exports = class BundleSizePlugin {
    constructor() {
        this.remaining = 0;
        this.complete = 0;
        this.bundles = {};
    }

    apply(compiler) {
        this.remaining = this.remaining + 1;

        compiler.hooks.done.tap('BundleSizePlugin', ({ compilation }) => {
            this.complete = this.complete + 1;

            const platform = compilation.compiler.name;

            Object.entries(compilation.assets)
                .filter(([key]) => key.endsWith('js'))
                .forEach(([file, { children }]) => {
                    this.bundles[file] =
                        platform === 'server'
                            ? chalk.dim(
                                  prettyBytes(children[0]._value.length) +
                                      ' '.repeat(7),
                              )
                            : filesizegzip(children[0]._value, true);
                });

            if (this.remaining === this.complete) {
                const bundles = Object.keys(this.bundles)
                    .sort()
                    .reduce(
                        (columns, bundle) => ({
                            ...columns,
                            [chalk.dim('│ ') + bundle]: this.bundles[bundle],
                        }),
                        {},
                    );
                // tslint:disable-next-line:no-console
                console.log(
                    `\n${columnify(bundles, {
                        showHeaders: false,
                        config: {
                            value: {
                                align: 'right',
                            },
                        },
                    })}\n`,
                );
            }
        });
    }
};
