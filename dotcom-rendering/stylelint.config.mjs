/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-recommended'],
	customSyntax: 'postcss-styled-syntax',
	rules: {
		'no-empty-source': null, // This does not work with using comments inside of css template literals.
		'function-no-unknown': null, // This does not work with using function inside of css template literals.
		'declaration-no-important': true,
		'no-duplicate-selectors': null,
		'no-descending-specificity': null,
		'property-disallowed-list': [
			['font-family'],
			{
				message:
					'Please use the typography functions from source-foundations',
			},
		],
		'color-no-hex': [
			true,
			{
				message:
					'Please use the source-foundations palette variables instead of hex values',
			},
		],
		'declaration-property-value-disallowed-list': [
			{
				color: ['/^rgba/'],
			},
			{
				message:
					'Please use the source-foundations palette variables instead of rgba values',
			},
		],
	},
};
