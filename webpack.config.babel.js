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

const resolveConfig = {
    extensions: ['.js', '.jsx'],
};

module.exports = {
    entry: {
        app: './app/index.browser.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: moduleConfig,
    resolve: resolveConfig,
    devServer: {
        publicPath: '/assets/javascript/',
        port: 3000,
        overlay: true,
        noInfo: true,
        before(app) {
            app.get('/', (req, res) => {
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
