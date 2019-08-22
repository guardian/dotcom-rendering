module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint/tslint', 'dcr'],
    parserOptions: {
        ecmaVersion: 6,
        project: './tsconfig.json',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/tslint/config': [
            'error',
            {
                lintFile: './tslint.json', // path to tslint.json of your project
            },
        ],
        'dcr/only-import-below': 1        
    },
};
