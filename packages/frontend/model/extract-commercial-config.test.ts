import cloneDeep from 'lodash.clonedeep';
import { extract } from './extract-commercial-config';
import { data } from '@root/fixtures/article';

describe('extract-config', () => {
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(data);
    });

    it('returns googleAnalytics.timingEvents', () => {
        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.timingEvents).toBe([]);
    });

    it('returns trackers.editorial if available', () => {
        const editorial = 'foo';

        testData.site.googleAnalytics.editorial = editorial;

        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.trackers.editorial).toBe(editorial);
    });

    it('throws error if trackers.editorial unavailable', () => {
        testData.site.googleAnalytics.editorial = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns trackers.editorialProd if available', () => {
        const editorialProd = 'foo';

        testData.site.googleAnalytics.editorial = editorialProd;

        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.trackers.editorialProd).toBe(editorialProd);
    });

    it('throws error if trackers.editorialProd unavailable', () => {
        testData.site.googleAnalytics.editorialProd = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns trackers.editorialTest if available', () => {
        const editorialTest = 'foo';

        testData.site.googleAnalytics.editorial = editorialTest;

        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.trackers.editorialProd).toBe(editorialTest);
    });

    it('throws error if trackers.editorialTest unavailable', () => {
        testData.site.googleAnalytics.editorialTest = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns ajaxUrl if available', () => {
        const testAjaxUrl = 'https://fetchMeSomething.com';

        testData.site.ajaxUrl = testAjaxUrl;

        const { page } = extract(testData);

        expect(page.ajaxUrl).toBe(testAjaxUrl);
    });

    it('throws error if ajaxUrl unavailable', () => {
        testData.site.ajaxUrl = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });
});
