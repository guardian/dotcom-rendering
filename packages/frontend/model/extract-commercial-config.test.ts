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

        expect(googleAnalytics.timingEvents).toBeInstanceOf(Array);
    });

    it('returns trackers.editorial if available', () => {
        const editorial = 'foo';

        testData.site.googleAnalytics.trackers.editorial = editorial;

        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.trackers.editorial).toBe(editorial);
    });

    it('throws error if trackers.editorial unavailable', () => {
        testData.site.googleAnalytics.trackers.editorial = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns trackers.editorialProd if available', () => {
        const editorialProd = 'foo';

        testData.site.googleAnalytics.trackers.editorialProd = editorialProd;

        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.trackers.editorialProd).toBe(editorialProd);
    });

    it('throws error if trackers.editorialProd unavailable', () => {
        testData.site.googleAnalytics.trackers.editorialProd = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns trackers.editorialTest if available', () => {
        const editorialTest = 'foo';

        testData.site.googleAnalytics.trackers.editorialTest = editorialTest;

        const { googleAnalytics } = extract(testData);

        expect(googleAnalytics.trackers.editorialTest).toBe(editorialTest);
    });

    it('throws error if trackers.editorialTest unavailable', () => {
        testData.site.googleAnalytics.trackers.editorialTest = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns page.ajaxUrl if available', () => {
        const testAjaxUrl = 'https://fetchMeSomething.com';

        testData.site.ajaxUrl = testAjaxUrl;

        const { page } = extract(testData);

        expect(page.ajaxUrl).toBe(testAjaxUrl);
    });

    it('throws error if page.ajaxUrl unavailable', () => {
        testData.site.ajaxUrl = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns page.commentable if available', () => {
        const commentable = true;

        testData.page.meta.isCommentable = commentable;

        const { page } = extract(testData);

        expect(page.commentable).toBe(commentable);
    });

    it('throws false if page.commentable unavailable', () => {
        testData.page.meta.isCommentable = null;

        const { page } = extract(testData);

        expect(page.commentable).toBe(false);
    });
});
