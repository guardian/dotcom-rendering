declare module 'webpack-messages' {
	import type * as webpack from 'webpack';

	type Options = {
		name: string;
		onComplete?: (...args: unknown[]) => void;
		logger?: (msg: string) => void;
	};

	class WebpackMessages implements webpack.WebpackPluginInstance {
		constructor(options: Options);

		printError(str: string, arr: string[]): void;

		apply(compiler: webpack.Compiler): void;
	}

	// eslint-disable-next-line import/no-default-export -- it is how the module is exported
	export default WebpackMessages;
}
