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
    const platforms: {
        [K in SharePlatform]: {
            campaignCode: string;
            userMessage: string;
            getShareUrl: (href: string, title: string) => string;
        }
    } = {
        facebook: {
            campaignCode: 'share_btn_fb',
            userMessage: 'Share on Facebook',
            getShareUrl: href => {
                const params: {
                    [key: string]: string;
                } = {
                    href,
                    app_id: '202314643182694',
                };
                const baseUrl = 'https://twitter.com/intent/tweet';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        twitter: {
            campaignCode: 'share_btn_tw',
            userMessage: 'Share on Twitter',
            getShareUrl: (href, title) => {
                const regex = /Leave.EU/gi;
                const params: {
                    [key: string]: string;
                } = {
                    text: title.replace(regex, 'Leave. EU'),
                    url: href,
                };
                const baseUrl = 'https://www.facebook.com/dialog/share';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        email: {
            campaignCode: 'share_btn_link',
            userMessage: 'Share via Email',
            getShareUrl: (href, title) => {
                const params: {
                    [key: string]: string;
                } = {
                    subject: title,
                    body: href,
                };
                const baseUrl = 'mailto:';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        googlePlus: {
            campaignCode: 'share_btn_gp',
            userMessage: 'Share on Google+',
            getShareUrl: href => {
                const params = {
                    url: href,
                    hl: 'en-GB',
                    wwc: '1',
                };
                const baseUrl = 'https://plus.google.com/share';

                return appendParamsToUrl(baseUrl, params);
            },
        },
        whatsApp: {
            campaignCode: 'share_btn_wa',
            userMessage: 'Share on WhatsApp',
            getShareUrl: (href, title) => {
                const params = {
                    text: `"${title}" ${href}`,
                };
                const baseUrl = 'whatsapp://send';

                return appendParamsToUrl(baseUrl, params);
            },
        },
    };
    const siteURL = 'https://www.theguardian.com';
    const webUrl = `${siteURL}/${getNonEmptyString(
        data,
        'config.page.pageId',
    )}`;
    const getHref = (platform: SharePlatform): string =>
        `${webUrl}?CMP=${platforms[platform].campaignCode}`;

    return Object.keys(platforms).reduce((shareUrls, platform) => {
        const href = getHref(platform as SharePlatform);
        const title = getNonEmptyString(data, 'config.page.webTitle');

        return Object.assign(
            {
                [platform]: {
                    url: platforms[platform as SharePlatform].getShareUrl(
                        href,
                        title,
                    ),
                    userMessage:
                        platforms[platform as SharePlatform].userMessage,
                },
            },
            shareUrls,
        );
    }, {});
};
