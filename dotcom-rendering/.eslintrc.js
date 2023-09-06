const rulesToOverrideGuardianConfig = {
	// use `string[]` for simple arrays, `Array<string>` for complex ones
	// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple
	'@typescript-eslint/array-type': [
		'off',
		{
			default: 'array',
		},
	],

	// use `Record<string, unknown>` instead of `{ [key: string]: unknown }`
	'@typescript-eslint/consistent-indexed-object-style': [
		'off',
		'index-signature',
	],

	// This is not safe to remove whilst we have noUncheckedIndexedAccess
	'@typescript-eslint/no-unnecessary-condition': 'warn',
};

/** @TODO Review these */
const rulesToReview = {
	'react/no-array-index-key': 'warn', // 34 problems
	'react/button-has-type': 'warn', // 23 problems
	'@typescript-eslint/require-await': 'warn', // 22 problems
	'react/jsx-curly-newline': 'warn', // 8 problems
	'no-case-declarations': 'warn', // 7 problems
	'@typescript-eslint/no-explicit-any': 'warn', // 99 problems

	// ES Lint 8
	'@typescript-eslint/no-unsafe-argument': 'warn',
	'@typescript-eslint/default-param-last': 'warn',
	'@typescript-eslint/no-misused-promises': 'warn',

	// We use prettier to format code. Some eslint rules conflict with prettier
	'react/jsx-indent-props': 'off',
	'react/jsx-indent': 'off',

	// More rules
	'eslint-comments/require-description': 'warn',
	'eslint-comments/no-unused-disable': 'warn',
	'eslint-comments/disable-enable-pair': 'warn',
	'@typescript-eslint/naming-convention': 'warn',
};

/** @TODO Enforce and fix these */
const rulesToEnforce = {
	'@typescript-eslint/no-empty-function': 'warn',
	'@typescript-eslint/no-unsafe-call': 'warn',
	'@typescript-eslint/no-unsafe-assignment': 'warn',
	'@typescript-eslint/no-unsafe-return': 'warn',
	'@typescript-eslint/ban-ts-comment': 'warn',
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
		'plugin:@guardian/source-react-components/recommended',
		'plugin:jsx-a11y/recommended',
		// prettier needs to go last so it can override other configuration. See https://github.com/prettier/eslint-config-prettier#installation
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'react-hooks',
		'import',
		'jsx-a11y',
		'jsx-expressions',
		'custom-elements',
		'unicorn',
	],
	rules: {
		// React, Hooks & JSX
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react/jsx-boolean-value': ['error', 'always'],
		'react/jsx-key': 'error',
		'react/jsx-no-target-blank': 'error',
		'react/jsx-one-expression-per-line': 'off',
		'react/no-danger': 'off', // We use `dangerouslySetInnerHTML` in several components
		'react/prop-types': 'off',
		'react/no-unused-prop-types': 'error',
		'jsx-expressions/strict-logical-expressions': 'error',
		'jsx-a11y/aria-role': [
			'error',
			{
				/**
				 * As we use the `role` prop for editorial weighting,
				 * we do not want to check developer-created components’
				 * use of the `role` attribute.
				 *
				 * @see RoleType
				 * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md#rule-details
				 */
				ignoreNonDOM: true,
			},
		],
		// We want to be careful with context and certainly avoid unnecessary re-renders
		'react/jsx-no-constructed-context-values': 'error',

		'@typescript-eslint/switch-exhaustiveness-check': 'error',
		'array-callback-return': 'error',
		'global-require': 'error',
		'no-console': 'warn',
		'no-empty-pattern': 'error',
		'no-fallthrough': 'off', // We use 'noFallthroughCasesInSwitch' in tsconfig.json as this respects types
		'no-param-reassign': 'error',
		'no-shadow': 'off', // We use the typescript-eslint version as eslint false positives on enums
		'@typescript-eslint/no-shadow': ['error'],
		'no-underscore-dangle': ['warn', { allow: ['_type'] }],
		'no-useless-escape': 'error',
		'no-redeclare': 'error',
		'custom-elements/file-name-matches-element': 'error',

		'object-shorthand': ['error', 'always'],

		/** @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md */
		'unicorn/no-array-for-each': 'error',

		'import/no-extraneous-dependencies': [
			'error',
			// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md#options
			{ packageDir: ['..', '.'] },
		],
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['src/*'],
						message:
							'Paths starting with “src/” are forbidden. Please use a relative path instead',
					},
				],
			},
		],

		'id-denylist': ['error', 'whitelist', 'whiteList', 'WHITELIST'],

		'@typescript-eslint/strict-boolean-expressions': [
			'error',
			{
				// This rule also errors on any ambiguous type comparisons (e.g !! on a type `null | undefined | ""`)
				// https://typescript-eslint.io/rules/strict-boolean-expressions/
				allowString: true,
				allowNumber: true,
				allowNullableObject: true,
				allowNullableBoolean: true,
				allowNullableString: true,
				allowNullableNumber: false, // We only want to enforce this for numbers
				allowAny: true,
			},
		],

		'unicorn/prefer-node-protocol': 'error',

		...rulesToReview,
		...rulesToEnforce,
		...rulesToOverrideGuardianConfig,
	},
	settings: {
		'import/resolver': 'typescript',
		react: {
			// Tells eslint-plugin-react to automatically detect the version of React to use
			version: 'detect',
		},
	},
	overrides: [
		{
			files: ['**/**.js'],
			rules: {
				'global-require': 'off',
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
			files: ['**/**.d.ts'],
			rules: {
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
						// that’s the way declaration files do it!
						disallowTypeAnnotations: false,
					},
				],
			},
		},
		{
			files: ['**/**.tsx'],
			rules: {
				'@typescript-eslint/ban-types': [
					'warn',
					{
						types: {
							// Why? Using explicit return types for React results in types that are often too wide,
							// as expressed in Kent C Dodd’s article How to write a React Component in TypeScript.
							// We don't include `JSX.Element` here as that is
							// see: https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript
							// pr: https://github.com/guardian/dotcom-rendering/pull/5192
							'JSX.Element': 'Prefer type inference',
							'EmotionJSX.Element': 'Prefer type inference',
						},
					},
				],
				'@typescript-eslint/ban-types': [
					'error',
					{
						types: {
							// Why? See this: https://github.com/facebook/create-react-app/pull/8177
							// pr: https://github.com/guardian/dotcom-rendering/pull/5622
							'React.StatelessComponent':
								'Please use const MyThing = ({foo, bar}: Props) instead',
							'React.FunctionComponent':
								'Please use const MyThing = ({foo, bar}: Props) instead',
							'React.SC':
								'Please use const MyThing = ({foo, bar}: Props) instead',
							'React.FC':
								'Please use const MyThing = ({foo, bar}: Props) instead',
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
