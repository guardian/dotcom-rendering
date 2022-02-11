import type { WebpackPluginInstance, Compiler } from 'webpack';

type ValidPlugin =
	| WebpackPluginInstance
	| ((this: Compiler, compiler: Compiler) => void);

export const isWebpackPluginInstance = (p: false | ValidPlugin): p is WebpackPluginInstance =>
	p !== false;
