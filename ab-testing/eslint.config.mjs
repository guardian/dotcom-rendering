import guardian from "@guardian/eslint-config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["frontend", "eslint.config.mjs", "config/index.ts"]),
	...guardian.configs.recommended,
	{
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: "./",
			},
		},
		rules: {
			curly: ["error", "multi-line"],
			"no-use-before-define": [
				"error",
				{ functions: true, classes: true },
			],
			"import/exports-last": "error",
			"no-else-return": "error",
		},
	},
	{
		files: ["**/*.test.ts"],
		rules: {
			"@typescript-eslint/no-floating-promises": [
				"off",
				{
					allowForKnownSafeCalls: [
						{
							from: "package",
							name: ["it", "describe"],
							package: "node:test",
						},
					],
				},
			],
			"@typescript-eslint/unbound-method": "off",
			// Allowing async tests without await for mocking convenience
			"@typescript-eslint/require-await": "off",
		},
	},
]);
