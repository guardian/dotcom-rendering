// @flow
/* eslint-disable global-require,no-console */
import path from 'path';
import webpackMerge from 'webpack-merge';

console.log(''); // just a spacer for console sweetness

export default (env: { prod?: boolean, dev?: boolean } = { prod: true }) => {
    const baseConfig = {
        entry: './src/app/index.browser.js',
        output: {
            filename: 'app.browser.js',
            path: path.join(__dirname, 'dist'),
        },
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
        stats: {
            assets: false,
            cached: false,
            cachedAssets: false,
            children: false,
            chunks: false,
            chunkModules: false,
            chunkOrigins: false,
            depth: false,
            entrypoints: false,
            exclude: [],
            hash: false,
            modules: false,
            moduleTrace: false,
            performance: false,
            providedExports: false,
            publicPath: false,
            reasons: false,
            source: false,
            timings: false,
            version: false,

            // show these...
            colors: true,
            errors: true,
            errorDetails: true,
            warnings: true,
        },
    };

    const envConfig = env.prod
        ? require('./webpack.config.prod').default({
              dist: baseConfig.output.path,
              bundleName: baseConfig.output.filename,
          })
        : require('./webpack.config.dev');

    const config = webpackMerge.smart(baseConfig, envConfig);

    return config;
};
