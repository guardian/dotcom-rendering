// TODO: Delete this file!

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- we’re tracking
const used = [OFF, WARNING, ERROR];

const guardianRules = {
	// use `string[]` for simple arrays, `Array<string>` for complex ones
	// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md#array-simple
	'@typescript-eslint/array-type': [
		OFF,
		{
			default: 'array',
		},
	],

	// use `Record<string, unknown>` instead of `{ [key: string]: unknown }`
	'@typescript-eslint/consistent-indexed-object-style': [
		OFF,
		'index-signature',
	],

	// be explicit when you only want to import a type:
	// `import type { Foo } from 'Foo';`
	'@typescript-eslint/consistent-type-imports': [
		WARNING,
		{
			prefer: 'type-imports',
		},
	],

	'@typescript-eslint/no-unnecessary-condition': WARNING,

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
	'@typescript-eslint/naming-convention': WARNING,
};

module.exports = { ...guardianRules, ...extraRules };
