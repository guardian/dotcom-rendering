declare module '@loadable/webpack-plugin' {
	// Awaiting: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/58719

	import * as webpack from 'webpack';

	interface PluginOptions {
		/**
		 * The stats filename.
		 *
		 * @default loadable-stats.json
		 */
		filename?: string | undefined;

		/**
		 * Always write stats file to disk.
		 *
		 * @default false
		 */
		writeToDisk?: boolean | { filename: string } | undefined;

		/**
		 * @default true
		 */
		outputAsset?: boolean | undefined;
	}

	class LoadablePlugin implements webpack.WebpackPluginInstance {
		constructor(options?: PluginOptions);
		apply(compiler: webpack.Compiler): void;
	}

	export default LoadablePlugin;
}
