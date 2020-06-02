// ----- Imports ----- //

const { fork } = require('child_process');
const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');

// ----- Plugins ----- //

class LaunchServerPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tap('LaunchServerPlugin', () => {
            console.log('Server starting...');
            this.server = fork('./dist/server.js');
            this.server.on('close', () => console.log('Server stopping...'));
        });

        compiler.hooks.watchRun.tap('LaunchServerPlugin', () => {
            if (this.server) {
                this.server.kill();
            }
        });
    }
}

// ----- Shared Config ----- //

function resolve(loggerName) {
    return {
        extensions: ['.ts', '.tsx', '.js'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
        alias: {
            logger: path.resolve(__dirname, `src/logger/${loggerName}`)
        },
    }
};

// ----- Configs ----- //

const serverConfig = env => {
    const isProd = env && env.production;
    const isWatch = env && env.watch;
    // Does not try to require the 'canvas' package,
    // an optional dependency of jsdom that we aren't using.
    const plugins = [ new webpack.IgnorePlugin(/^canvas$/) ];
    if (isWatch) {
        plugins.push(new LaunchServerPlugin());
    }

    const mode = isProd ? "production" : "development";

    return {
        name: 'server',
        mode,
        entry: 'server/server.ts',
        target: 'node',
        node: {
            __dirname: false,
        },
        output: {
            filename: isProd ? 'server/server.js': 'server.js',
        },
        watch: env && env.watch,
        watchOptions: {
            ignored: /node_modules/,
        },
        resolve: resolve("server"),
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-react',
                                    '@emotion/babel-preset-css-prop',
                                ],
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: { configFile: 'config/tsconfig.server.json' }
                        }
                    ],
                }
            ]
        },
    }
}

const clientConfig = {
    name: 'client',
    mode: 'development',
    entry: {
        article: 'client/article.ts',
        liveblog: 'client/liveblog.ts',
        media: 'client/media.ts',
    },
    target: 'web',
    devtool: 'inline-cheap-source-map',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].js',
    },
    plugins: [
        new ManifestPlugin({ writeToFileEmit: true }),
    ],
    resolve: resolve("clientDev"),
    devServer: {
        publicPath: '/assets/',
        proxy: {
            '**': 'http://localhost:3040',
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                '@emotion/babel-preset-css-prop',
                                [
                                    '@babel/preset-env',
                                    { useBuiltIns: 'usage', modules: false, "targets": { "esmodules": true } }
                                ],
                            ],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: { configFile: 'config/tsconfig.client.json' }
                    },
                ],
            },
        ]
    }
};

const clientConfigProduction = {
    ...clientConfig,
    name: 'clientProduction',
    mode: 'production',
    devtool: false,
    plugins: [
        new ManifestPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].[contenthash].js',
    },
    resolve: resolve("clientProd")
}

// ----- Exports ----- //

module.exports = [ serverConfig, clientConfig, clientConfigProduction ];
