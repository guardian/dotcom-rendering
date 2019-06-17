import { validateRequestData, ValidationError } from './validate';
import { data } from '@root/fixtures/article';

describe('JSON Schema request data validation', () => {
    it('returns true if data is valid', () => {
        expect(validateRequestData(data, '/AMPArticle')).toBe(true);
    });

    it('throws validation Error if data is invalid', () => {
        const testData = {
            ...data,
            page: { content: { headline: 1 } },
        };
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });
});
