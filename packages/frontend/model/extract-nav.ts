import get from 'lodash.get';
import { getString, getArray } from './validators';
import { findPillar } from './find-pillar';

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

const rrLinkConfig = 'config.readerRevenueLinks';
const buildRRLinkCategories = (
    data: {},
    position: ReaderRevenuePosition,
): ReaderRevenueCategories => ({
    subscribe: getString(data, `${rrLinkConfig}.${position}.subscribe`, ''),
    support: getString(data, `${rrLinkConfig}.${position}.support`, ''),
    contribute: getString(data, `${rrLinkConfig}.${position}.contribute`, ''),
});

const buildRRLinkModel = (data: {}): ReaderRevenueLinks => ({
    header: buildRRLinkCategories(data, 'header'),
    footer: buildRRLinkCategories(data, 'footer'),
    sideMenu: buildRRLinkCategories(data, 'sideMenu'),
    ampHeader: buildRRLinkCategories(data, 'ampHeader'),
    ampFooter: buildRRLinkCategories(data, 'ampFooter'),
});

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
        readerRevenueLinks: buildRRLinkModel(data),
    };
};
