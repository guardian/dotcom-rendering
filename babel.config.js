module.exports = {
    plugins: [
        '@babel/plugin-transform-react-jsx',
        'babel-plugin-syntax-dynamic-import',
        'babel-plugin-preval',
        [
            '@babel/plugin-proposal-object-rest-spread',
            {
                useBuiltIns: true,
            },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@root': '.',
                    '@frontend': './src',
                },
            },
        ],
        'babel-plugin-px-to-rem',
        '@loadable/babel-plugin',
    ],

    env: {
        production: {
            plugins: [
                [
                    'emotion',
                    {
                        sourceMap: false,
                    },
                ],
            ],
        },
        development: {
            plugins: [
                [
                    'emotion',
                    {
                        sourceMap: true,
                        autoLabel: true,
                    },
                ],
            ],
        },
        test: {
            plugins: ['babel-plugin-dynamic-import-node'],
        },
    },
    ignore: ['**/*.json'],
    sourceType: 'unambiguous',
};
