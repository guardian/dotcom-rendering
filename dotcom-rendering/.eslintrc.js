const transitionRules = require('./eslint-guardian');

/** TODO: Review these */
const rulesToReview = {
	'import/no-extraneous-dependencies': 'warn', // 683 problems
	'consistent-return': 'warn', // 51 problems
	'default-case': 'warn', // 50 problems
	'react/no-danger': 'warn', // 48 problems
	'no-underscore-dangle': 'warn', // 45 problems
	'react/no-array-index-key': 'warn', // 34 problems
	'react/button-has-type': 'warn', // 23 problems
	'@typescript-eslint/require-await': 'warn', // 22 problems
	'react/jsx-curly-newline': 'warn', // 8 problems
	'no-case-declarations': 'warn', // 7 problems
	'no-useless-escape': 'warn', // 6 problems
};

const rulesToRemove = {
	'@typescript-eslint/explicit-module-boundary-types': 'off',
	'@typescript-eslint/no-unsafe-call': 'off',
	'@typescript-eslint/no-unsafe-assignment': 'off',
	'@typescript-eslint/no-unsafe-return': 'off',
	'@typescript-eslint/ban-ts-comment': 'off',
	'@typescript-eslint/restrict-template-expressions': 'off',
	'no-console': 'off',
	'no-shadow': 'off',

	'@typescript-eslint/explicit-function-return-type': 'off',
	'@typescript-eslint/no-inferrable-types': 'off',
};

module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'@guardian/eslint-config-typescript',
		'airbnb-typescript',
		'prettier',
		'plugin:@guardian/source-react-components/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'@typescript-eslint/tslint',
		'react',
		'react-hooks',
		'dcr',
		'import',
		'jsx-a11y',
	],
	rules: {
		'dcr/only-import-below': [
			'warn',
			{
				allowedImports: [
					'react',
					'@emotion/react',
					'jsdom',
					'curlyquotes',
					'react-dom',
					'./src/lib',
					'./src/amp/lib',
					'./src/amp/types',
					'./src/static/icons',
					'./src/model',
					'./src/web',
					'@testing-library',
					'@guardian/frontend/static/',
				],
			},
		],

		// React & Hooks
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/prop-types': [0],
		'react/jsx-boolean-value': [2, 'always'],
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',

		// Fixed as part of @guardian-eslint move May 2022
		'array-callback-return': 'error',
		'global-require': 'error',
		'no-empty-pattern': 'error',
		'no-param-reassign': 'error',
		'react/jsx-no-target-blank': 'error',
		'react/jsx-one-expression-per-line': 'off',

		...rulesToReview,
		...rulesToRemove,
		...transitionRules,
	},
	settings: {
		'import/resolver': {
			'babel-module': { extensions: ['.ts', '.tsx', '.js'] },
		},
	},
	overrides: [
		{
			files: ['**/**.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-misused-promises': 'off',
			},
		},
		{
			files: ['**/**.stories.tsx'],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
};
