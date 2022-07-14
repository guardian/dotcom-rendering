import type { Options } from 'ajv';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from './article-schema.json';
import frontSchema from './front-schema.json';

const options: Options = {
	verbose: false,
	allErrors: false,
	logger: false,
	useDefaults: 'empty',
};

const ajv = new Ajv(options);
addFormats(ajv);

const validate = ajv.compile(schema);
const validateFront = ajv.compile(frontSchema);

export const validateAsCAPIType = (data: {
	[key: string]: unknown;
}): CAPIArticleType => {
	const isValid = validate(data);

	if (!isValid) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it works!
		const url = data.webURL || 'unknown url';

		throw new TypeError(
			`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validate.errors, null, 2)}`,
		);
	}

	return data as unknown as CAPIArticleType;
};

export const validateAsFrontType = (data: {
	[key: string]: unknown;
}): FEFrontType => {
	const isValid = validateFront(data);

	if (!isValid) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it works!
		const url = data.webURL || 'unknown url';

		throw new TypeError(
			`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validateFront.errors, null, 2)}`,
		);
	}

	return data as unknown as FEFrontType;
};
