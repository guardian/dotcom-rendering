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

const sectionsAPIs: SectionAPIID[] = [
    {
        section: 'Guardian',
        apiID: '879C1E1-7EF9-459B-9C5C-6F4D2BC9DD53',
        subsections: []
    },
    {
        section: 'Books',
        apiID: '4994D04B-4279-4184-A2C5-E8BB1DD50AB9',
        subsections: ['books', 'childrens-books-site']
    },
    {
        section: 'Business',
        apiID: '2879C1E1-7EF9-459B-9C5C-6F4D2BC9DD53',
        subsections: ['business', 'better-business', 'business-to-business', 'working-in-development']
    },
    {
        section: 'CommentIsFree',
        apiID: 'C962A2C3-C9E1-40DD-9B58-7B1095EDB16E',
        subsections: ['commentisfree']
    },
    {
        section: 'Culture',
        apiID: '87C0725C-D478-4567-967B-E3519ECD12E8',
        subsections: ['culture', 'artanddesign', 'culture-network', 'culture-professionals-network', 'games', 'stage']
    },{
        section: 'Education',
        apiID: 'DD50B111-D493-4D25-8980-2B0752E16ED1',
        subsections: ['education', 'higher-education-network', 'teacher-network']
    },
    {
        section: 'Environment',
        apiID: 'FEC0766C-C766-4A77-91B3-74C5525E680F',
        subsections: ['environment', 'animals-farmed']
    },
    {
        section: 'Fashion',
        apiID: '1639B19E-B581-491E-94B7-FBACB6823C43',
        subsections: ['fashion']
    },
    {
        section: 'Film',
        apiID: 'D5BB97FE-637C-4E9E-B972-C8EA88101CB7',
        subsections: ['film']
    },
    {
        section: 'LifeStyle',
        apiID: 'B32533F9-65CF-4261-8BB9-2A707F59712A',
        subsections: ['lifeandstyle']
    },
    {
        section: 'Media',
        apiID: '385AA13F-9B64-4927-9536-BE70F9AD54BD',
        subsections: ['media']
    },
    {
        section: 'Money',
        apiID: '10BE8096-BF69-4252-AC27-C4127D8631F6',
        subsections: ['money']
    },
    {
        section: 'Music',
        apiID: '9D928193-7B5C-45A9-89E4-C47F42B8FB73',
        subsections: ['music']
    },
    {
        section: 'News',
        apiID: '66BEC53C-9890-477C-B639-60879EC4F762',
        subsections: ['news', 'australia-news', 'cardiff', 'cities', 'community', 'edinburgh', 'global-development', 'government-computing-network', 'law', 'leeds', 'local', 'local-government-network', 'media', 'media-network', 'uk-news', 'us-news', 'weather', 'world']
    },
    {
        section: 'Politics',
        apiID: 'C5C73A36-9E39-4D42-9049-2528DB5E998D',
        subsections: ['politics']
    },
    {
        section: 'ProfessionalNetwork',
        apiID: '9DFEFF7E-9D45-4676-82B3-F29A6BF05BE1',
        subsections: ['guardian-professional', 'global-development-professionals-network', 'small-business-network']
    },
    {
        section: 'Science',
        apiID: 'F4867E05-4149-49F0-A9DE-9F3496930B8C',
        subsections: ['science']
    },
    {
        section: 'Society',
        apiID: '617F9FB9-2D34-4C3A-A2E7-383AE877A35D',
        subsections: ['society', 'healthcare-network', 'housing-network', 'inequality', 'public-leaders-network', 'social-care-network', 'social-enterprise-network', 'society-professionals', 'women-in-leadership']
    },
    {
        section: 'Sport',
        apiID: '52A6516F-E323-449F-AA57-6A1B2386F8F6',
        subsections: ['sport', 'football']
    },
    {
        section: 'Technology',
        apiID: '4F448B55-305F-4203-B192-8534CB606C12',
        subsections: ['technology']
    },
    {
        section: 'Travel',
        apiID: '05A03097-D4CA-46BF-96AD-935252967239',
        subsections: ['travel', 'travel/offers']
    },
    {
        section: 'TvRadio',
        apiID: '3277F0D0-9389-4A32-A4D6-516B49D87E45',
        subsections: ['tv-and-radio']
    }];

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

const getPagination = (data: {}): Pagination | undefined => {
    const found = optional(getObject.bind(null, data, 'page.pagination'));

    if (found) {
        return found as Pagination;
    }

    return undefined;
};

const getNielsenAPIID = (subsection: string): string => {
    const APIID = sectionsAPIs.find(section => section.subsections.some(_ => _ === subsection));
    if (APIID) {
        return APIID.apiID;
    }

    return "";
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
        keyEvents: getArray<any>(data, 'page.content.blocks.keyEvents').filter(
            Boolean,
        ),
        pagination: getPagination(data),
        blocks: getArray<any>(data, 'page.content.blocks.body').filter(Boolean),
        pageId: getNonEmptyString(data, 'page.pageId'),
        sharingUrls: getSharingUrls(data),
        pillar: findPillar(getString(data, 'page.pillar', ''), tags) || 'news',
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
        nielsenAPIID: getNielsenAPIID(sectionName)
    };
};
