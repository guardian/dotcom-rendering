const transitionRules = require('./eslint-guardian');

/** TODO: Review these */
const rulesToReview = {
	'consistent-return': 'warn', // 51 problems
	'react/no-danger': 'warn', // 48 problems
	'react/no-array-index-key': 'warn', // 34 problems
	'react/button-has-type': 'warn', // 23 problems
	'@typescript-eslint/require-await': 'warn', // 22 problems
	'react/jsx-curly-newline': 'warn', // 8 problems
	'no-case-declarations': 'warn', // 7 problems
};

const rulesToRemove = {
	'@typescript-eslint/no-unsafe-call': 'warn',
	'@typescript-eslint/no-unsafe-assignment': 'warn',
	'@typescript-eslint/no-unsafe-return': 'warn',
	'@typescript-eslint/ban-ts-comment': 'warn',
	'@typescript-eslint/restrict-template-expressions': 'warn',

	'no-console': 'warn',
	'no-shadow': 'warn',
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
		'import',
		'jsx-a11y',
		'jsx-expressions',
	],
	rules: {
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
		'no-useless-escape': 'error',
		'no-underscore-dangle': ['warn', { allow: ['_type'] }],
		'import/no-extraneous-dependencies': [
			'error',
			// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md#options
			{ packageDir: ['..', '.'] },
		],

		/** @see https://github.com/hpersson/eslint-plugin-jsx-expressions/blob/master/docs/rules/strict-logical-expressions.md */
		'jsx-expressions/strict-logical-expressions': 'error',

		// We use 'noFallthroughCasesInSwitch' in tsconfig.json as this respects types
		'no-fallthrough': 'off',

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
			files: ['**/**.ts'],
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': 'error',
			},
		},
		{
			files: ['**/**.tsx'],
			rules: {
				'@typescript-eslint/ban-types': [
					'warn',
					{
						types: {
							'JSX.Element': 'Prefer type inference',
							'EmotionJSX.Element': 'Prefer type inference',
						},
						extendDefaults: true,
					},
				],
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
