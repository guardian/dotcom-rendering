import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

type VisualizerOutputTypes = Exclude<
	PluginVisualizerOptions['template'],
	'raw-data' | 'list' | 'markdown' | undefined
>;

const visualizerOutputTypes = [
	'sunburst',
	'treemap',
	'treemap-3d',
	'network',
	'flamegraph',
] as const satisfies readonly VisualizerOutputTypes[];

export const addVisualizerPlugins = (filename: string): PluginOption[] => {
	const visualizerPlugins = visualizerOutputTypes.map(
		(type: VisualizerOutputTypes) =>
			visualizer({
				emitFile: true,
				filename: `stats/${filename}.${type}.html`,
				template: type,
			}),
	);
	return visualizerPlugins;
};
