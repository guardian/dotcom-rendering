// @flow
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');

const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages: [
            `DEV server running at ${chalk.blue.underline(
                'http://localhost:3000',
            )}`,
        ],
    },
});

module.exports = ({ pages }) => ({
    browser: {
        devtool: 'cheap-module-eval-source-map',
        entry: pages.reduce((acc, page) => {
            acc[page] = ['webpack-hot-middleware/client'];

            return acc;
        }, {}),
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
});
