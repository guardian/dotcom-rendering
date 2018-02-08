// @flow
/* eslint-disable global-require,no-console */
import path from 'path';
import webpackMerge from 'webpack-merge';

console.log(''); // just a spacer for console sweetness

export default (env: { prod?: boolean, dev?: boolean } = { prod: true }) => {
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
                            forceEnv: env.prod ? 'es' : 'cjs',
                        },
                    },
                },
            ],
        },
    };

    const envConfig = env.prod
        ? require('./webpack.config.prod').default({
              dist: baseConfig.output.path,
              bundleName: 'app.browser.js',
          })
        : require('./webpack.config.dev').default;

    const config = webpackMerge.smart(baseConfig, envConfig);

    return config;
};
