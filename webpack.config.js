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


// ----- Configs ----- //

const serverConfig = env => ({
    name: 'server',
    mode: 'development',
    entry: 'server.ts',
    target: 'node',
    node: {
        __dirname: false,
    },
    output: {
        filename: 'server.js',
    },
    resolve,
    watch: env && env.watch,
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        // Reloads the server on change.
        (env && env.watch) ? new LaunchServerPlugin() : null,
        // Does not try to require the 'canvas' package,
        // an optional dependency of jsdom that we aren't using.
        new webpack.IgnorePlugin(/^canvas$/),
    ].filter(p => p !== null),
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
            },
        ]
    }
});

const clientConfig = {
    name: 'client',
    mode: 'development',
    entry: 'client.ts',
    target: 'web',
    output: {
        filename: 'client.js',
    },
    resolve,
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
                                    { useBuiltIns: 'usage', modules: false }
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

module.exports = [ serverConfig, clientConfig ];
