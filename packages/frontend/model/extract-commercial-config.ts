import {
    getNonEmptyString,
    getBoolean,
    getObject,
} from './validators';

export const extract = (data: {}): CommercialConfigType => ({
    googleAnalytics: {
        timingEvents: [],
        trackers: {
            editorial: getNonEmptyString(
                data,
                'site.googleAnalytics.trackers.editorial',
            ),
            editorialProd: getNonEmptyString(
                data,
                'site.googleAnalytics.trackers.editorialProd',
            ),
            editorialTest: getNonEmptyString(
                data,
                'site.googleAnalytics.trackers.editorialTest',
            ),
        },
    },
    page: {
        ajaxUrl: getNonEmptyString(data, 'site.ajaxUrl'),
        commentable: getBoolean(data, 'page.meta.isCommentable', false),
        contentType: getNonEmptyString(data, 'page.contentType'),
        disableStickyTopBanner: getBoolean(
            data,
            'page.commercial.disableStickyTopBanner',
            false,
        ),
        edition: getNonEmptyString(data, 'page.editionId'),
        hasShowcaseMainElement: getBoolean(
            data,
            'page.meta.hasShowcaseMainElement',
            false,
        ),
        hbImpl: getNonEmptyString(data, 'page.commercial.hbImpl'),
        isDev: process.env.NODE_ENV === 'development',
        isFront: getBoolean(data, 'page.meta.isFront', false),
        isHosted: getBoolean(data, 'page.meta.isHosted', false),
        isLiveBlog: getBoolean(data, 'page.meta.isLiveBlog', false),
        isMinuteArticle: getBoolean(data, 'page.meta.isMinuteArticle', false),
        isPaidContent: getBoolean(data, 'page.meta.isPaidContent', false),
        isPreview: getBoolean(data, 'page.meta.isPreview', false),
        isSensitive: getBoolean(data, 'page.meta.isSensitive', false),
        pageId: getNonEmptyString(data, 'page.pageId'),
        revisionNumber: getNonEmptyString(data, 'page.meta.revisionNumber'),
        section: getNonEmptyString(data, 'page.section'),
        shouldHideAdverts: getBoolean(data, 'page.meta.shouldHideAds', false),
        shouldHideReaderRevenue: getBoolean(data, 'page.meta.shouldHideReaderRevenue', false),
        showNewRecipeDesign: getBoolean(data, 'page.meta.showNewRecipeDesign', false),
        showRelatedContent: getBoolean(data, 'page.meta.showRelatedContent', false),
    },
    switches: getObject(data, 'site.switches', {}),
});
