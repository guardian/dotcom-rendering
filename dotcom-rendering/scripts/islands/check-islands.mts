import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

const SRC_DIR = path.resolve(currentDirname, '../../src');
const COMPONENTS_DIR = path.resolve(SRC_DIR, 'components');
const ISLAND_FILENAME_FRAGMENT = '.island.tsx';

const normalizePath = (filePath: string): string =>
	filePath.split(path.sep).join('/');

const run = async (): Promise<void> => {
	const entries = await readdir(SRC_DIR, { recursive: true });

	const islandFiles = entries.filter((entry) =>
		path.basename(entry).includes(ISLAND_FILENAME_FRAGMENT),
	);

	const invalidIslandFiles = islandFiles
		.filter(
			(filePath) =>
				path.resolve(SRC_DIR, path.dirname(filePath)) !==
				COMPONENTS_DIR,
		)
		.map(normalizePath)
		.sort();

	if (invalidIslandFiles.length === 0) {
		console.info(
			`All files containing "${ISLAND_FILENAME_FRAGMENT}" are in src/components.`,
		);
		return;
	}

	console.error(
		`Islands must live in the root of /components and follow the [MyComponent].island.tsx naming convention 🚨`,
	);

	console.error(
		`Found ${invalidIslandFiles.length} file(s) containing "${ISLAND_FILENAME_FRAGMENT}" outside src/components:`,
	);

	for (const invalidFile of invalidIslandFiles) {
		console.error(`- ${normalizePath(invalidFile)}`);
	}

	process.exitCode = 1;
};

run().catch((error: unknown) => {
	console.error('Failed to check island component locations.');
	console.error(error);
	process.exitCode = 1;
});
