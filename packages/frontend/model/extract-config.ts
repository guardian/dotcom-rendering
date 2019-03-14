import { getNonEmptyString, getString, getObject } from './validators';

const getCommercialUrl = (data: {}): string => {
    return getNonEmptyString(data, 'site.commercialUrl');
};

export const extract = (data: {}): ConfigType => ({
    ajaxUrl: getNonEmptyString(data, 'site.ajaxUrl'),
    sentryPublicApiKey: getString(data, 'site.sentryPublicApiKey', ''),
    sentryHost: getString(data, 'site.sentryHost', ''),
    subscribeWithGoogleApiUrl: getString(
        data,
        'site.subscribeWithGoogleApiUrl',
        '',
    ),
    isDev: process.env.NODE_ENV === 'development',
    switches: getObject(data, 'site.switches', {}),
    dfpAccountId: getObject(data, 'site.dfpAccountId', ''), // TODO check and fix
    commercialUrl: getCommercialUrl(data),
});
