import Ajv from 'ajv';
import schema from '@frontend/modelV2/json-schema.json';

const options: Ajv.Options = {
    verbose: false,
    allErrors: true,
    logger: false,
    useDefaults: 'empty',
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
