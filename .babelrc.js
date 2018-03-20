// @flow

const universalPlugins = [
    'babel-plugin-preval',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-inline-react-svg',
    [
        'babel-plugin-module-resolver',
        {
            root: ['./src'],
        },
    ],
];

const universalPresets = [
    '@babel/preset-flow',
    ['@babel/preset-react', { pragma: 'h' }],
];

const defaultConfig = {
    plugins: ['babel-plugin-dynamic-import-node', ...universalPlugins],
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
        ...universalPresets,
    ],
};

const appServerConfig = {
    plugins: ['babel-plugin-dynamic-import-node', ...universalPlugins],
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
        ...universalPresets,
    ],
};

const appBrowserConfig = {
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
            "emotion",
            {
                "sourceMap": process.env.NODE_ENV !== 'production',
            }
        ],
        ...universalPlugins
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
        ...universalPresets,
    ],
};

module.exports = {
    env: {
        'app:server': appServerConfig,
        'app:browser': appBrowserConfig,
        development: defaultConfig,
    },
};
