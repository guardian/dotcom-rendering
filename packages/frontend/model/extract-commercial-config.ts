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
        disableStickyTopBanner: getBoolean(
            data,
            'page.commercial.disableStickyTopBanner',
            false,
        ),
    },
    switches: getObject(data, 'site.switches', {}),
});
