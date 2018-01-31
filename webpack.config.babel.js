// @flow
const path = require('path');

const moduleConfig = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    forceEnv: 'production',
                },
            },
        },
    ],
};

const stats = {
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
    version: false,

    // show these...
    colors: true,
    errors: true,
    errorDetails: true,
    timings: true,
    warnings: true,
};

module.exports = {
    entry: {
        app: './app/index.browser.js',
        'app.server': './app/index.server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: moduleConfig,
    devServer: {
        publicPath: '/assets/javascript/',
        port: 3000,
        overlay: true,
        // noInfo: true,
        stats,
        before(app) {
            app.get('/', (req, res) => {
                // make sure each reload is a fresh rendering
                Object.keys(require.cache).forEach(
                    key => delete require.cache[key],
                );

                // eslint-disable-next-line global-require
                const { html, css } = require('./app/index.server');

                // eslint-disable-next-line global-require
                const document = require('./app/document/html').default;

                res.send(document({ html, css }));
            });
        },
    },
};
