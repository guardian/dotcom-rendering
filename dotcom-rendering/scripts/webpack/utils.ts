import type LoadablePlugin from '@loadable/webpack-plugin';
import type {
	WebpackPluginInstance,
	Configuration,
	DefinePlugin,
	IgnorePlugin,
} from 'webpack';
import type { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import type WebpackMessages from 'webpack-messages';

type ValidPlugin =
	| WebpackPluginInstance
	| DefinePlugin
	| FilterWarningsPlugin
	| LoadablePlugin
	| IgnorePlugin
	| BundleAnalyzerPlugin
	| WebpackMessages;

export const isWebpackPluginInstance = (
	p: false | ValidPlugin,
): p is WebpackPluginInstance => p !== false;

export const isWebpackConfiguration = (
	c: false | Configuration,
): c is Configuration => c !== false;
