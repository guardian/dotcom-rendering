// @flow
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const { pages, injectPage } = require('./helpers');

const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages: [
            `DEV server running at ${chalk.blue.underline(
                'http://localhost:3000',
            )}`,
        ],
    },
});

module.exports = {
    browser: {
        devtool: 'cheap-module-eval-source-map',
        entry: pages.reduce(
            (entries, page) => ({
                [page]: ['webpack-hot-middleware/client', injectPage(page)],
                ...entries,
            }),
            {},
        ),
        output: {
            pathinfo: true,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            friendlyErrorsWebpackPlugin,
        ],
    },
    server: {
        devtool: 'cheap-module-eval-source-map',
        plugins: [friendlyErrorsWebpackPlugin],
    },
};
