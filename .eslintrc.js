module.exports = {
    "parser": '@typescript-eslint/parser',
    "plugins": [
        "@typescript-eslint/tslint"
    ],
    parserOptions: {
        ecmaVersion: 6,
        project: "./tsconfig.json",
        sourceType: "module"
    },
    'rules': {
        "@typescript-eslint/tslint/config": [1, {
            "lintFile": "./tslint.json", // path to tslint.json of your project
        }],
    }
}
