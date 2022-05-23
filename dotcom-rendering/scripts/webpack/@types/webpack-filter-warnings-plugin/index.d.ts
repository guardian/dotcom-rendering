declare module 'webpack-filter-warnings-plugin' {
	import type { Compiler, WebpackPluginInstance } from 'webpack';

	// eslint-disable-next-line import/no-default-export -- this is how the module exports
	export default class FilterWarningsPlugin implements WebpackPluginInstance {
		constructor(options: { exclude: RegExp });

		apply(compiler: Compiler): void;
	}
}
