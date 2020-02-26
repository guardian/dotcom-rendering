import fs from 'fs';
import { logger } from 'logger';

type AssetMapping = { [key: string]: string } | null;

export const getMappings = (): AssetMapping => {
    if (process.env.NODE_ENV !== "production") {
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync('./manifest.json').toString());
    } catch(e) {
        logger.error(`Unable to load asset mapping: ${e}`)
        throw e;
    }
}
