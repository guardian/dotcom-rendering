import guardian from '@guardian/eslint-config';
import ts from '@typescript-eslint/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import customElements from 'eslint-plugin-custom-elements';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import jsxExpressions from 'eslint-plugin-jsx-expressions';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import ssrFriendly from 'eslint-plugin-ssr-friendly';
import unicorn from 'eslint-plugin-unicorn';

const rulesToOverrideGuardianConfig = {
	'@typescript-eslint/array-type': [
		'off',
		{
			default: 'array',
		},
	],

	'@typescript-eslint/consistent-indexed-object-style': [
		'off',
		'index-signature',
	],
	'@typescript-eslint/no-unnecessary-condition': 'warn',
};

const rulesToReview = {
	'react/no-array-index-key': 'warn',
	'react/button-has-type': 'warn',
	'@typescript-eslint/require-await': 'warn',
	'react/jsx-curly-newline': 'warn',
	'no-case-declarations': 'warn',
	'@typescript-eslint/no-explicit-any': 'warn',
	'@typescript-eslint/no-unsafe-argument': 'warn',
	'@typescript-eslint/default-param-last': 'warn',
	'@typescript-eslint/no-misused-promises': 'warn',
	'react/jsx-indent-props': 'off',
	'react/jsx-indent': 'off',
	'@eslint-community/eslint-comments/require-description': 'warn',
	'@eslint-community/eslint-comments/no-unused-disable': 'warn',
	'@eslint-community/eslint-comments/disable-enable-pair': 'warn',
	'@typescript-eslint/naming-convention': 'warn',
	'@typescript-eslint/switch-exhaustiveness-check': 'warn',
	'no-redeclare': 'warn',
	'react/no-unescaped-entities': 'warn',
	'@typescript-eslint/no-unsafe-member-access': 'warn',
};

const rulesToEnforce = {
	'@typescript-eslint/no-empty-function': 'warn',
	'@typescript-eslint/no-unsafe-call': 'warn',
	'@typescript-eslint/no-unsafe-assignment': 'warn',
	'@typescript-eslint/no-unsafe-return': 'warn',
	'@typescript-eslint/ban-ts-comment': 'warn',
};

export default defineConfig([
	...guardian.configs.recommended,
	...guardian.configs.jest,
	...guardian.configs.react,
	...guardian.configs.storybook,
	{
		files: ['**/*.ts', '**/*.tsx'],

		languageOptions: {
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},

		plugins: {
			'@typescript-eslint': ts,
			react: react,
			'react-hooks': hooks,
			'jsx-a11y': jsxA11y,
			'jsx-expressions': jsxExpressions,
			'custom-elements': customElements,
			unicorn,
			'ssr-friendly': ssrFriendly,
		},

		rules: {
			'react-hooks/exhaustive-deps': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react/jsx-boolean-value': ['error', 'always'],
			'react/jsx-key': 'error',
			'react/jsx-no-target-blank': 'error',
			'react/jsx-one-expression-per-line': 'off',
			'react/no-danger': 'off',
			'react/prop-types': 'off',
			'react/no-unused-prop-types': 'error',
			'jsx-expressions/strict-logical-expressions': 'error',

			'jsx-a11y/aria-role': [
				'error',
				{
					ignoreNonDOM: true,
				},
			],

			'react/jsx-no-constructed-context-values': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'array-callback-return': 'error',
			'global-require': 'error',
			'no-console': 'warn',
			'no-empty-pattern': 'error',
			'no-fallthrough': 'off',
			'no-param-reassign': 'error',
			'no-shadow': 'off',
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
			curly: ['error', 'multi-line', 'consistent'],
			'unicorn/no-array-for-each': 'error',

			'import/no-extraneous-dependencies': [
				'error',
				{
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
			'no-restricted-syntax': 'off',
		},
	},
	{
		files: ['**/**.d.ts'],

		rules: {
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					disallowTypeAnnotations: false,
				},
			],
		},
	},
	{
		files: ['**/**.tsx'],

		rules: {
			'@typescript-eslint/no-restricted-types': [
				'warn',
				{
					types: {
						'JSX.Element': 'Prefer type inference',
						'EmotionJSX.Element': 'Prefer type inference',
					},
				},
			],

			'@typescript-eslint/no-restricted-types': [
				'error',
				{
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
		files: ['**/**.stories.tsx'],

		rules: {
			'import/prefer-default-export': 'off',
		},
	},
	{
		files: ['**/**.config.ts', '**/webpack.config.*', '**/webpack/**/*.*'],

		rules: {
			'import/prefer-default-export': 'off',
		},
	},
	{
		files: ['src/client/**/*.ts'],

		rules: {
			'ssr-friendly/no-dom-globals-in-module-scope': 'off',
		},
	},
	globalIgnores([
		'**/node_modules',
		'**/.eslintrc.js',
		'**/storybook-static/',
		'**/dist',
		'**/test-results/',
		'**/playwright-report/',
		'playwright/.cache/',
	]),
]);
