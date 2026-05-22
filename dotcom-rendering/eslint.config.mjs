import guardian from '@guardian/eslint-config';
import ts from '@typescript-eslint/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import customElements from 'eslint-plugin-custom-elements';
import { createNodeResolver } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import ssrFriendly from 'eslint-plugin-ssr-friendly';
import unicorn from 'eslint-plugin-unicorn';

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
};

/** @TODO Review these */
const rulesToReview = {
	'@typescript-eslint/strict-boolean-expressions': 'warn', // 900 warnings
	'@typescript-eslint/switch-exhaustiveness-check': 'warn', // 350 warnings
	'react/no-array-index-key': 'warn', // 33 problems
	'@typescript-eslint/require-await': 'warn', // 17 problems
	'no-case-declarations': 'warn', // 9 problems
	'@typescript-eslint/no-explicit-any': 'warn', // 58 warnings
	'@eslint-community/eslint-comments/require-description': 'warn', // 11 warnings
	'@typescript-eslint/naming-convention': 'warn',
	'no-redeclare': 'warn', // 100 warnings
	'react/no-unescaped-entities': 'warn', // 45 warnings

	// New react rules that we haven’t investigated if we want to apply yet
	'react/display-name': 'warn', // 13 warnings
	'react-hooks/set-state-in-effect': 'warn', // 47 warnings
	'react-hooks/refs': 'warn', // 15 warnings
	'react-hooks/static-components': 'warn', // 7 warnings
	'react-hooks/immutability': 'warn', // 11 warnings
	'react-hooks/purity': 'warn', // 5 warnings
};

/** @TODO Enforce and fix these */
const rulesToEnforce = {
	'@typescript-eslint/no-empty-function': 'warn', // 120 warnings
	'@typescript-eslint/no-unsafe-call': 'warn', // 14 warnings
	'@typescript-eslint/no-unsafe-assignment': 'warn', // 42 warnings
	'@typescript-eslint/no-unsafe-return': 'warn', // 8 warnings
	'@typescript-eslint/prefer-nullish-coalescing': 'warn', // 30 warnings
	// This is not safe to remove whilst we have noUncheckedIndexedAccess
	'@typescript-eslint/no-unnecessary-condition': 'warn', // 19 warnings
	'@typescript-eslint/no-unsafe-argument': 'warn', // 30 warnings
	'@typescript-eslint/default-param-last': 'warn', // 6 warnings
	'@typescript-eslint/no-misused-promises': 'warn', // 20 warnings
};

export default defineConfig([
	...guardian.configs.recommended,
	...guardian.configs.jest,
	...guardian.configs.react,
	...guardian.configs.storybook,
	eslintPluginPrettierRecommended,
	{
		settings: {
			'import-x/resolver-next': [
				createTypeScriptImportResolver(),
				createNodeResolver(),
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx'],

		/**
		 * Plugins need to be in the same config block for some rules to work, so need to be re-declared even if they are already included in the extended configs. See https://eslint.org/docs/latest/use/configure/configuration-files#use-configurations-from-plugins for more details.
		 *
		 * They also must be the exact same version as the one used in the extended configs.
		 */
		plugins: {
			'@typescript-eslint': ts,
			react: react,
			'react-hooks': hooks,
			'jsx-a11y': jsxA11y,
			'custom-elements': customElements,
			unicorn,
			'ssr-friendly': ssrFriendly,
		},

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
			// We use prettier to format code. Some eslint rules conflict with prettier
			'react/jsx-indent-props': 'off',
			'react/jsx-indent': 'off',
			'react/jsx-curly-newline': 'off',

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

			'no-underscore-dangle': [
				'warn',
				{
					allow: ['_type'],
				},
			],

			'no-useless-escape': 'error',
			'no-redeclare': 'error',
			'custom-elements/file-name-matches-element': 'error',
			'object-shorthand': ['error', 'always'],

			// need to be explicitely added because it is disabled by extending `prettier`
			curly: ['error', 'multi-line', 'consistent'],

			/** @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md */
			'unicorn/no-array-for-each': 'error',

			'import/no-extraneous-dependencies': [
				'error',
				{
					// https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md#options
					packageDir: ['..', '.'],
				},
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
					allowNullableNumber: false,
					allowAny: true,
				},
			],

			'unicorn/prefer-node-protocol': 'error',

			'no-restricted-syntax': [
				'error',
				{
					selector:
						"CallExpression[callee.object.name='localStorage']",
					message: 'Use @guardian/libs’s storage.local instead',
				},
				{
					selector:
						"CallExpression[callee.object.object.name='window'][callee.object.property.name='localStorage']",
					message: 'Use @guardian/libs’s storage.local instead',
				},
				{
					selector:
						"CallExpression[callee.object.name='sessionStorage']",
					message: 'Use @guardian/libs’s storage.session instead',
				},
				{
					selector:
						"CallExpressionCallExpression[callee.object.object.name='window'][callee.object.name='sessionStorage']",
					message: 'Use @guardian/libs’s storage.session instead',
				},
			],
			...rulesToOverrideGuardianConfig,
			...rulesToReview,
			...rulesToEnforce,
		},

		settings: {
			'import/resolver': 'typescript',

			react: {
				// Tells eslint-plugin-react to automatically detect the version of React to use
				version: 'detect',
			},
		},
	},
	globalIgnores(['src/static/js/curl-with-js-and-domReady.js']),
	{
		files: ['**/**.js'],

		rules: {
			'global-require': 'off',
			'@typescript-eslint/no-require-imports': 'off',
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
		files: ['**/**.test.ts', 'playwright/**/*.ts'],

		rules: {
			'no-restricted-syntax': 'off', // we allow native localStorage access in tests
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
			'@typescript-eslint/no-restricted-types': [
				'error',
				{
					// Why? See this: https://github.com/facebook/create-react-app/pull/8177
					// pr: https://github.com/guardian/dotcom-rendering/pull/5622
					types: {
						'React.StatelessComponent':
							'Please use const MyThing = ({foo, bar}: Props) instead',
						'React.FunctionComponent':
							'Please use const MyThing = ({foo, bar}: Props) instead',
						'React.SC':
							'Please use const MyThing = ({foo, bar}: Props) instead',
						'React.FC':
							'Please use const MyThing = ({foo, bar}: Props) instead',
					},
				},
			],
		},
	},
	{
		files: ['**/**.stories.tsx', '**/**.stories.jsx'],

		rules: {
			'import/prefer-default-export': 'off',
			'import/no-default-export': 'off',
		},
	},
	{
		files: [
			'**/**.config.ts',
			'**/webpack.config.*',
			'**/webpack/**/*.*',
			'**/stylelint.config.mjs',
		],

		rules: {
			'import/prefer-default-export': 'off',
			'import/no-default-export': 'off',
		},
	},
	{
		files: ['src/client/**/*.ts'],

		rules: {
			// the modules in the src/client/ directory are meant to run in a browser
			'ssr-friendly/no-dom-globals-in-module-scope': 'off',
		},
	},
	globalIgnores([
		'**/node_modules',
		'**/.eslintrc.js',
		'**/storybook-static/',
		'**/.storybook/',
		'**/stories/generated/',
		'**/dist',
		'**/test-results/',
		'**/playwright-report/',
		'playwright/.cache/',
		'webpack/.swcrc.json',
	]),
]);
