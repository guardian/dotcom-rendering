// ----- Imports ----- //

const { fork } = require('child_process');
const webpack = require('webpack');
const path = require('path');
const glob = require("glob");


// ----- Functions ----- //

const testEntryPoints = (entries, current) => ({
    ...entries, [current.split('/').pop().split('.test.ts')[0]]: current
})

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

const nodeConfig = {
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
                        options: { configFile: 'config/tsconfig.server.json' }
                    }
                ],
            },
        ]
    },
};


// ----- Configs ----- //

const serverConfig = env => ({
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
    ...nodeConfig,
    plugins: (env && env.watch) ? [ ...nodeConfig.plugins, new LaunchServerPlugin() ] : nodeConfig.plugins,
});

const clientConfig = {
    name: 'client',
    mode: 'development',
    entry: 'client/client.ts',
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

const testConfig = {
    name: 'tests',
    mode: 'development',
    entry: glob.sync("./**/*test.ts*", { ignore: './node_modules/**' }).reduce(testEntryPoints, {}),
    output: {
        filename: '[name].test.js',
    },
    stats: 'errors-warnings',
    ...nodeConfig,
};

// ----- Exports ----- //

module.exports = [ serverConfig, clientConfig, testConfig ];
