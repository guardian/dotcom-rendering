declare module 'webpack-filter-warnings-plugin' {
	import type { Compiler, WebpackPluginInstance } from 'webpack';

	export default class FilterWarningsPlugin implements WebpackPluginInstance {
		constructor(options: { exclude: RegExp });

		apply(compiler: Compiler): void;
	}
}
