export const extract = (data: any): ConfigType => ({
    ajaxUrl: data.site.ajaxUrl,
    sentryPublicApiKey: data.site.sentryPublicApiKey,
    sentryHost: data.site.sentryHost,
    isDev: process.env.NODE_ENV === 'development',
    switches: data.site.switches,
    dfpAccountId: data.site.dfpAccountId, // TODO check and fix
    commercialUrl: data.site.commercialUrl,
});
