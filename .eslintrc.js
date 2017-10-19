// @flow
module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: '2017',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'airbnb',
        'prettier',
        'plugin:flowtype/recommended',
        'prettier/flowtype',
        'prettier/react',
    ],
    plugins: ['flow-header', 'flowtype', 'react', 'prettier'],
    rules: {
        // prettier settings
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'es5',
                singleQuote: true,
                bracketSpacing: true,
                tabWidth: 4,
                jsxBracketSameLine: true,
                parser: 'flow',
            },
        ],

        'flow-header/flow-header': 'error',

        // flow should take care of our return values
        'consistent-return': 'off',

        // react API stuff
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    env: {
        browser: true,
    },
};
