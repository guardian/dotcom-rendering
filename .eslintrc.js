module.exports = {
    env: {
        browser: true,
        node: true,
    },
    parser: 'typescript-eslint-parser',
    extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:jsx-a11y/strict'],
    plugins: ['react', 'prettier', 'jsx-a11y', 'typescript'],
    rules: {
        'no-underscore-dangle': 'off',
        'prettier/prettier': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.tsx'],
            },
        ],
        'react/default-props-match-prop-types': 'off',
        'react/require-default-props': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'react/sort-comp': 'off', // This flags type declarations in typescript which I think isn't what we want. But the rule would be useful.
    },
    overrides: [
        {
            files: ['webpack/*', 'config.js', 'lib/*'],
            rules: {
                'global-require': 'off',
                'import/no-dynamic-require': 'off',
                'import/no-extraneous-dependencies': 'off',
                'no-console': 'off',
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: 'typescript-eslint-parser',
            rules: {
                'no-undef': 'off',
                'no-unused-vars': 'off',
                'no-multi-string': 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: true,
            'eslint-import-resolver-typescript': true,
        },
    },
};
