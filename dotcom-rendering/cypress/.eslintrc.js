module.exports = {
	root: true, // Don't look at the parent eslint config
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		project: '',
	},
	plugins: ['cypress', 'mocha'],
	env: {
		'cypress/globals': true,
	},
	extends: ['plugin:cypress/recommended', 'plugin:mocha/recommended'],
	rules: {
		'mocha/no-skipped-tests': 'error',
		'mocha/no-exclusive-tests': 'error',
		'mocha/no-hooks-for-single-case': 0, // Turn this off as it's better to have consistency
	},
};
