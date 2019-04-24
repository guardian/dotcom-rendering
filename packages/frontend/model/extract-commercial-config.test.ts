import cloneDeep from 'lodash.clonedeep';
import { extract } from './extract-commercial-config';
import { data } from '@root/fixtures/article';

describe('extract-commercial-config', () => {
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

    it('returns false if page.commentable unavailable', () => {
        testData.page.meta.isCommentable = null;

        const { page } = extract(testData);

        expect(page.commentable).toBe(false);
    });

    it('returns page.contentType if contentType available', () => {
        const testContentType = 'Video Article';
        testData.page.contentType = testContentType;

        const { page } = extract(testData);

        expect(page.contentType).toBe(testContentType);
    });

    it('throws error if contentType missing', () => {
        testData.page.contentType = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns page.disableStickyTopBanner if disableStickyTopBanner available', () => {
        testData.page.commercial.disableStickyTopBanner = true;

        const { page } = extract(testData);

        expect(page.disableStickyTopBanner).toBe(true);
    });

    it('returns page.disableStickyTopBanner as "false" if missing', () => {
        testData.page.commercial.disableStickyTopBanner = null;

        const { page } = extract(testData);

        expect(page.disableStickyTopBanner).toBe(false);
    });

    it('returns page.edition if editionId available', () => {
        const testEdition = 'UK';

        testData.page.editionId = testEdition;

        const { page } = extract(testData);

        expect(page.edition).toBe(testEdition);
    });

    it('throws error if editionId missing', () => {
        testData.page.editionId = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    it('returns page.hasShowcaseMainElement if available', () => {
        const hasShowcaseMainElement = true;

        testData.page.meta.hasShowcaseMainElement = hasShowcaseMainElement;

        const { page } = extract(testData);

        expect(page.hasShowcaseMainElement).toBe(hasShowcaseMainElement);
    });

    it('returns false if page.hasShowcaseMainElement unavailable', () => {
        testData.page.meta.hasShowcaseMainElement = null;

        const { page } = extract(testData);

        expect(page.hasShowcaseMainElement).toBe(false);
    });

    it('returns page.hbImpl if hbImpl available', () => {
        const hbImpl = 'prebid';

        testData.page.commercial.editionId = hbImpl;

        const { page } = extract(testData);

        expect(page.hbImpl).toBe(hbImpl);
    });

    it('throws error if hbImpl missing', () => {
        testData.page.commercial.hbImpl = null;

        expect(() => {
            extract(testData);
        }).toThrow();
    });

    describe('isDev', () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            process.env = { ...OLD_ENV };
        });

        afterEach(() => {
            process.env = OLD_ENV;
        });

        it('returns page.isDev as true if process.env.NODE_ENV is "development"', () => {
            process.env.NODE_ENV = 'development';

            const { page } = extract(testData);

            expect(page.isDev).toBe(true);
        });

        it('returns page.isDev as false if process.env.NODE_ENV is "production"', () => {
            process.env.NODE_ENV = 'production';

            const { page } = extract(testData);

            expect(page.isDev).toBe(false);
        });
    });

    it('returns page.isFront if available', () => {
        const isFront = true;

        testData.page.meta.isFront = isFront;

        const { page } = extract(testData);

        expect(page.isFront).toBe(isFront);
    });

    it('returns false if isFront unavailable', () => {
        testData.page.meta.isFront = null;

        const { page } = extract(testData);

        expect(page.isFront).toBe(false);
    });

    it('returns page.isHosted if isHosted available', () => {
        testData.page.meta.isHosted = true;

        const { page } = extract(testData);

        expect(page.isHosted).toBe(true);
    });

    it('returns page.isHosted as "false" if missing', () => {
        testData.page.meta.isHosted = null;

        const { page } = extract(testData);

        expect(page.isHosted).toBe(false);
    });

    it('returns page.isLiveBlog if isLiveBlog available', () => {
        testData.page.meta.isLiveBlog = true;

        const { page } = extract(testData);

        expect(page.isLiveBlog).toBe(true);
    });

    it('returns page.isLiveBlog as "false" if missing', () => {
        testData.page.meta.isLiveBlog = null;

        const { page } = extract(testData);

        expect(page.isLiveBlog).toBe(false);
    });

    it('returns page.isMinuteArticle if isMinuteArticle available', () => {
        testData.page.meta.isMinuteArticle = true;

        const { page } = extract(testData);

        expect(page.isMinuteArticle).toBe(true);
    });

    it('returns page.isMinuteArticle as "false" if missing', () => {
        testData.page.meta.isMinuteArticle = null;

        const { page } = extract(testData);

        expect(page.isMinuteArticle).toBe(false);
    });

    it('returns page.isPaidContent if isPaidContent available', () => {
        testData.page.meta.isPaidContent = true;

        const { page } = extract(testData);

        expect(page.isPaidContent).toBe(true);
    });

    it('returns page.isPaidContent as "false" if missing', () => {
        testData.page.meta.isPaidContent = null;

        const { page } = extract(testData);

        expect(page.isPaidContent).toBe(false);
    });

    it('returns switches if available', () => {
        const testSwitches = {
            foo: true,
        };

        testData.site.switches = testSwitches;

        const { switches } = extract(testData);

        expect(switches.foo).toBe(true);
    });

    it('returns empty object if switches unavailable', () => {
        testData.site.switches = null;

        const { switches } = extract(testData);

        expect(switches).toMatchObject({});
    });
});
