// TODO: Delete this file!

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- we’re tracking
const used = [OFF, WARNING, ERROR];

const guardianRules = {
	/*
	FIXABLE STYLISTIC CHOICES THAT DIFFER FROM THE DEFAULT
	The intention is to maximise clarity and consistency,
	not direct or inhibit what can be done with code.
	*/

	// use `string[]` for simple arrays, `Array<string>` for complex ones
	// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple
	'@typescript-eslint/array-type': [
		WARNING,
		{
			default: 'array-simple',
		},
	],

	// use `Record<string, unknown>` instead of `{ [key: string]: unknown }`
	'@typescript-eslint/consistent-indexed-object-style': [WARNING, 'record'],

	// be explicit when you only want to import a type:
	// `import type { Foo } from 'Foo';`
	'@typescript-eslint/consistent-type-imports': [
		WARNING,
		{
			prefer: 'type-imports',
		},
	],

	// delimit members with semi-colons and require
	// one at the end to keep diffs simpler
	'@typescript-eslint/member-delimiter-style': [
		WARNING,
		{
			multiline: {
				delimiter: 'semi',
				requireLast: true,
			},
			singleline: {
				delimiter: 'semi',
				requireLast: false,
			},
		},
	],

	// use `(1 + foo.num!) == 2` instead of `1 + foo.num! == 2`
	'@typescript-eslint/no-confusing-non-null-assertion': WARNING,

	'@typescript-eslint/no-unnecessary-boolean-literal-compare': WARNING,
	'@typescript-eslint/no-unnecessary-condition': WARNING,
	'@typescript-eslint/no-unnecessary-qualifier': WARNING,
	'@typescript-eslint/no-unnecessary-type-arguments': WARNING,

	// use `str.includes(value)` instead of `str.indexOf(value) !== -1`
	'@typescript-eslint/prefer-includes': WARNING,

	// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
	'@typescript-eslint/prefer-reduce-type-parameter': WARNING,

	// use String#startsWith or String#endsWith instead of String#indexOf et al
	'@typescript-eslint/prefer-string-starts-ends-with': WARNING,

	// use `@ts-expect-error` instead of `@ts-ignore`
	'@typescript-eslint/prefer-ts-expect-error': WARNING,

	/*
	NOT FIXABLE BUT USEFUL
	*/

	// Enforce TypeScript naming conventions
	// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
	'@typescript-eslint/naming-convention': [
		2,

		// types are 'PascalCase'
		{
			selector: ['typeLike', 'enumMember'],
			format: ['PascalCase'],
		},
	],

	// use `foo ?? 'a string'` instead of `foo !== null && foo !== undefined ? foo : 'a string'`
	'@typescript-eslint/prefer-nullish-coalescing': WARNING,

	// use `a?.b` instead of `a && a.b`
	'@typescript-eslint/prefer-optional-chain': WARNING,
};

const extraRules = {
	// ES Lint 8
	'@typescript-eslint/no-unsafe-argument': 'warn',
	'@typescript-eslint/default-param-last': 'warn',
	'@typescript-eslint/no-misused-promises': 'warn',

	// More rules
	'eslint-comments/require-description': WARNING,
	'import/order': WARNING,
	'sort-imports': WARNING,
	'eslint-comments/no-unused-disable': WARNING,
	'eslint-comments/disable-enable-pair': WARNING,
	'import/no-default-export': WARNING,
	'@typescript-eslint/naming-convention': WARNING,
};

module.exports = { ...guardianRules, ...extraRules };
