import type { WebpackPluginInstance, Compiler, Configuration } from 'webpack';

type ValidPlugin =
	| WebpackPluginInstance
	| ((this: Compiler, compiler: Compiler) => void);

export const isWebpackPluginInstance = (p: unknown): p is ValidPlugin =>
	p !== false;

export const isWebpackConfiguration = (
	c: false | Configuration,
): c is Configuration => c !== false;
