import cloneDeep from 'lodash.clonedeep';
import { extract } from './extract-config';
import { data } from '@root/fixtures/article';

describe('extract-config', () => {
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(data);
    });

    it('returns ajaxUrl if available', () => {
        const testAjaxUrl = 'https://fetchMeSomething.com';

        testData.site.ajaxUrl = testAjaxUrl;

        const { ajaxUrl } = extract(testData);

        expect(ajaxUrl).toBe(testAjaxUrl);
    });

    it('throws error if ajaxUrl unavailable', () => {
        testData.site.ajaxUrl = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns sentryPublicApiKey if sentryPublicApiKey available', () => {
        const testSentryPublicApiKey = '12345';

        testData.site.sentryPublicApiKey = testSentryPublicApiKey;

        const { sentryPublicApiKey } = extract(testData);

        expect(sentryPublicApiKey).toBe(testSentryPublicApiKey);
    });

    it('returns sentryPublicApiKey as empty string if edition not available', () => {
        testData.site.sentryPublicApiKey = null;

        const { sentryPublicApiKey } = extract(testData);

        expect(sentryPublicApiKey).toBe('');
    });

    it('returns sentryHost if sentryHost available', () => {
        const testSentryHost = 'foo';

        testData.site.sentryHost = testSentryHost;

        const { sentryHost } = extract(testData);

        expect(sentryHost).toBe(testSentryHost);
    });

    it('returns sentryHost as empty string if edition not available', () => {
        testData.site.sentryHost = null;

        const { sentryHost } = extract(testData);

        expect(sentryHost).toBe('');
    });

    it('returns commercialUrl if available', () => {
        const testCommercialUrl = 'https://fetchMeSomething.com';

        testData.site.commercialUrl = testCommercialUrl;

        const { commercialUrl } = extract(testData);

        expect(commercialUrl).toBe(testCommercialUrl);
    });

    it('throws error if commercialUrl unavailable', () => {
        testData.site.commercialUrl = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });
});
