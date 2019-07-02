import Ajv from 'ajv';
import schema from '@frontend/modelV2/json-schema.json';

const options = {
    verbose: true,
    allErrors: true,
    logger: (false as unknown) as false, // TODO ajv.d.ts
    useDefaults: ('empty' as unknown) as boolean, // TODO add 'empty' to ajv.d.ts - PR pending https://github.com/epoberezkin/ajv/pull/1020
};

const ajv = new Ajv(options);
const validate = ajv.compile(schema);

export const validateAsCAPIType = (data: any): CAPIType => {
    const isValid = validate(data);

    if (!isValid) {
        throw new TypeError(
            `Unable to validate request body.\n
            ${JSON.stringify(validate.errors, null, 2)}`,
        );
    }

    return data as CAPIType;
};
