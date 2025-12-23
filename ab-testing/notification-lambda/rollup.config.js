import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";

/** @type {import('rollup').RollupOptions} */
const rollupConfig = {
	input: `src/index.ts`,
	output: {
		dir: "dist",
		format: "module",
		preserveModules: true,
		preserveModulesRoot: "src",
		sourcemap: true,
		entryFileNames: (chunkInfo) => {
			if (chunkInfo.name.includes("node_modules")) {
				// Simplify node_modules paths, if it's in node_modules without a package.json
				// it'll be assumed to be a commonjs module, which is incorrect and causes issues.
				return (
					chunkInfo.name.replace(
						/node_modules\/\.pnpm\/.*\/node_modules/,
						"external",
					) + ".js"
				);
			}

			return "[name].js";
		},
	},
	external: ["@aws-sdk/*"],
	plugins: [
		commonjs(),
		nodeResolve({
			preferBuiltins: true,
			exportConditions: ["node"],
			resolveOnly: (moduleName) => !moduleName.startsWith("@aws-sdk"),
		}),
		json(),
		esbuild({
			include: /\.[jt]s?$/,
		}),
	],
};

export default rollupConfig;
