declare module 'webpack-filter-warnings-plugin' {
	import webpack from 'webpack';

	export default class FilterWarningsPlugin
		implements webpack.WebpackPluginInstance
	{
		constructor(options: { exclude: RegExp });

		apply(compiler: webpack.Compiler): void;
	}
}
