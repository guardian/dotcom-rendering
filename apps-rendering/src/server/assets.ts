import fs from 'fs';
import { isObject } from 'lib';
import { logger } from 'logger';

type AssetMapping = Record<string, string | undefined> | null;

function getAssetMappings(): AssetMapping {
	if (process.env.NODE_ENV !== 'production') {
		return null;
	}

	const manifestLocation = process.env.ASSETS_MANIFEST;

	if (!manifestLocation) {
		logger.error('Environment variable ASSETS_MANIFEST not set');
		throw new Error('Environment variable ASSETS_MANIFEST not set');
	}

	try {
		const parsed: unknown = JSON.parse(
			fs.readFileSync(manifestLocation).toString(),
		);

		if (!isObject(parsed)) {
			throw new Error("Manifest file doesn't appear to be an object");
		}

		return Object.entries(parsed).reduce(
			(mappings, [key, value]) =>
				typeof value === 'string'
					? { ...mappings, [key]: value }
					: mappings,
			{},
		);
	} catch (e) {
		logger.error(`Unable to load asset mapping`, e);
		throw e;
	}
}

export function getMappedAssetLocation(): (assetName: string) => string {
	const scriptMappings = getAssetMappings();
	if (scriptMappings) {
		return (assetName: string): string => {
			const mappedAsset = scriptMappings[assetName] ?? assetName;
			return `http://localhost:8081/assets/${mappedAsset}`;
		};
	} else {
		return (assetName: string): string =>
			`http://localhost:8081/assets/${assetName}`;
	}
}
