import get from 'lodash.get';
import { getString, getArray } from './validators';
import { findPillar } from './find-pillar';

// Reader revenue link name
const readerRevenueConfig = {
    rrElements: ['header', 'footer', 'sideMenu', 'ampHeader', 'ampFooter'],
    rrCategories: ['contribute', 'subscribe', 'support'],
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

const buildRRLinkCategories = (
    data: {},
    el: string,
    rrCategories: string[],
): ReaderRevenueLink =>
    rrCategories.reduce(
        (prevObj: ReaderRevenueLink, category: string) => ({
            ...prevObj,
            [category]: getString(
                data,
                `config.readerRevenueLinks.${el}.${category}`,
                '',
            ),
        }),
        {} as ReaderRevenueLink,
    );

const buildRRLinkModel = (
    data: {},
    rrELementNames: string[],
    rrCategoryNames: string[],
): ReaderRevenueLinks =>
    rrELementNames.reduce(
        (prevObj: ReaderRevenueLinks, el: string) => ({
            ...prevObj,
            [el]: buildRRLinkCategories(data, el, rrCategoryNames),
        }),
        {} as ReaderRevenueLinks,
    );

const buildReaderRevenueLinks = (data: {}) =>
    buildRRLinkModel(
        data,
        readerRevenueConfig.rrElements,
        readerRevenueConfig.rrCategories,
    );

export const extract = (data: {}): NavType => {
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
        readerRevenueLinks: buildReaderRevenueLinks(data),
    };
};
