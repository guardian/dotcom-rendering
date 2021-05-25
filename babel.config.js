module.exports = {
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-react-jsx',
        'babel-plugin-preval',
        [
            '@babel/plugin-proposal-object-rest-spread',
            {
                useBuiltIns: true,
            },
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
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
        '@loadable/babel-plugin',
        ["prismjs", {
            // This list should match those defined in typescript type Language
            "languages": ["typescript", "javascript", "css", "markup", "scala", "elm"]
		}],
		'@emotion/babel-plugin'
    ],

    env: {
        production: {
            plugins: [
                [
                    '@emotion',
                    {
                        sourceMap: false,
                    },
                ],
            ],
        },
        development: {
            plugins: [
                [
                    '@emotion',
                    {
                        sourceMap: true,
                        autoLabel: 'dev-only',
                    },
                ],
            ],
        },
    },
    ignore: ['**/*.json'],
    sourceType: 'unambiguous',
};
