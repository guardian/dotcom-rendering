import { getNonEmptyString } from './';

const appendParamsToUrl: (
    baseUrl: string,
    params: {
        [key: string]: string;
    },
) => string = (baseUrl, params) =>
    Object.keys(params).reduce((shareUrl: string, param: string, i: number) => {
        const seperator = i > 0 ? '&amp;' : '?';

        return `${shareUrl}${seperator}${encodeURIComponent(
            param,
        )}=${encodeURIComponent(params[param])}`;
    }, baseUrl);

export const getSharingUrls: (
    data: any,
) => {
    [K in SharePlatform]?: {
        url: string;
        userMessage: string;
    }
} = data => {
    const articleUrl = `https://www.theguardian.com/${getNonEmptyString(
        data,
        'config.page.pageId',
    )}`;
    const title = getNonEmptyString(data, 'config.page.webTitle');
    const platforms: {
        [K in SharePlatform]: {
            userMessage: string;
            getShareUrl: () => string;
        }
    } = {
        facebook: {
            userMessage: 'Share on Facebook',
            getShareUrl: () => {
                const params: {
                    [key: string]: string;
                } = {
                    app_id: '202314643182694',
                    href: articleUrl,
                    CMP: 'share_btn_fb',
                };
                const baseUrl = 'https://twitter.com/intent/tweet';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        twitter: {
            userMessage: 'Share on Twitter',
            getShareUrl: () => {
                const regex = /Leave.EU/gi;
                const params: {
                    [key: string]: string;
                } = {
                    text: title.replace(regex, 'Leave. EU'),
                    url: articleUrl,
                    CMP: 'share_btn_tw',
                };
                const baseUrl = 'https://www.facebook.com/dialog/share';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        email: {
            userMessage: 'Share via Email',
            getShareUrl: () => {
                const params: {
                    [key: string]: string;
                } = {
                    subject: title,
                    body: articleUrl,
                    CMP: 'share_btn_link',
                };
                const baseUrl = 'mailto:';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        googlePlus: {
            userMessage: 'Share on Google+',
            getShareUrl: () => {
                const params = {
                    url: articleUrl,
                    hl: 'en-GB',
                    wwc: '1',
                    CMP: 'share_btn_gp',
                };
                const baseUrl = 'https://plus.google.com/share';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        whatsApp: {
            userMessage: 'Share on WhatsApp',
            getShareUrl: () => {
                const params = {
                    text: `"${title}" ${articleUrl}`,
                    CMP: 'share_btn_wa',
                };
                const baseUrl = 'whatsapp://send';

                return appendParamsToUrl(baseUrl, params);
            },
        },
    };

    return Object.keys(platforms).reduce((shareUrls, platform) => {
        return Object.assign(
            {
                [platform]: {
                    url: platforms[platform as SharePlatform].getShareUrl(),
                    userMessage:
                        platforms[platform as SharePlatform].userMessage,
                },
            },
            shareUrls,
        );
    }, {});
};
