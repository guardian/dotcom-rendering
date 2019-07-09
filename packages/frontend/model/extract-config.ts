import { getNonEmptyString, getString, getObject } from './validators';

export const extract = (data: {}): ConfigType => ({
    ajaxUrl: getNonEmptyString(data, 'site.ajaxUrl'),
    sentryPublicApiKey: getString(data, 'site.sentryPublicApiKey', ''),
    sentryHost: getString(data, 'site.sentryHost', ''),
    switches: getObject(data, 'site.switches', {}),
    dfpAccountId: getObject(data, 'site.dfpAccountId', ''), // TODO check and fix
    commercialUrl: getNonEmptyString(data, 'site.commercialUrl'),
});
