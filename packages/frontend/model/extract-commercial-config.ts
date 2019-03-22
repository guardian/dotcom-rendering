import {
    // getNonEmptyString,
    getString,
    // getObject
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
    },
});
