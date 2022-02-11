import type { Options } from 'ajv';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import schema from './json-schema.json';

const options: Options = {
	verbose: false,
	allErrors: false,
	logger: false,
	useDefaults: 'empty',
};

const ajv = new Ajv(options);
addFormats(ajv);

const validate = ajv.compile(schema);

export const validateAsCAPIType = (data: { [key: string]: any }): CAPIType => {
	const isValid = validate(data);

	if (!isValid) {
		// @ts-expect-error
		const url = data.webURL || 'unknown url';

		throw new TypeError(
			`Unable to validate request body for url ${url}.\n
            ${JSON.stringify(validate.errors, null, 2)}`,
		);
	}

	return data as CAPIType;
};
