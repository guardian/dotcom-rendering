module.exports =  {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parserOptions: {
        // Allows for the parsing of modern ECMAScript features
        ecmaVersion: 2018,
        // Allows for the use of imports
        sourceType: 'module',
        ecmaFeatures: {
            // Allows for the parsing of JSX
            jsx:  true,
        },
    },
    rules: {
        // Triple-equals equality in JS
        'eqeqeq': 'error',
        // Avoid let when variable is never re-assigned
        'prefer-const': 'error',
        'max-len': [
            'error',
            {
                code: 100,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreUrls: true,
            },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
    },
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of React to use
            version: 'detect',
        },
    },
};
