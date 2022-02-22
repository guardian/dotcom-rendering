declare module 'webpack-messages' {
	import type { Compiler, WebpackPluginInstance } from 'webpack';

	export default class WebpackMessages implements WebpackPluginInstance {
		constructor(options: {
			name: string;
			logger: (message: string) => void;
		});

		apply(compiler: Compiler): void;
	}
}
