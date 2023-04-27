/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import viteSvgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export -- This is what Vitest wants
export default defineConfig({
	plugins: [react(), viteSvgr({ exportAsDefault: true })],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: './scripts/jest/setup.ts',
		watch: true,
	},
});
