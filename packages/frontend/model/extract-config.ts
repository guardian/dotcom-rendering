import { getNonEmptyString, getString, getObject } from './validators';

export const extract = (data: {}): ConfigType => ({
    ajaxUrl: getNonEmptyString(data, 'config.page.ajaxUrl'),
    sentryPublicApiKey: getString(data, 'config.page.sentryPublicApiKey', ''),
    sentryHost: getString(data, 'config.page.sentryHost', ''),
    subscribeWithGoogleApiUrl: getString(
        data,
        'config.page.subscribeWithGoogleApiUrl',
        '',
    ),
    isDev: process.env.NODE_ENV === 'development',
    switches: getObject(data, 'config.page.switches', {}),
    dfpAccountId: getObject(data, 'config.page.dfpAccountId', ''), // TODO check and fix
});
