import { string as curly } from 'curlyquotes';
import get from 'lodash.get';

import clean from './clean';
import bigBullets from './big-bullets';
import { pillarNames } from '@frontend/lib/pillars';
import { getSharingUrls } from '@frontend/lib/parse-capi/sharing-urls';

// tslint:disable:prefer-array-literal
const apply = (input: string, ...fns: Array<(_: string) => string>): string => {
    return fns.reduce((acc, fn) => fn(acc), input);
};

const getString = (
    obj: object,
    selector: string,
    fallbackValue?: string,
): string => {
    const found = get(obj, selector);
    if (typeof found === 'string') {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
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

// TODO temporary export we should move all validation functions into their own module
export const getNonEmptyString = (obj: object, selector: string): string => {
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

const getArray = <T>(
    obj: object,
    selector: string,
    fallbackValue?: T[],
): T[] => {
    const found = get(obj, selector);
    if (Array.isArray(found)) {
        return found;
    }
    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected array at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

const findPillar: (name?: string) => Pillar | undefined = name => {
    if (!name) {
        return undefined;
    }

    const pillar: string = name.toLowerCase();
    // The pillar name is "arts" in CAPI, but "culture" everywhere else,
    // therefore we perform this substitution here.
    if (pillar === 'arts') {
        return 'culture';
    }
    return pillarNames.find(_ => _ === pillar);
};

const getEditionValue: (name: string) => Edition = name => {
    const editions: Edition[] = ['UK', 'US', 'INT', 'AU'];
    const edition = editions.find(_ => _ === name);
    return edition === undefined ? 'UK' : edition;
};

const getLink = (data: {}, { isPillar }: { isPillar: boolean }): LinkType => {
    const title = getString(data, 'title');
    return {
        title,
        longTitle: getString(data, 'longTitle') || title,
        url: getString(data, 'url'),
        pillar: isPillar ? findPillar(getString(data, 'title')) : undefined,
        children: getArray<object>(data, 'children', []).map(
            l => getLink(l, { isPillar: false }), // children are never pillars
        ),
        mobileOnly: false,
    };
};

const getAgeWarning = (
    tags: TagType[],
    webPublicationDate: Date,
): string | undefined => {
    const isNews = tags.some(t => t.id === 'tone/news');

    if (!isNews) {
        return;
    }

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

    return;
};

const getBoolean = (
    obj: object,
    selector: string,
    fallbackValue?: boolean,
): boolean => {
    const found = get(obj, selector);

    if (typeof found === 'boolean') {
        return found;
    }

    if (fallbackValue !== undefined) {
        return fallbackValue;
    }

    throw new Error(
        `expected boolean  at '${selector}', got '${found}', in '${JSON.stringify(
            obj,
        )}'`,
    );
};

// TODO this is a simple implementation of section data
// and should be updated to matcch full implementation available at
// https://github.com/guardian/frontend/blob/master/common/app/model/content.scala#L202
const getSectionData: (
    tags: TagType[],
) => {
    sectionLabel?: string;
    sectionUrl?: string;
} = tags => {
    const keyWordTag = tags.find(tag => tag.type === 'Keyword');

    if (keyWordTag) {
        return {
            sectionLabel: keyWordTag.title,
            sectionUrl: keyWordTag.id,
        };
    }

    return {};
};

const getSubMetaSectionLinks: (
    data: {
        tags: TagType[];
        isImmersive: boolean;
        isArticle: boolean;
        sectionLabel?: string;
        sectionUrl?: string;
    },
) => SimpleLinkType[] = data => {
    const links: SimpleLinkType[] = [];
    const { tags, isImmersive, isArticle, sectionLabel, sectionUrl } = data;

    if (!(isImmersive && isArticle)) {
        if (sectionLabel && sectionUrl) {
            links.push({
                url: `/${sectionUrl}`,
                title: sectionLabel,
            });
        }

        const blogOrSeriesTags = tags.filter(
            tag => tag.type === 'Blog' || tag.type === 'Series',
        );

        blogOrSeriesTags.forEach(tag => {
            links.push({
                url: `/${tag.id}`,
                title: tag.title,
            });
        });
    }

    return links;
};

const getTags: (data: any) => TagType[] = data => {
    const tags = getArray<any>(data, 'tags.tags', []);
    return tags.map(tag => {
        return {
            id: getNonEmptyString(tag, 'properties.id'),
            type: getNonEmptyString(tag, 'properties.tagType'),
            title: getString(tag, 'properties.webTitle', ''),
            twitterHandle: getString(tag, 'properties.twitterHandle', ''),
        };
    });
};

const getSubMetaKeywordLinks: (
    data: {
        tags: TagType[];
        sectionName: string;
        sectionLabel?: string;
        sectionUrl?: string;
    },
) => SimpleLinkType[] = data => {
    const { tags, sectionName, sectionLabel } = data;

    const keywordTags = tags
        .filter(
            tag =>
                tag.type === 'Keyword' &&
                tag.id !== sectionLabel &&
                tag.title.toLowerCase() !== sectionName.toLowerCase(),
        )
        .slice(1, 6);
    const toneTags = tags.filter(tag => tag.type === 'Tone');

    return [...keywordTags, ...toneTags].map(tag => ({
        url: `/${tag.id}`,
        title: tag.title,
    }));
};

// TODO really it would be nice if we passed just the data we needed and
// didn't have to do the transforms/lookups below. (While preserving the
// validation on types.)
export const extractArticleMeta = (data: {}): CAPIType => {
    const webPublicationDate = new Date(
        getNumber(data, 'config.page.webPublicationDate'),
    );
    const tags = getTags(data);
    const isImmersive = getBoolean(data, 'config.page.isImmersive', false);
    const isArticle =
        tags &&
        tags.some(tag => tag.id === 'type/article' && tag.type === 'Type');
    const sectionData = getSectionData(tags);
    const sectionName = getNonEmptyString(data, 'config.page.section');

    const leadContributor: TagType = tags.filter(
        tag => tag.type === 'Contributor',
    )[0];

    // From the server we get the values: "UK edition", "US edition", "Australia edition", "International edition"
    // editionLongForm is that value, or empty string.
    const editionLongForm = getString(data, 'config.page.edition', '');

    // Possible values for the editionId: "UK", "US", "AU", "INT"
    const editionId = getEditionValue(
        getString(data, 'config.page.editionId', ''),
    );

    if (editionId === undefined) throw new Error('goodbye');

    return {
        webPublicationDate,
        tags,
        sectionName,
        editionLongForm,
        editionId,
        isImmersive,
        webPublicationDateDisplay: getNonEmptyString(
            data,
            'config.page.webPublicationDateDisplay',
        ),
        headline: apply(
            getNonEmptyString(data, 'config.page.headline'),
            clean,
            curly,
        ),
        standfirst: apply(
            getString(data, 'contentFields.fields.standfirst', ''),
            clean,
            bigBullets,
        ),
        main: apply(getString(data, 'contentFields.fields.main', ''), clean),
        body: getArray<any>(data, 'contentFields.fields.blocks.body')
            .map(block => block.bodyHtml)
            .filter(Boolean)
            .join(''),
        author: {
            byline: getString(data, 'config.page.byline', ''),
            twitterHandle: leadContributor
                ? leadContributor.twitterHandle
                : undefined,
            email: 'none',
        },
        elements: [].concat(
            ...getArray<any>(data, 'contentFields.fields.blocks.body')
                .map(block => block.elements)
                .filter(Boolean),
        ),
        pageId: getNonEmptyString(data, 'config.page.pageId'),
        sharingUrls: getSharingUrls(data),
        pillar: findPillar(getString(data, 'config.page.pillar', '')) || 'news',
        ageWarning: getAgeWarning(tags, webPublicationDate),
        subMetaSectionLinks: getSubMetaSectionLinks({
            tags,
            isImmersive,
            isArticle,
            ...sectionData,
        }),
        subMetaKeywordLinks: getSubMetaKeywordLinks({
            tags,
            sectionName,
            ...sectionData,
        }),
        ...sectionData,
    };
};

export const extractNavMeta = (data: {}): NavType => {
    let pillars = getArray<any>(data, 'config.nav.pillars');

    pillars = pillars.map(link => getLink(link, { isPillar: true }));

    const subnav = get(data, 'config.nav.subNavSections');

    return {
        pillars,
        otherLinks: {
            url: '', // unused
            title: 'More',
            longTitle: 'More',
            more: true,
            children: getArray<object>(data, 'config.nav.otherLinks', []).map(
                l => getLink(l, { isPillar: false }),
            ),
        },
        brandExtensions: getArray<object>(
            data,
            'config.nav.brandExtensions',
            [],
        ).map(l => getLink(l, { isPillar: false })),
        currentNavLink: getString(data, 'config.nav.currentNavLink.title', ''),
        subNavSections: subnav
            ? {
                  parent: subnav.parent
                      ? getLink(subnav.parent, { isPillar: false })
                      : undefined,
                  links: getArray<object>(subnav, 'links').map(l =>
                      getLink(l, { isPillar: false }),
                  ),
              }
            : undefined,
        // TODO: replace with data from Frontend
        readerRevenueLinks: {
            header: {
                subscribe:
                    'https://support.theguardian.com/subscribe?INTCMP=header_support_subscribe&amp;acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_HEADER%22%2C%22componentId%22%3A%22header_support_subscribe%22%2C%22referrerPageviewId%22%3A%22jnmzvcxd5o7u2p94r35e%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fuk%22%7D',
                support:
                    'https://support.theguardian.com/?INTCMP=header_support&amp;acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_HEADER%22%2C%22componentId%22%3A%22header_support%22%2C%22referrerPageviewId%22%3A%22jnmzvcxd5o7u2p94r35e%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fuk%22%7D',
            },
            footer: {
                subscribe:
                    'https://support.theguardian.com/subscribe?INTCMP=footer_support_subscribe&amp;acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_FOOTER%22%2C%22componentId%22%3A%22footer_support_subscribe%22%2C%22referrerPageviewId%22%3A%22jnmzvcxd5o7u2p94r35e%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fuk%22%7D',
                contribute:
                    'https://support.theguardian.com/contribute?INTCMP=footer_support_contribute&amp;acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentType%22%3A%22ACQUISITIONS_FOOTER%22%2C%22componentId%22%3A%22footer_support_contribute%22%2C%22referrerPageviewId%22%3A%22jnmzvcxd5o7u2p94r35e%22%2C%22referrerUrl%22%3A%22https%3A%2F%2Fwww.theguardian.com%2Fuk%22%7D',
            },
            sideMenu: {
                subscribe:
                    'https://support.theguardian.com/subscribe?INTCMP=side_menu_support_subscribe&amp;acquisitionData=%7B&quot;source&quot;:&quot;GUARDIAN_WEB&quot;,&quot;componentType&quot;:&quot;ACQUISITIONS_HEADER&quot;,&quot;componentId&quot;:&quot;side_menu_support_subscribe&quot;%7D',
                contribute:
                    'https://support.theguardian.com/contribute?INTCMP=side_menu_support_contribute&amp;acquisitionData=%7B&quot;source&quot;:&quot;GUARDIAN_WEB&quot;,&quot;componentType&quot;:&quot;ACQUISITIONS_HEADER&quot;,&quot;componentId&quot;:&quot;side_menu_support_contribute&quot;%7D',
            },
        },
    };
};

export const extractConfigMeta = (data: {}): ConfigType => {
    return {
        ajaxUrl: getNonEmptyString(data, 'config.page.ajaxUrl'),
    };
};

export interface GADataType {
    pillar: string;
    webTitle: string;
    section: string;
    contentType: string;
    commissioningDesks: string;
    contentId: string;
    authorIds: string;
    keywordIds: string;
    toneIds: string;
    seriesId: string;
    isHosted: string;
    edition: string;
    beaconUrl: string;
}

// All GA fields should  fall back to default values -
// we should not bring down the website if a trackable field is missing!
export const extractGAMeta = (data: {}): GADataType => {
    const edition = getString(data, 'config.page.edition', '').toLowerCase();

    return {
        webTitle: getString(data, 'config.page.webTitle', ''),
        pillar: findPillar(getString(data, 'config.page.pillar', '')) || 'news',
        section: getString(data, 'config.page.section', ''),
        contentType: getString(data, 'config.page.contentType', '')
            .toLowerCase()
            .split(' ')
            .join(''),
        commissioningDesks: getString(
            data,
            'config.page.commissioningDesks',
            '',
        ),
        contentId: getString(data, 'config.page.contentId', ''),
        authorIds: getString(data, 'config.page.authorIds', ''),
        keywordIds: getString(data, 'config.page.keywordIds', ''),
        toneIds: getString(data, 'config.page.toneIds', ''),
        seriesId: getString(data, 'config.page.seriesId', ''),
        isHosted: getBoolean(data, 'config.page.isHosted', false).toString(),
        edition: edition === 'int' ? 'international' : edition,
        beaconUrl: getString(data, 'config.page.beaconUrl', ''),
    };
};
