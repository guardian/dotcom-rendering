export interface PermutivePayload {
    'properties.content.Premium'?: string;
    'properties.content.id'?: string;
    'properties.content.title'?: string;
    'properties.content.section'?: string;
    'properties.content.authors!'?: string;
    'properties.content.keywords!'?: string;
    'properties.content.publishedAt'?: string;
    'properties.user.edition'?: string;
}

export const generatePermutivePayload = (
    rawConfig: CommercialConfigType,
): PermutivePayload => {
    const publishedAt =
        rawConfig.webPublicationDate &&
        typeof rawConfig.webPublicationDate === 'number'
            ? new Date(rawConfig.webPublicationDate).toISOString()
            : void 0;
    const authors =
        rawConfig.author && typeof rawConfig.author === 'string'
            ? rawConfig.author
                  .split(',')
                  .map(s => s.trim())
                  .join()
            : void 0;
    const keywords =
        rawConfig.keywords && typeof rawConfig.keywords === 'string'
            ? rawConfig.keywords
                  .split(',')
                  .map(s => s.trim())
                  .join()
            : void 0;
    const config: { [key: string]: any } = {
        'properties.content.Premium': rawConfig.isPaidContent,
        'properties.content.type': rawConfig.contentType,
        'properties.content.series': rawConfig.series,
        'properties.content.id': rawConfig.pageId,
        'properties.content.title': rawConfig.headline,
        'properties.content.section': rawConfig.section,
        'properties.content.authors!list[string]': authors,
        'properties.content.keywords!list[string]': keywords,
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
