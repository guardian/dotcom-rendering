import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import type { Plugin } from 'vite';

/**
 * Makes jsdom compatible with the standalone server bundle deployed by DCR.
 * The production image contains `dist` but no `node_modules`, so jsdom cannot
 * access package files at runtime even though its JavaScript is bundled.
 *
 * Keep these transforms strict so a future jsdom source change fails the build
 * instead of producing a bundle that fails only after deployment.
 */
const COMPUTED_STYLE_PATH =
	'/jsdom/lib/jsdom/living/css/helpers/computed-style.js';
const XHR_IMPLEMENTATION_PATH =
	'/jsdom/lib/jsdom/living/xhr/XMLHttpRequest-impl.js';

export function jsdomPatchPlugin(): Plugin {
	return {
		name: 'jsdom-bundle-patches',
		enforce: 'pre',
		transform(code, id) {
			const modulePath = id.split('?')[0];
			if (modulePath?.endsWith(XHR_IMPLEMENTATION_PATH)) {
				// jsdom resolves its synchronous XHR worker when this module loads.
				// Rolldown leaves that lookup relative to server.js, but the worker and
				// the rest of jsdom's module tree are not deployed alongside the bundle.
				// DCR does not use synchronous XHR, so fail only if it is requested.
				const syncWorkerDeclaration =
					'const syncWorkerFile = require.resolve("./xhr-sync-worker.js");';
				const syncWorkerCreation =
					'syncWorker = new Worker(syncWorkerFile);';

				if (
					!code.includes(syncWorkerDeclaration) ||
					!code.includes(syncWorkerCreation)
				) {
					throw new Error(
						"jsdom patch failed: couldn't find the sync XHR worker setup",
					);
				}

				return code
					.replace(syncWorkerDeclaration, '')
					.replace(
						syncWorkerCreation,
						'throw new Error("Synchronous XMLHttpRequest is unavailable in bundled jsdom");',
					);
			}

			if (!modulePath?.endsWith(COMPUTED_STYLE_PATH)) return;

			// jsdom reads its default stylesheet from its package directory at
			// runtime. Embed the stylesheet in the transformed module because that
			// directory is absent from the production image.
			const defaultStyleSheet = readFileSync(
				resolve(
					dirname(modulePath),
					'../../../browser/default-stylesheet.css',
				),
				'utf-8',
			);
			const defaultStyleSheetDeclaration =
				/const defaultStyleSheet[^;]*;/;

			if (!defaultStyleSheetDeclaration.test(code)) {
				throw new Error(
					"jsdom patch failed: couldn't find the defaultStyleSheet declaration",
				);
			}

			return code.replace(
				defaultStyleSheetDeclaration,
				`const defaultStyleSheet = ${JSON.stringify(defaultStyleSheet)};`,
			);
		},
	};
}
