import {
    getNonEmptyString,
    getString,
    getBoolean,
    getObject,
} from './validators';

export const extract = (data: {}): CommercialConfigType => ({
    googleAnalytics: {
        timingEvents: [],
        trackers: {
            editorial: getString(
                data,
                'site.googleAnalytics.trackers.editorial',
            ),
            editorialProd: getString(
                data,
                'site.googleAnalytics.trackers.editorialProd',
            ),
            editorialTest: getString(
                data,
                'site.googleAnalytics.trackers.editorialTest',
            ),
        },
    },
    page: {
        ajaxUrl: getNonEmptyString(data, 'site.ajaxUrl'),
        commentable: getBoolean(data, 'page.meta.isCommentable', false),
        contentType: getString(data, 'page.contentType'),
        disableStickyTopBanner: getBoolean(
            data,
            'page.commercial.disableStickyTopBanner',
            false,
        ),
        edition: getString(data, 'page.editionId'),
        hasShowcaseMainElement: getBoolean(
            data,
            'page.meta.hasShowcaseMainElement',
            false,
        ),
        hbImpl: getString(data, 'page.commercial.hbImpl'),
        isDev: process.env.NODE_ENV === 'development',
        isFront: getBoolean(data, 'page.meta.isFront', false),
        isHosted: getBoolean(data, 'page.meta.isHosted', false),
        isLiveBlog: getBoolean(data, 'page.meta.isLiveBlog', false),
        isMinuteArticle: getBoolean(data, 'page.meta.isMinuteArticle', false),
        isPaidContent: getBoolean(data, 'page.meta.isPaidContent', false),
        // isPreview: "",
        // isSensitive: "",
        // pageId: "",
        // revisionNumber: "",
        // section: "",
        // shouldHideAdverts: "",
        // shouldHideReaderRevenue: "",
        // showNewRecipeDesign: "",
        // showRelatedContent: "",
    },
    switches: getObject(data, 'site.switches', {}),
});
