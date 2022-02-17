declare module 'webpack-messages' {
	import webpack from 'webpack';

	export default class WebpackMessages
		implements webpack.WebpackPluginInstance
	{
		constructor(options: {
			name: string;
			logger: (message: string) => void;
		});

		apply(compiler: webpack.Compiler): void;
	}
}
