import cloneDeep from 'lodash.clonedeep';
import { extract } from './extract-config';
import { data } from '@root/fixtures/article';
import { validateRequestData } from '@root/packages/frontend/model/validate';

describe('extract-config', () => {
    const validatedData = validateRequestData(data, '');
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(validatedData);
    });

    it('returns ajaxUrl if available', () => {
        const testAjaxUrl = 'https://fetchMeSomething.com';

        testData.site.ajaxUrl = testAjaxUrl;

        const { ajaxUrl } = extract(testData);

        expect(ajaxUrl).toBe(testAjaxUrl);
    });

    it('returns sentryPublicApiKey if sentryPublicApiKey available', () => {
        const testSentryPublicApiKey = '12345';

        testData.site.sentryPublicApiKey = testSentryPublicApiKey;

        const { sentryPublicApiKey } = extract(testData);

        expect(sentryPublicApiKey).toBe(testSentryPublicApiKey);
    });

    it('returns sentryHost if sentryHost available', () => {
        const testSentryHost = 'foo';

        testData.site.sentryHost = testSentryHost;

        const { sentryHost } = extract(testData);

        expect(sentryHost).toBe(testSentryHost);
    });

    describe('isDev', () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            process.env = { ...OLD_ENV };
        });

        afterEach(() => {
            process.env = OLD_ENV;
        });

        it('returns isDev as true if process.env.NODE_ENV is "development"', () => {
            process.env.NODE_ENV = 'development';

            const { isDev } = extract(testData);

            expect(isDev).toBe(true);
        });

        it('returns isDev as false if process.env.NODE_ENV is "production"', () => {
            process.env.NODE_ENV = 'production';

            const { isDev } = extract(testData);

            expect(isDev).toBe(false);
        });
    });

    it('returns commercialUrl if available', () => {
        const testCommercialUrl = 'https://fetchMeSomething.com';

        testData.site.commercialUrl = testCommercialUrl;

        const { commercialUrl } = extract(testData);

        expect(commercialUrl).toBe(testCommercialUrl);
    });
});
