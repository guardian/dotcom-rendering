module.exports = {
    env: {
        browser: true,
        node: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:jsx-a11y/strict'],
    plugins: ['react', 'prettier', 'jsx-a11y'],
    rules: {
        'no-underscore-dangle': 'off',
        'prettier/prettier': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js'],
            },
        ],
        'react/default-props-match-prop-types': 'off',
        'react/require-default-props': 'off',
        'import/prefer-default-export': 'off',
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
    ],
};
