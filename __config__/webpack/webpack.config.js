// @flow
/* eslint-disable global-require,no-console,import/no-dynamic-require */
const path = require('path');
const webpack = require('webpack');
// https://github.com/survivejs/webpack-merge#smart-merging
const { smart: merge } = require('webpack-merge');

const dist = path.resolve(__dirname, '../../dist');

const config = ({ platform, pages }) => {
    const entry =
        platform === 'server'
            ? {
                  app: [
                      'preact-emotion', // force preact-emotion into the vendor chunk
                      `./src/${platform}.js`,
                  ],
              }
            : pages.reduce((acc, page) => {
                  acc[page] = [`./src/pages/${page}.js`];

                  return acc;
              }, {});

    return {
        name: platform,
        entry,
        output: {
            path: dist,
            filename: `[name].${platform}.js`,
            chunkFilename: `[name].${platform}.js`,
            publicPath: '/assets/javascript/',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }),
            new webpack.ProvidePlugin({
                h: ['preact', 'h'],
            }),
        ],
        stats: 'errors-only',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: { envName: `app:${platform}` },
                    },
                },
            ],
        },
        resolve: {
            alias: {
                // for libs that expect React
                react: 'preact',
            },
        },
    };
};

const pages = ['Article', 'Article.immersive'];
const envConfig = require(`./webpack.config.${process.env.NODE_ENV}`)({
    dist,
    pages,
});

module.exports = [
    merge(
        config({
            platform: 'browser',
            pages,
        }),
        envConfig.browser,
    ),
    merge(
        config({ platform: 'server' }),
        {
            target: 'node',
            externals: [require('webpack-node-externals')()],
            output: {
                libraryTarget: 'commonjs2',
            },
        },
        envConfig.server,
    ),
];
