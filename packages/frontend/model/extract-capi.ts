import { string as curly } from 'curlyquotes';
import {
    getString,
    getNumber,
    getNonEmptyString,
    getBoolean,
    getArray,
} from './validators';
import { clean } from './clean';
import { getSharingUrls } from './sharing-urls';
import { findPillar } from './find-pillar';

const bigBullets = (s: string) =>
    s.replace(/•/g, '<span class="bullet">&bull;</span>');

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
};

const getSubMetaSectionLinks: (data: {}) => SimpleLinkType[] = data => {
    const subMetaSectionLinks = getArray<any>(
        data,
        'config.page.subMetaLinks.sectionLabels',
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
        'config.page.subMetaLinks.keywords',
        [],
    );

    return subMetaKeywordLinks.map(({ link, text }) => ({
        url: link,
        title: text,
    }));
};

// TODO really it would be nice if we passed just the data we needed and
// didn't have to do the transforms/lookups below. (While preserving the
// validation on types.)
export const extract = (data: {}): CAPIType => {
    const webPublicationDate = new Date(
        getNumber(data, 'config.page.webPublicationDate'),
    );
    const tags = getTags(data);
    const isImmersive = getBoolean(data, 'config.page.isImmersive', false);
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
        mainMediaElements: getArray<CAPIElement>(
            data,
            'contentFields.fields.blocks.main.elements',
            [],
        ),
        elements: [].concat(
            ...getArray<any>(data, 'contentFields.fields.blocks.body')
                .map(block => block.elements)
                .filter(Boolean),
        ),
        pageId: getNonEmptyString(data, 'config.page.pageId'),
        sharingUrls: getSharingUrls(data),
        pillar: findPillar(getString(data, 'config.page.pillar', '')) || 'news',
        ageWarning: getAgeWarning(tags, webPublicationDate),
        sectionLabel: getString(data, 'config.page.sectionLabel'),
        sectionUrl: getString(data, 'config.page.sectionUrl'),
        subMetaSectionLinks: getSubMetaSectionLinks(data),
        subMetaKeywordLinks: getSubMetaKeywordLinks(data),
        shouldHideAds: getBoolean(data, 'config.page.shouldHideAds', false),
        webURL: getNonEmptyString(data, 'config.page.webURL'),
        guardianBaseURL: getNonEmptyString(data, 'config.page.guardianBaseURL'),
        contentType: getString(data, 'config.page.contentType'),
        hasRelated: getBoolean(data, 'config.page.hasRelated', false),
        hasStoryPackage: getBoolean(data, 'config.page.hasStoryPackage', false),
        beaconURL: getNonEmptyString(data, 'config.page.beaconUrl'),
        isCommentable: getBoolean(data, 'config.page.isCommentable', false),
    };
};
