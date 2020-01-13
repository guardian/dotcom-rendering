export const generatePermutivePayload = (rawConfig: ConfigType) => {
    const publishedAt =
        rawConfig.webPublicationDate &&
        typeof rawConfig.webPublicationDate === 'number'
            ? new Date(rawConfig.webPublicationDate).toISOString()
            : void 0;
    const config: { [key: string]: any } = {
        'properties.content.Premium': rawConfig.isPaidContent,
        'properties.content.id': rawConfig.pageId,
        'properties.content.title': rawConfig.headline,
        'properties.content.section': rawConfig.section,
        'properties.content.authors!list[string]': rawConfig.author,
        'properties.content.keywords!list[string]': rawConfig.keywords,
        'properties.content.publishedAt': publishedAt,
        'properties.user.edition': rawConfig.edition,
    };

    const payload: { [key: string]: any } = Object.keys(config)
        .filter(key => typeof config[key] !== 'undefined')
        .reduce((acc: { [key: string]: any }, key) => {
            acc[key] = config[key];
            return acc;
        }, {});

    return payload;
};
