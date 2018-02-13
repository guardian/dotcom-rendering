var env = process.env.BABEL_ENV || 'cli';

const targets = {
    'app:server': {
        plugins: ['babel-plugin-dynamic-import-node'],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: true,
                    },
                    useBuiltIns: 'usage',
                    modules: false,
                },
            ],
        ],
    },
    'app:browser': {
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
                '@babel/plugin-transform-runtime',
                {
                    polyfill: false,
                },
            ],
            [
                // this does (virtually) nothing if process.env.NODE_ENV === 'production'
                'react-hot-loader/babel',
                {
                    ignore: 'node_modules',
                },
            ],
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        browsers: [
                            'Chrome >= 49',
                            'Edge >= 14',
                            'Firefox >= 45',
                            'iOS >= 7',
                            'Safari >= 8',
                            '> 1%',
                        ],
                    },
                    useBuiltIns: false,
                    modules: false,
                    forceAllTransforms: true, // we're going to uglify
                },
            ],
        ],
    },
    // for things like webpack.config.babel.js
    cli: {
        plugins: [
            'babel-plugin-dynamic-import-node',
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                    useBuiltIns: 'usage',
                },
            ],
        ],
    },
};

module.exports = {
    plugins: [
        'babel-plugin-preval',
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-react-require',
        'babel-plugin-inline-react-svg',
        ...(targets[env].plugins || []),
    ],
    presets: [
        '@babel/preset-flow',
        '@babel/preset-react',
        ...(targets[env].presets || []),
    ],
};
