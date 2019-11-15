module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 6,
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', '@typescript-eslint/tslint', 'dcr'],
    rules: {
        'dcr/only-import-below': [
            'warn',
            {
                allowedImports: [
                    'react',
                    'emotion',
                    'jsdom',
                    'curlyquotes',
                    'react-dom',
                    '@guardian/src-foundations',
                    '@frontend/lib/',
                    '@frontend/amp/lib/',
                    '@frontend/amp/types',
                    '@frontend/static/icons',
                    '@frontend/model',
                    '@frontend/web/',
                    '@testing-library',
                    '@guardian/frontend/static/',
                ],
            },
        ],

        '@typescript-eslint/tslint/config': [
            'error',
            {
                rules: {
                    'object-literal-sort-keys': false,
                    'ordered-imports': false,
                    'jsx-no-lambda': false,
                    'interface-name': false,
                    'import-name': false,
                    'variable-name': [
                        true,
                        'allow-pascal-case',
                        'allow-trailing-underscore',
                    ],
                    'no-default-export': true,
                    'react-no-dangerous-html': true,
                    prettier: true,
                    'interface-over-type-literal': false,
                    curly: true,
                    'prefer-array-literal': [
                        true,
                        { 'allow-type-parameters': true },
                    ],
                },
            },
        ],
    },
    settings: {
        'import/resolver': {
            'babel-module': { extensions: ['.ts', '.tsx', '.js'] },
        },
    },
};
