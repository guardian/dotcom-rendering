import Ajv from 'ajv';

export class ValidationError extends Error { }

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
            `Could not validate request from ${endpoint}.\n ${JSON.stringify(
                ajv.errors,
                null,
                4,
            )}`,
        );
    }
    return isValid;
};
