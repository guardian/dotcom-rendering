module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
        'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions:  {
        ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
        sourceType:  'module',  // Allows for the use of imports
        ecmaFeatures:  {
            jsx:  true,  // Allows for the parsing of JSX
        },
    },
    rules:  {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        'max-len': [
            "error",
            { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true },
        ],
        '@typescript-eslint/explicit-function-return-type': 2,
        'eqeqeq': 2,
        'prefer-const': 2,
    },
    settings:  {
        react:  {
            version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
  