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

module.exports = {
    browser: {
        devtool: 'cheap-module-eval-source-map',
        entry: {
            app: ['webpack-hot-middleware/client', './src/browser'],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            friendlyErrorsWebpackPlugin,
        ],
    },
    server: {
        plugins: [friendlyErrorsWebpackPlugin],
    },
};
