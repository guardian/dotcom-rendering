module.exports = {
    plugins: [
        'babel-plugin-px-to-rem',
        '@loadable/babel-plugin',
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
