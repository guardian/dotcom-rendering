import { getNonEmptyString, getString, getObject } from './validators';

export const extract = (data: {}): ConfigType => ({
    ajaxUrl: getNonEmptyString(data, 'config.ajaxUrl'),
    sentryPublicApiKey: getString(data, 'config.sentryPublicApiKey', ''),
    sentryHost: getString(data, 'config.sentryHost', ''),
    isDev: process.env.NODE_ENV === 'development',
    switches: getObject(data, 'config.switches', {}),
});
