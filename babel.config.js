module.exports = {
    plugins: [
        '@babel/plugin-transform-react-jsx',
        'babel-plugin-preval',
        'babel-plugin-dynamic-import-node',
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
        '@babel/plugin-transform-runtime',
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
    },
    ignore: ['**/*.json'],
    sourceType: 'unambiguous',
};
