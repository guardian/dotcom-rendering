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

    it('throws Validation Error if required data is invalid type', () => {
        testData.page.content.headline = 1;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('throws Validation Error if non-required data is invalid type', () => {
        testData.page.content.standfirst = 1;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('throws Validation Error if required data is missing/undefined', () => {
        testData.page.contentType = undefined;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('throws Validation Error if required data is null', () => {
        testData.page.webURL = null;
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('throws Validation Error if required non-empty string is empty string', () => {
        testData.page.webURL = '';
        expect(() => {
            validateRequestData(testData, '/AMPArticle');
        }).toThrowError(ValidationError);
    });

    it('returns data with default values if non-required data is null', () => {
        testData.site.sentryHost = null;
        const validatedDataWithDefaults = {
            ...testData,
            site: { ...testData.site, sentryHost: '' },
        };
        expect(validateRequestData(testData, '/AMPArticle')).toEqual(
            validatedDataWithDefaults,
        );
    });

    it('returns data with default values if non-required string data is empty string', () => {
        testData.site.sentryHost = '';
        const validatedDataWithDefaults = {
            ...testData,
            site: { ...testData.site, sentryHost: '' },
        };
        expect(validateRequestData(testData, '/AMPArticle')).toEqual(
            validatedDataWithDefaults,
        );
    });

    it('returns data with default values if non-required non-string data is empty string', () => {
        testData.site.switches = '';
        const validatedDataWithDefaults = {
            ...testData,
            site: { ...testData.site, switches: {} },
        };
        expect(validateRequestData(testData, '/AMPArticle')).toEqual(
            validatedDataWithDefaults,
        );
    });

    it('returns data with default values if non-required string data is undefined', () => {
        testData.site.sentryHost = undefined;
        const validatedDataWithDefaults = {
            ...testData,
            site: { ...testData.site, sentryHost: '' },
        };
        expect(validateRequestData(testData, '/AMPArticle')).toEqual(
            validatedDataWithDefaults,
        );
    });

    it('returns data with default values if non-required array data is undefined', () => {
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
