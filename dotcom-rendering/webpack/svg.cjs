/** @satisfies {import('webpack').RuleSetRule} */
const svgr = {
	test: /\.svg$/,
	use: [
		{
			loader: '@svgr/webpack',
			options: {
				/** this ensures that we keep the viewBox for imported SVGs */
				svgo: false,
			},
		},
	],
};

module.exports = { svgr };
