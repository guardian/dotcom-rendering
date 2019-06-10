import Ajv from 'ajv';
import { schema } from './schema/article.json.schema';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Validation Error';
    }
}

// enpoint can be used to reference matching schema
export const validateRequestData = (data: any, endpoint: string) => {
    const options: Ajv.Options = {
        verbose: true,
        allErrors: true,
        useDefaults: 'empty', // modifies data in place // TODO add 'empty' to ajv type def
    };
    const ajv = new Ajv(options);
    const isValid = ajv.validate(schema, data);

    if (!isValid) {
        throw new ValidationError(
            `Could not validate ${endpoint} request for ${
            data.page.pageId
            }.\n ${JSON.stringify(ajv.errors, null, 2)}`,
        );
    }

    // Includes fallback values from schema defaults for undefined properties
    return data;
};
