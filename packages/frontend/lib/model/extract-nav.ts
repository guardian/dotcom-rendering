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
