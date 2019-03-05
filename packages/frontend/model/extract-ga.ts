export interface GADataType {
    pillar: string;
    webTitle: string;
    section: string;
    contentType: string;
    commissioningDesks: string;
    contentId: string;
    authorIds: string;
    keywordIds: string;
    toneIds: string;
    seriesId: string;
    isHosted: string;
    edition: string;
    beaconUrl: string;
}

// All GA fields should  fall back to default values -
import { getString, getBoolean } from './validators';
import { findPillar } from './find-pillar';

// we should not bring down the website if a trackable field is missing!
export const extract = (data: {}): GADataType => {
    const edition = getString(data, 'page.edition', '').toLowerCase();

    return {
        webTitle: getString(data, 'page.webTitle', ''),
        pillar: findPillar(getString(data, 'page.pillar', '')) || 'news',
        section: getString(data, 'page.section', ''),
        contentType: getString(data, 'page.contentType', '')
            .toLowerCase()
            .split(' ')
            .join(''),
        commissioningDesks: getString(data, 'page.commissioningDesks', ''),
        contentId: getString(data, 'page.contentId', ''),
        authorIds: getString(data, 'page.authorIds', ''),
        keywordIds: getString(data, 'page.keywordIds', ''),
        toneIds: getString(data, 'page.toneIds', ''),
        seriesId: getString(data, 'page.seriesId', ''),
        isHosted: getBoolean(data, 'page.meta.isHosted', false).toString(),
        edition: edition === 'int' ? 'international' : edition,
        beaconUrl: getString(data, 'site.beaconUrl', ''),
    };
};
