import {
    getString,
    getNumber,
    getNonEmptyString,
    getBoolean,
    getArray,
    getObject,
    optional,
} from './validators';
import { clean } from './clean';
import { stripHTML } from './strip-html';
import { string as curly } from 'curlyquotes';

import { getSharingUrls } from './sharing-urls';
import { findPillar } from './find-pillar';

// tslint:disable:prefer-array-literal
const apply = (input: string, ...fns: Array<(_: string) => string>): string => {
    return fns.reduce((acc, fn) => fn(acc), input);
};

const getEditionValue: (name: string) => Edition = name => {
    const editions: Edition[] = ['UK', 'US', 'INT', 'AU'];
    const edition = editions.find(_ => _ === name);
    return edition === undefined ? 'UK' : edition;
};

const getTags: (data: any) => TagType[] = data => {
    const tags = getArray<any>(data, 'page.tags.all', []);
    return tags.map(tag => {
        return {
            id: getNonEmptyString(tag, 'properties.id'),
            type: getNonEmptyString(tag, 'properties.tagType'),
            title: getString(tag, 'properties.webTitle', ''),
            twitterHandle: getString(tag, 'properties.twitterHandle', ''),
            bylineImageUrl: getString(tag, 'properties.bylineImageUrl', ''),
        };
    });
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
        let message;

        if (diffYears >= 2) {
            message = `${Math.floor(diffYears)} years old`;
        } else if (diffYears > 1) {
            message = '1 year old';
        } else if (diffMonths >= 2) {
            message = `${Math.floor(diffMonths)} months old`;
        } else if (diffMonths > 1) {
            message = '1 month old';
        }

        return message;
    }
};

const getSubMetaSectionLinks: (data: {}) => SimpleLinkType[] = data => {
    const subMetaSectionLinks = getArray<any>(
        data,
        'page.subMetaLinks.sectionLabels',
        [],
    );

    return subMetaSectionLinks.map(({ link, text }) => ({
        url: link,
        title: text,
    }));
};

const getSubMetaKeywordLinks: (data: {}) => SimpleLinkType[] = data => {
    const subMetaKeywordLinks = getArray<any>(
        data,
        'page.subMetaLinks.keywords',
        [],
    );

    return subMetaKeywordLinks.map(({ link, text }) => ({
        url: link,
        title: text,
    }));
};

const getCommercialProperties = (data: {}): CommercialProperties => {
    return getObject(
        data,
        'page.commercial.editionCommercialProperties',
        {},
    ) as CommercialProperties;
};

// TODO really it would be nice if we passed just the data we needed and
// didn't have to do the transforms/lookups below. (While preserving the
// validation on types.)
export const extract = (data: {}): CAPIType => {
    const webPublicationDate = new Date(
        getNumber(data, 'page.webPublicationDate'),
    );
    const tags = getTags(data);
    const isImmersive = getBoolean(data, 'page.meta.isImmersive', false);
    const sectionName = getString(data, 'page.section', '');

    const leadContributor: TagType = tags.filter(
        tag => tag.type === 'Contributor',
    )[0];

    // From the server we get the values: "UK edition", "US edition", "Australia edition", "International edition"
    // editionLongForm is that value, or empty string.
    const editionLongForm = getString(data, 'page.edition', '');

    // Possible values for the editionId: "UK", "US", "AU", "INT"
    const editionId = getEditionValue(getString(data, 'page.editionId', ''));

    if (editionId === undefined) throw new Error('edition id is undefined');
    return {
        webPublicationDate,
        tags,
        sectionName,
        editionLongForm,
        editionId,
        isImmersive,
        webPublicationDateDisplay: getNonEmptyString(
            data,
            'page.webPublicationDateDisplay',
        ),
        headline: apply(
            getNonEmptyString(data, 'page.content.headline'),
            curly,
            clean,
        ),
        standfirst: apply(
            getString(data, 'page.content.standfirst', ''),
            clean,
        ),
        main: apply(getString(data, 'page.content.main', ''), clean),
        body: getArray<any>(data, 'page.content.blocks.body')
            .map(block => block.bodyHtml)
            .filter(Boolean)
            .join(''),
        author: {
            byline: getString(data, 'page.content.byline', ''),
            twitterHandle: leadContributor
                ? leadContributor.twitterHandle
                : undefined,
            email: 'none',
        },
        mainMediaElements: getArray<CAPIElement>(
            data,
            'page.content.blocks.main.elements',
            [],
        ),
        blocks: getArray<any>(data, 'page.content.blocks.body')
            .map(block => block.elements)
            .filter(Boolean),
        pageId: getNonEmptyString(data, 'page.pageId'),
        sharingUrls: getSharingUrls(data),
        pillar: findPillar(getString(data, 'page.pillar', '')) || 'news',
        ageWarning: getAgeWarning(tags, webPublicationDate),
        sectionLabel: getString(data, 'page.sectionLabel'),
        sectionUrl: getString(data, 'page.sectionUrl'),
        subMetaSectionLinks: getSubMetaSectionLinks(data),
        subMetaKeywordLinks: getSubMetaKeywordLinks(data),
        shouldHideAds: getBoolean(data, 'page.meta.shouldHideAds', false),
        webURL: getNonEmptyString(data, 'page.webURL'),
        guardianBaseURL: getNonEmptyString(data, 'site.guardianBaseURL'),
        contentType: getString(data, 'page.contentType'),
        hasRelated: getBoolean(data, 'page.meta.hasRelated', false),
        hasStoryPackage: getBoolean(data, 'page.meta.hasStoryPackage', false),
        beaconURL: getNonEmptyString(data, 'site.beaconUrl'),
        isCommentable: getBoolean(data, 'page.meta.isCommentable', false),
        commercialProperties: getCommercialProperties(data),
        starRating: optional(getNumber.bind(null, data, 'page.starRating')),
        trailText: apply(
            getString(data, 'page.content.trailText', ''),
            stripHTML,
        ),
    };
};
