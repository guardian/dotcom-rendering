module.exports = {
	parser: '@typescript-eslint/parser',

	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'@guardian/eslint-config-typescript',
		'plugin:@guardian/source-react-components/recommended',
	],
	parserOptions: {
		// Allows for the parsing of modern ECMAScript features
		ecmaVersion: 2018,
		// Allows for the use of imports
		sourceType: 'module',
		ecmaFeatures: {
			// Allows for the parsing of JSX
			jsx: true,
		},
		project: 'tsconfig.json',
	},
	rules: {
		// Triple-equals equality in JS
		eqeqeq: 'error',
		// Avoid let when variable is never re-assigned
		'prefer-const': 'error',
		'no-trailing-spaces': 'error',
		indent: [
			'error',
			4,
			{
				SwitchCase: 1,
			},
		],
		'max-len': [
			'error',
			{
				code: 100,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreUrls: true,
			},
		],
		// Enforce TypeScript naming conventions
		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
		'@typescript-eslint/naming-convention': [
			'error',

			/**
			 * Normal functions are 'camelCase', React components are 'PascalCase'
			 * Example:
			 *   function getName(id: string) {}
			 *   function HelloWorld(props: Props) {}
			 */
			{
				selector: 'function',
				format: ['camelCase', 'PascalCase'],
			},

			/** Normal variables are 'camelCase', React components are 'PascalCase',
			 * constants are 'UPPER_CASE'
			 * Example:
			 *   const fullName: string = ''
			 *   const HelloWorld: FC<Props> = props => {}
			 *   const IMAGE_WIDTH: number = 8
			 */
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
			},

			/** All types, including enum members, are 'PascalCase'
			 * Example:
			 *   interface ComponentProps {}
			 *   type SpamAndEggs = 'spam' | 'eggs'
			 *   enum SpamAndEggs { Spam, Eggs }
			 */
			{
				selector: ['typeLike', 'enumMember'],
				format: ['PascalCase'],
			},
		],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/explicit-function-return-type': 'error',
		// This check seems to be flaky, and complains about things that TS is happy about
		'react/prop-types': 'off',
		'import/no-unresolved': 'off',
		// JSX no longer requires React in scope as of React 17
		// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		indent: 'off',
		'import/no-default-export': 'off',
		// The CSS `list-style: none` causes accessibility issues in Safari when applied to unordered lists (<ul>).
		// Adding the `role="list"` attribute to the <ul> tag fixes the issue in Safari, but triggers
		// the `no-redundant-roles` linting error. The configuration below prevents the error by telling
		// the linter that `list` is an allowed ARIA role for the <ul> tag.
		'jsx-a11y/no-redundant-roles': [
			'error',
			{
				ul: ['list'],
			},
		],
		// eslint-plugin-react doesn't seem to understand the Emotion `css` prop,
		// so we ignore it from this rule
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
	},
	settings: {
		react: {
			// Tells eslint-plugin-react to automatically detect the version of React to use
			version: 'detect',
		},
	},
};
