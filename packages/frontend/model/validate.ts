import Ajv from 'ajv';
import { schema } from './schema/articleV2.json.schema';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Validation Error';
    }
}
const options = {
    verbose: true,
    allErrors: true,
    logger: (false as unknown) as false, // TODO ajv.d.ts
    useDefaults: ('empty' as unknown) as boolean, // TODO add 'empty' to ajv.d.ts - PR pending https://github.com/epoberezkin/ajv/pull/1020
};

const ajv = new Ajv(options);
const validate = ajv.compile(schema);

// enpoint can be used to reference matching schema
export const validateRequestData = (data: any, endpoint: string) => {
    const isValid = validate(data);

    if (!isValid) {
        throw new ValidationError(
            `Could not validate ${endpoint} request for ${data.page.pageId}.\n
            ${JSON.stringify(validate.errors, null, 2)}`,
        );
    }

    // ajv modifies data in place so we can return data
    // with fallback values from schema defaults for undefined properties
    return data;
};
