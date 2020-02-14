// ----- Imports ----- //

const { fork } = require('child_process');
const webpack = require('webpack');
const path = require('path');

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

const resolve = {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
        path.resolve(__dirname, 'src'),
        'node_modules',
    ],
};

const nodeConfig = test => ({
    target: 'node',
    resolve,
    // Does not try to require the 'canvas' package,
    // an optional dependency of jsdom that we aren't using.
    plugins: [ new webpack.IgnorePlugin(/^canvas$/) ],
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
                        options: { configFile: test ? 'config/tsconfig.test.json' : 'config/tsconfig.server.json' }
                    }
                ],
            },
        ]
    },
});


// ----- Configs ----- //

const serverConfig = env => {
    const isTest = env && env.test;
    const config = nodeConfig(isTest);
    return {
        name: 'server',
        mode: 'development',
        entry: 'server/server.ts',
        node: {
            __dirname: false,
        },
        output: {
            filename: 'server.js',
        },
        watch: env && env.watch,
        watchOptions: {
            ignored: /node_modules/,
        },
        ...config,
        plugins: (env && env.watch) ? [ ...config.plugins, new LaunchServerPlugin() ] : config.plugins,
    }
}

const clientConfig = {
    name: 'client',
    mode: 'development',
    entry: {
        article: 'client/article.ts',
        liveblog: 'client/liveblog.ts',
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].js',
    },
    resolve,
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

// ----- Exports ----- //

module.exports = [ serverConfig, clientConfig];
