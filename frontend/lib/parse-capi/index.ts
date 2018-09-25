import compose from 'compose-function';
import { string as curly } from 'curlyquotes';
import get from 'lodash.get';

import clean from './clean';
import bigBullets from './big-bullets';
import { pillarNames } from '../../pillars';

const headline = compose(
    clean,
    curly,
);
const standfirst = compose(
    clean,
    bigBullets,
);
const main = clean;
const body = clean;

const defaultArgs = { config: {}, contentFields: {} };

// tslint:disable:prefer-array-literal
const apply = (input: string, ...fns: Array<(_: string) => string>): string => {
    return fns.reduce((acc, fn) => fn(acc), input);
};

const getString = (obj: object, selector: string): string => {
    const found = get(obj, selector);
    if (typeof found === 'string') {
        return found;
    }

    throw new Error(
        `expected string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getNumber = (obj: object, selector: string): number => {
    const found = get(obj, selector);
    if (typeof found === 'number') {
        return found;
    }

    throw new Error(
        `expected number at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getNonEmptyString = (obj: object, selector: string): string => {
    const found = get(obj, selector);
    if (typeof found === 'string' && found.length > 0) {
        return found;
    }

    throw new Error(
        `expected non-empty string at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const getArray = (obj: object, selector: string): any[] => {
    const found = get(obj, selector);
    if (Array.isArray(found)) {
        return found;
    }

    throw new Error(
        `expected array at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const findPillar: (name: string) => Pillar | undefined = name => {
    const pillar: string = name.toLowerCase();
    return pillarNames.find(_ => _ === pillar);
};

const getLink = (data: {}, { isPillar }: { isPillar: boolean }): LinkType => ({
    title: getNonEmptyString(data, 'title'),
    longTitle: getString(data, 'longTitle'),
    url: getNonEmptyString(data, 'url'),
    pillar: isPillar ? findPillar(getNonEmptyString(data, 'title')) : undefined,
    children: getArray(data, 'children').map(
        l => getLink(l, { isPillar: false }), // children are never pillars
    ),
    mobileOnly: false,
});

const getAgeWarning = (webPublicationDate: Date): string | void => {
    const warnLimitDays = 30;
    const currentDate = new Date();
    const dateThreshold = new Date();

    dateThreshold.setDate(currentDate.getDate() - warnLimitDays);

    const publicationDate = new Date(webPublicationDate);

    // if the publication date is before the date threshold generate message
    if (publicationDate < dateThreshold) {
        // Unary + coerces dates to numbers for TypeScript
        const diffMilliseconds = +currentDate - +publicationDate;
        const diffSeconds = Math.floor(diffMilliseconds / 1000);
        const diffMinutes = diffSeconds / 60;
        const diffHours = diffMinutes / 60;
        const diffDays = diffHours / 24;
        const diffMonths = diffDays / 31;
        const diffYears = diffDays / 365;

        const message = 'This article is over';

        if (diffYears >= 2) {
            return `${message} ${Math.floor(diffYears)} years old`;
        }

        if (diffYears > 1) {
            return `${message} 1 year old`;
        }

        if (diffMonths >= 2) {
            return `${message} ${Math.floor(diffMonths)} months old`;
        }

        if (diffMonths > 1) {
            return `${message} 1 month old`;
        }
    }
};

export type PlatformName = 'facebook' | 'twitter' | 'email';

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

const getSharingUrls: (
    data: any,
) => { [K in PlatformName]?: string } = data => {
    const platforms: {
        [K in PlatformName]: {
            campaignCode: string;
            userMessage: string;
            getShareUrl: (href: string, title: string) => string;
        }
    } = {
        facebook: {
            campaignCode: 'share_btn_fb',
            userMessage: 'Share on Facebook',
            getShareUrl: (href, title) => {
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
    };
    const siteURL = 'https://www.theguardian.com';
    const webUrl = `${siteURL}/${getNonEmptyString(
        data,
        'config.page.pageId',
    )}`;
    const getHref = (platform: PlatformName): string =>
        `${webUrl}?CMP=${platforms[platform].campaignCode}`;

    return Object.keys(platforms).reduce((shareUrls, platform) => {
        const href = getHref(platform as PlatformName);
        const title = getNonEmptyString(data, 'config.page.webTitle');

        return Object.assign(
            {
                [platform]: platforms[platform as PlatformName].getShareUrl(
                    href,
                    title,
                ),
            },
            shareUrls,
        );
    }, {});
};

// TODO really it would be nice if we passed just the data we needed and
// didn't have to do the transforms/lookups below. (While preserving the
// validation on types.)
export const extractArticleMeta = (data: {}): CAPIType => {
    const webPublicationDate = new Date(
        getNumber(data, 'config.page.webPublicationDate'),
    );

    const articleMeta: CAPIType = {
        webPublicationDate,
        headline: apply(
            getNonEmptyString(data, 'config.page.headline'),
            clean,
            curly,
        ),
        standfirst: apply(
            getNonEmptyString(data, 'contentFields.fields.standfirst'),
            clean,
            bigBullets,
        ),
        main: apply(
            getNonEmptyString(data, 'contentFields.fields.main'),
            clean,
        ),
        body: getArray(data, 'contentFields.fields.blocks.body')
            .map(block => block.bodyHtml)
            .filter(Boolean)
            .join(''),
        author: getNonEmptyString(data, 'config.page.author'),
        sectionName: getNonEmptyString(data, 'config.page.section'),
        pageId: getNonEmptyString(data, 'config.page.pageId'),
    };

    const ageWarning = getAgeWarning(webPublicationDate);

    if (ageWarning) {
        articleMeta.ageWarning = ageWarning;
    }

    console.log(getSharingUrls(data));

    return articleMeta;
};

export const extractNavMeta = (data: {}): NavType => {
    let pillars = getArray(data, 'config.nav.pillars');

    pillars = pillars.map(link => getLink(link, { isPillar: true }));

    const subnav = get(data, 'config.nav.subNavSections');

    return {
        pillars,
        otherLinks: {
            url: '', // unused
            title: 'More',
            longTitle: 'More',
            more: true,
            children: getArray(data, 'config.nav.otherLinks').map(l =>
                getLink(l, { isPillar: false }),
            ),
        },
        brandExtensions: getArray(data, 'config.nav.brandExtensions').map(l =>
            getLink(l, { isPillar: false }),
        ),
        subNavSections: subnav
            ? {
                  parent: getLink(subnav.parent, { isPillar: false }),
                  links: getArray(subnav, 'links').map(l =>
                      getLink(l, { isPillar: false }),
                  ),
              }
            : undefined,
    };
};

export const extractConfigMeta = (data: {}): ConfigType => {
    return {
        ajaxUrl: getNonEmptyString(data, 'config.page.ajaxUrl'),
    };
};
