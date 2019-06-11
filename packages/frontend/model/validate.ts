import Ajv from 'ajv';

export class ValidationError extends Error {
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

    const options = {
        verbose: true,
        allErrors: true,
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
    return isValid;
};
