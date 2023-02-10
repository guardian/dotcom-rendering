/**
 * @type {import('rollup').RollupOptions}
 */

/* eslint-disable import/no-default-export -- rollup wants them */

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import progress from 'rollup-plugin-progress';
import size from 'rollup-plugin-size';

export default {
	input: 'src/web/browser/index.ts',
	output: {
		dir: 'dist',
		format: 'es',
	},
	context: 'window',
	plugins: [
		progress({}),
		typescript(),
		nodeResolve(),
		commonjs(),
		terser(),
		size(),
	],
};
