// @flow
/* eslint-disable global-require,no-console */
const path = require('path');
const webpackMerge = require('webpack-merge');

console.log(''); // just a spacer for console sweetness

module.exports = () => {
    const baseConfig = {
        entry: {
            app: './src/app/index.browser.js',
        },
        output: {
            filename: '[name].browser.js',
            path: path.join(__dirname, 'dist'),
        },
        stats: 'errors-only',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            envName: 'app:browser',
                        },
                    },
                },
            ],
        },
    };

    const envConfig =
        process.env.NODE_ENV === 'production'
            ? require('./webpack.config.prod')({
                  dist: baseConfig.output.path,
                  bundleName: 'app.browser.js',
              })
            : require('./webpack.config.dev');

    const config = webpackMerge.smart(baseConfig, envConfig);

    return config;
};
