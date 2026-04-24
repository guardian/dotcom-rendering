/**
 * Build orchestration script for Vite.
 * Replaces webpack.config.js's multi-compiler array.
 *
 * Runs the server build first, then all client builds in parallel.
 *
 * Usage:
 *   NODE_ENV=production node --import tsx vite/build.ts
 */
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'vite';
import type { Build } from '../src/lib/assets';
import { BUILD_VARIANT as BUILD_VARIANT_SWITCH } from '../webpack/bundles';
import { createClientConfig } from './vite.config.client';
import { serverConfig } from './vite.config.server';

const PROD = process.env.NODE_ENV === 'production';
const BUILD_VARIANT = process.env.BUILD_VARIANT === 'true';

function getClientBuilds(): Build[] {
	return [
		'client.web',
		...((PROD && BUILD_VARIANT_SWITCH) || BUILD_VARIANT
			? (['client.web.variant'] as const)
			: []),
		'client.apps',
		'client.editionsCrossword',
	];
}

async function runBuild() {
	const clientBuilds = getClientBuilds();
	const startTime = Date.now();
	console.log(
		`\n🔨 Building with Vite (${PROD ? 'production' : 'development'})...\n`,
	);

	// Clean dist directory before building (since emptyOutDir is false on all configs)
	rmSync(resolve(__dirname, '..', 'dist'), { recursive: true, force: true });

	// 1. Build server first (client builds may depend on server output in some setups)
	console.log('📦 Building server...');
	await build(serverConfig);
	console.log('✅ Server build complete\n');

	// 2. Build all client variants in parallel
	console.log(
		`📦 Building ${clientBuilds.length} client bundles in parallel...`,
	);
	await Promise.all(
		clientBuilds.map(async (buildName) => {
			console.log(`  → ${buildName}`);
			const config = createClientConfig(buildName);
			await build(config);
			console.log(`  ✅ ${buildName} complete`);
		}),
	);

	const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
	console.log(`\n🎉 All builds complete in ${elapsed}s\n`);
}

runBuild().catch((err) => {
	console.error('Build failed:', err);
	process.exit(1);
});
