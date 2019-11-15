module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
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
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/prop-types': [0],
        'react/jsx-boolean-value': [2, 'always'],
        'import/prefer-default-export': false,
        '@typescript-eslint/explicit-function-return-type': 0,
    },
    settings: {
        'import/resolver': {
            'babel-module': { extensions: ['.ts', '.tsx', '.js'] },
        },
    },
};
