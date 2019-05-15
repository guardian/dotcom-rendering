import { getString } from './validators';

const rrLinkConfig = 'site.readerRevenueLinks';
const buildRRLinkCategories = (
    data: {},
    position: ReaderRevenuePosition,
): ReaderRevenueCategories => ({
    subscribe: getString(data, `${rrLinkConfig}.${position}.subscribe`, ''),
    support: getString(data, `${rrLinkConfig}.${position}.support`, ''),
    contribute: getString(data, `${rrLinkConfig}.${position}.contribute`, ''),
});

const buildRRLinkModel = (data: {}): ReaderRevenuePositions => ({
    header: buildRRLinkCategories(data, 'header'),
    footer: buildRRLinkCategories(data, 'footer'),
    sideMenu: buildRRLinkCategories(data, 'sideMenu'),
    ampHeader: buildRRLinkCategories(data, 'ampHeader'),
    ampFooter: buildRRLinkCategories(data, 'ampFooter'),
});

export const extract = (data: {}): CurrentNavigationPosition => {
    return {
        currentUrl: getString(data, 'site.nav.currentUrl', ''),
        readerRevenueLinks: buildRRLinkModel(data),
    };
};
