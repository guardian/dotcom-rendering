const transitionRules = require('./eslint-guardian');

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
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/prop-types': [0],
		'react/jsx-boolean-value': [2, 'always'],
		'import/prefer-default-export': 'off',
		// TODO: remove
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'no-console': 'off',
		'no-shadow': 'off',

		'@typescript-eslint/explicit-function-return-type': [0],
		'@typescript-eslint/no-inferrable-types': [0],

		'no-param-reassign': 'error',

		// TODO, review these (1314 problems)
		'import/no-extraneous-dependencies': 'warn', // 683 problems
		'react/jsx-one-expression-per-line': 'warn', // 325 problems
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
		'no-empty-pattern': 'warn', // 4 problems
		'react/jsx-no-target-blank': 'warn', // 3 problems
		'array-callback-return': 'warn', // 2 problems
		'global-require': 'warn', // 2 problems
		/** These rules will be disabled one-by-one */
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
