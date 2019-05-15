import { getFileFromS3 } from '../aws/s3-store';
import { getSubnav } from './subnav';
import {
    getString,
    getArray,
    getNonEmptyString,
} from '@frontend/model/validators';
import { findPillar } from '@frontend/model/find-pillar';

const getPillarLink = (data: {}): PillarType => {
    const title = getNonEmptyString(data, 'title');
    const pillar = findPillar(title);

    if (pillar === undefined) {
        throw Error(`Could not find a pillar related to ${title}`);
    }

    return {
        title,
        pillar,
        longTitle: getNonEmptyString(data, 'longTitle', title),
        url: getString(data, 'url'),
        children: getArray<object>(data, 'children', []).map(
            l => getLink(l), // children are never pillars
        ),
        mobileOnly: false,
        more: false,
    };
};

const getLink = (data: {}): LinkType => {
    const title = getNonEmptyString(data, 'title');

    return {
        title,
        longTitle: getNonEmptyString(data, 'longTitle', title),
        url: getString(data, 'url'),
        pillar: undefined,
        children: getArray<object>(data, 'children', []).map(
            l => getLink(l), // children are never pillars
        ),
        mobileOnly: false,
    };
};

/* Everything below is a straight rewrite of Navigation.scala in frontend */

const makeNavLink = (title: string, url: string): LinkType => {
    return {
        url,
        title,
        longTitle: title,
        children: [],
    };
};

const makeNavRoot = (edition: string, navData: any): NavRoot => {
    const editionLinks = [edition].map(e => {
        switch (e) {
            case 'uk':
                return navData.uk;
            case 'us':
                return navData.us;
            case 'au':
                return navData.au;
            case 'international':
                return navData.international;
            default:
                throw Error('Unknown edition');
        }
    })[0];

    return {
        children: [
            editionLinks.newsPillar,
            editionLinks.opinionPillar,
            editionLinks.sportPillar,
            editionLinks.culturePillar,
            editionLinks.lifestylePillar,
        ],
        otherLinks: editionLinks.otherLinks,
        brandExtensions: editionLinks.brandExtensions,
    };
};

const find = (
    links: LinkType[],
    p: (a: LinkType) => boolean,
): LinkType | undefined => {
    if (links.length === 0) {
        return undefined;
    }

    const [head, ...tail] = links;
    return p(head) ? head : find(tail.concat(head.children), p);
};

const getChildrenFromOtherEditions = (
    edition: string,
    navData: any,
): LinkType[] => {
    return ['uk', 'au', 'us', 'international']
        .filter(e => e !== edition)
        .flatMap(e => navData[e].children)
        .concat(navData.otherLinks);
};

const findDescendantByUrl = (
    url: string,
    edition: string,
    pillars: LinkType[],
    otherLinks: LinkType[],
    navData: any,
): LinkType | undefined => {
    const hasUrl = (link: LinkType): boolean => link.url === url;
    const found = find(pillars.concat(otherLinks), hasUrl);
    return found
        ? found
        : find(getChildrenFromOtherEditions(edition, navData), hasUrl);
};

const findParent = (
    currentNavLink: LinkType,
    edition: string,
    pillars: LinkType[],
    otherLinks: LinkType[],
    navData: any,
): LinkType | undefined => {
    // Football is currently in the News Pillar and the Sport pillar, however we don't want the parent to be News.
    const isFootballInNews = (parentTitle: string): boolean =>
        currentNavLink.title === 'Football' && parentTitle === 'News';

    const isParent = (link: LinkType): boolean =>
        link === currentNavLink ||
        (link.children.includes(currentNavLink) &&
            !isFootballInNews(link.title));

    const found = find(pillars.concat(otherLinks), isParent);
    return found
        ? found
        : find(getChildrenFromOtherEditions(edition, navData), isParent);
};

const getPillar = (
    currentParent: LinkType | undefined,
    edition: string,
    pillars: LinkType[],
    otherLinks: LinkType[],
    navData: any,
): LinkType | undefined => {
    if (currentParent === undefined) {
        return undefined;
    }

    if (otherLinks.includes(currentParent)) {
        return undefined;
    }

    if (pillars.includes(currentParent)) {
        return currentParent;
    }

    const found = findParent(
        currentParent,
        edition,
        pillars,
        otherLinks,
        navData,
    );
    return found ? found : navData.uk.newsPillar;
};

const makeGuardianNavigation = (
    navData: any,
    edition: EditionLong,
    currentUrl: string,
    customSignPosting: NavItem | undefined,
    readerRevenuePositions: ReaderRevenuePositions,
): NavType => {
    const root = makeNavRoot(edition, navData);
    const pillars = getArray<any>(root, 'children').map(link =>
        getPillarLink(link),
    );

    const currentNavLink = findDescendantByUrl(
        currentUrl,
        edition,
        root.children,
        root.otherLinks,
        navData,
    );
    const currentParent = currentNavLink
        ? findParent(
              currentNavLink,
              edition,
              root.children,
              root.otherLinks,
              navData,
          )
        : undefined;
    const currentPillar = getPillar(
        currentParent,
        edition,
        root.children,
        root.otherLinks,
        navData,
    );
    const subNavSections = getSubnav(
        customSignPosting,
        currentNavLink,
        currentParent,
        currentPillar,
    );

    const otherLinks: MoreType = {
        url: '', // unused
        title: 'More',
        longTitle: 'More',
        more: true,
        children: getArray<object>(root, 'otherLinks', []).map(l => getLink(l)),
    };

    const brandExtensions = root.brandExtensions.map(b => getLink(b));

    return {
        currentUrl,
        pillars,
        otherLinks,
        brandExtensions,
        subNavSections,
        currentNavLink:
            currentNavLink !== undefined ? currentNavLink.title : '',
        readerRevenueLinks: readerRevenuePositions,
    };
};

const getNavigationData = async (stage: string) => {
    const data = await getFileFromS3(`${stage}/navigation.json`);
    return JSON.parse(data);
};

export { makeNavLink, getNavigationData, makeGuardianNavigation };
