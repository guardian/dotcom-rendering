const serverConfig = {
    name: 'server',
    mode: 'development',
    entry: './server.ts',
    target: 'node',
    output: {
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
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
};

const clientConfig = {
    name: 'client',
    mode: 'development',
    entry: './client.ts',
    target: 'web',
    output: {
        filename: 'client.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
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
