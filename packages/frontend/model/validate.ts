import Ajv from 'ajv';

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Validation Error';
    }
}

// enpoint can be used to reference matching schema
export const validateRequestData = (data: any, endpoint: string) => {
    const schema = {
        properties: {
            page: {
                type: 'object',
                properties: {
                    content: {
                        type: 'object',
                        properties: {
                            headline: { type: 'string' },
                        },
                    },
                },
            },
        },
    };

    const ajv = new Ajv();
    const isValid = ajv.validate(schema, data);

    if (!isValid) {
        throw new ValidationError(
            `Could not validate request to ${endpoint}.\n ${JSON.stringify(
                ajv.errors,
                null,
                2,
            )}`,
        );
    }
    return isValid;
};
