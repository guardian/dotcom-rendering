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
    extends: [
        'airbnb',
        'plugin:flowtype/recommended',
        'prettier',
        'prettier/flowtype',
        'prettier/react',
    ],
    plugins: ['flowtype', 'react', 'prettier'],
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
    },
    overrides: [
        {
            files: ['packages/**/*.js', 'sites/**/*.js', 'src/**/*.js'],
            plugins: ['flow-header'],
            rules: {
                'flow-header/flow-header': 'error',
            },
        },
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
