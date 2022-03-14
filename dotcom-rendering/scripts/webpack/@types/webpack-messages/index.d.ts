declare module 'webpack-messages' {
	import * as webpack from 'webpack';

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

	export default WebpackMessages;
}
