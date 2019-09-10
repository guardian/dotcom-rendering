module.exports = {
    plugins: [
        'babel-plugin-preval',
        'babel-plugin-dynamic-import-node',
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        '@babel/plugin-proposal-class-properties',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@root': '.',
                    '@frontend': './packages/frontend',
                },
            },
        ],
        'babel-plugin-px-to-rem',
    ],

    env: {
        production: {
            plugins: [['emotion', { sourceMap: false }]],
        },
        development: {
            plugins: [['emotion', { sourceMap: true, autoLabel: true }]],
        },
    },
    ignore: ['**/*.json'],
    sourceType: 'unambiguous',
};
