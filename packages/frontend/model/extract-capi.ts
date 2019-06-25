import { clean } from './clean';
import { stripHTML } from './strip-html';
import { string as curly } from 'curlyquotes';

import { getSharingUrls } from './sharing-urls';
import { findPillar } from './find-pillar';
import { findBySubsection } from './article-sections';

// tslint:disable:prefer-array-literal

const apply = (input: string, ...fns: Array<(_: string) => string>): string => {
    return fns.reduce((acc, fn) => fn(acc), input);
};

const getEditionValue: (name: string) => Edition = name => {
    const editions: Edition[] = ['UK', 'US', 'INT', 'AU'];
    const edition = editions.find(_ => _ === name);
    return edition === undefined ? 'UK' : edition;
};

const getTags: (tags: any) => TagType[] = tags => {
    return tags.map((tag: any) => {
        return {
            id: tag.properties.id,
            type: tag.properties.tagType,
            title: tag.properties.webTitle,
            twitterHandle: tag.properties.twitterHandle,
            bylineImageUrl: tag.properties.bylineImageUrl,
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

const getSubMetaSectionLinks: (
    data: { page: any },
) => SimpleLinkType[] = data => {
    const subMetaSectionLinks = data.page.subMetaLinks.sectionLabels;

    return subMetaSectionLinks.map(
        ({ link, text }: { link: string; text: string }) => ({
            url: link,
            title: text,
        }),
    );
};

const getSubMetaKeywordLinks: (data: any) => SimpleLinkType[] = data => {
    const subMetaKeywordLinks = data.page.subMetaLinks.keywords;

    return subMetaKeywordLinks.map(
        ({ link, text }: { link: string; text: string }) => ({
            url: link,
            title: text,
        }),
    );
};

const getCommercialProperties = (data: any): CommercialProperties => {
    return data.page.commercial
        .editionCommercialProperties as CommercialProperties;
};

const getNielsenAPIID = (subsection: string): string => {
    return findBySubsection(subsection).apiID;
};

// TODO really it would be nice if we passed just the data we needed and
// didn't have to do the transforms/lookups below. (While preserving the
// validation on types.)
export const extract = (data: any): CAPIType => {
    const webPublicationDate = new Date(data.page.webPublicationDate);
    const tags = getTags(data.page.tags.all);
    const leadContributor: TagType = tags.filter(
        tag => tag.type === 'Contributor',
    )[0];
    const sectionName = data.page.section;

    // From the server we get the values: "UK edition", "US edition", "Australia edition", "International edition"
    // editionLongForm is that value, or empty string.
    const editionLongForm = data.page.edition;

    // Possible values for the editionId: "UK", "US", "AU", "INT"
    const editionId = getEditionValue(data.page.editionId);

    if (editionId === undefined) {
        throw new Error('edition id is undefined');
    }

    return {
        // page
        tags,
        editionLongForm,
        editionId,
        sectionName,
        webPublicationDate,
        webPublicationDateDisplay: data.page.webPublicationDateDisplay,
        pageId: data.page.pageId,
        sharingUrls: getSharingUrls(data),
        pillar: findPillar(data.page.pillar, tags) || 'news',
        ageWarning: getAgeWarning(tags, webPublicationDate),
        sectionLabel: data.page.sectionLabel,
        sectionUrl: data.page.sectionUrl,
        webURL: data.page.webURL,
        contentType: data.page.contentType,
        nielsenAPIID: getNielsenAPIID(sectionName),
        pagination: data.page.pagination
            ? (data.page.pagination as Pagination)
            : undefined, // scala option
        starRating: data.page.starRating ? data.page.starRating : undefined,

        // page.content
        headline: apply(data.page.content.headline, curly, clean),
        standfirst: apply(data.page.content.standfirst, clean),
        main: apply(data.page.content.main, clean),
        body: data.page.content.blocks.body
            .map((block: any) => block.bodyHtml)
            .filter(Boolean)
            .join(''),
        author: {
            byline: data.page.content.byline,
            twitterHandle: leadContributor
                ? leadContributor.twitterHandle
                : undefined,
            email: 'none',
        },
        mainMediaElements: data.page.content.blocks.main.elements,
        keyEvents: data.page.content.blocks.keyEvents.filter(Boolean),
        blocks: data.page.content.blocks.body.filter(Boolean),
        trailText: apply(data.page.content.trailText, stripHTML),
        // page.subMetaLinks
        subMetaSectionLinks: getSubMetaSectionLinks(data),
        subMetaKeywordLinks: getSubMetaKeywordLinks(data),
        // page.commercial
        commercialProperties: getCommercialProperties(data),
        // page.meta
        isImmersive: data.page.meta.isImmersive,
        shouldHideAds: data.page.meta.shouldHideAds,
        hasRelated: data.page.meta.hasRelated,
        hasStoryPackage: data.page.meta.hasStoryPackage,
        isCommentable: data.page.meta.isCommentable,
        // site
        guardianBaseURL: data.site.guardianBaseURL,
        beaconURL: data.site.beaconUrl,
    };
};
