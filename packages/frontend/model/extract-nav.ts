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

export const extract = (data: {}): NavType => {
    let pillars = getArray<any>(data, 'site.nav.pillars');

    pillars = pillars.map(link => getLink(link, { isPillar: true }));

    const subnav = get(data, 'site.nav.subNavSections');

    return {
        pillars,
        otherLinks: {
            url: '', // unused
            title: 'More',
            longTitle: 'More',
            more: true,
            children: getArray<object>(data, 'site.nav.otherLinks', []).map(
                l => getLink(l, { isPillar: false }),
            ),
        },
        brandExtensions: getArray<object>(
            data,
            'site.nav.brandExtensions',
            [],
        ).map(l => getLink(l, { isPillar: false })),
        currentNavLink: getString(data, 'site.nav.currentNavLink.title', ''),
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
        readerRevenueLinks: {
            header: {
                contribute: getString(
                    data,
                    'site.readerRevenueLinks.header.contribute',
                    '',
                ),
                subscribe: getString(
                    data,
                    'site.readerRevenueLinks.header.subscribe',
                    '',
                ),
                support: getString(
                    data,
                    'site.readerRevenueLinks.header.support',
                    '',
                ),
            },
            footer: {
                contribute: getString(
                    data,
                    'site.readerRevenueLinks.footer.contribute',
                    '',
                ),
                subscribe: getString(
                    data,
                    'site.readerRevenueLinks.footer.subscribe',
                    '',
                ),
                support: getString(
                    data,
                    'site.readerRevenueLinks.footer.support',
                    '',
                ),
            },
            sideMenu: {
                contribute: getString(
                    data,
                    'site.readerRevenueLinks.sideMenu.contribute',
                    '',
                ),
                subscribe: getString(
                    data,
                    'site.readerRevenueLinks.sideMenu.subscribe',
                    '',
                ),
                support: getString(
                    data,
                    'site.readerRevenueLinks.sideMenu.support',
                    '',
                ),
            },
        },
    };
};
