import { validateRequestData, ValidationError } from './validate';
import { data as articleData } from '@root/fixtures/article';
import cloneDeep from 'lodash.clonedeep';

let testData: any;

beforeEach(() => {
    testData = cloneDeep(articleData);
});

describe('JSON Schema validation of request body', () => {
    it('returns data if data is valid', () => {
        expect(validateRequestData(articleData, '/AMPArticle')).toEqual(
            articleData,
        );
    });

    it('throws Validation Error if any data is invalid type', () => {
        testData.page.content.headline = 1;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('throws Validation Error if required data is missing', () => {
        testData.page.webURL = undefined;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    fit('throws Validation Error if required data is null', () => {
        testData.page.edition = null;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('throws Validation Error if required data is empty string', () => {
        testData.page.webURL = '';
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('returns default values if non-essential string data is undefined', () => {
        testData.site.sentryHost = undefined;
        const validatedDataWithDefaults = {
            ...testData,
            site: { ...testData.site, sentryHost: '' },
        };
        expect(validateRequestData(testData, '/AMPArticle')).toEqual(
            validatedDataWithDefaults,
        );
    });
    it('returns default values if non-essential array data is undefined', () => {
        testData.page.meta.linkedData = undefined;

        const validatedDataWithDefaults = {
            ...testData,
            page: {
                ...testData.page,
                meta: {
                    ...testData.page.meta,
                    linkedData: [],
                },
            },
        };
        expect(validateRequestData(testData, '/AMPArticle')).toEqual(
            validatedDataWithDefaults,
        );
    });
});
