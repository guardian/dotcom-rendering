// ----- Imports ----- //

const { fork } = require('child_process');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


// ----- Functions ----- //

const testEntryPoints = (entries, { name, path }) =>
    name.includes('.test') ? { ...entries, [name]: path } : entries;

const listFiles = (dir) =>
    fs.readdirSync(dir).reduce((list, file) => {

        const fullPath = path.join(dir, file);
        const isDirectory = fs.statSync(fullPath).isDirectory();
        const files = isDirectory
            ? listFiles(fullPath)
            : [{ name: path.parse(file).name, path: `./${fullPath}` }];

        return [ ...list, ...files ];

    }, []);


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
    entry: 'server.ts',
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

const testConfig = {
    name: 'tests',
    mode: 'development',
    entry: listFiles('./src').reduce(testEntryPoints, {}),
    output: {
        filename: '[name].js',
    },
    stats: 'errors-warnings',
    ...nodeConfig,
};


// ----- Exports ----- //

module.exports = [ serverConfig, clientConfig, testConfig ];
