import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import articleSchema from '../frontend/schemas/feArticle.json';
import type { CommercialProperties } from '../types/commercial';

const ajv = new Ajv({ allErrors: false, logger: false });
addFormats(ajv);

// Reuses the article definitions, but puzzles only send editions that have a sponsor.
const validate = ajv.compile<Partial<CommercialProperties>>({
	...articleSchema.definitions.CommercialProperties,
	required: [],
	additionalProperties: false,
	definitions: articleSchema.definitions,
});

/** Shared by the puzzles hub and puzzle pages. */
export const isPuzzlesCommercialProperties = (
	value: unknown,
): value is Partial<CommercialProperties> => validate(value);
