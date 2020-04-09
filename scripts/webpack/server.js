const { siteName } = require('../frontend/config');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = () => ({
    entry: {
        [`${siteName}.server`]: './src/app/server.ts',
    },
    output: {
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        libraryTarget: 'commonjs2',
        pathinfo: true,
    },
    target: 'node',
    plugins: [
        new LoadablePlugin({
            filename: 'loadable-stats.server.json',
        }),
    ],
    optimization: {
        minimize: false,
        namedModules: true,
        runtimeChunk: false,
    },
    externals: [
        require('webpack-node-externals')({
            whitelist: [/^@guardian/],
        }),
        (context, request, callback) => {
            return request.endsWith('manifest.json')
                ? callback(null, `commonjs ${request}`)
                : callback();
        },
        (context, request, callback) => {
            return request.endsWith('manifest.legacy.json')
                ? callback(null, `commonjs ${request}`)
                : callback();
        },
    ],

    module: {
        rules: [
            {
                test: /(\.tsx)|(\.js)|(\.ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript',
                                // TODO: remove @babel/preset-react once we stop using JSX in server folder
                                '@babel/preset-react',
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: 'current',
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            // TODO: find a way to remove
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
        ],
    },
});
