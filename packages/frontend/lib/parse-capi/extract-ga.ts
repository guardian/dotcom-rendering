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
    const edition = getString(data, 'config.page.edition', '').toLowerCase();

    return {
        webTitle: getString(data, 'config.page.webTitle', ''),
        pillar: findPillar(getString(data, 'config.page.pillar', '')) || 'news',
        section: getString(data, 'config.page.section', ''),
        contentType: getString(data, 'config.page.contentType', '')
            .toLowerCase()
            .split(' ')
            .join(''),
        commissioningDesks: getString(
            data,
            'config.page.commissioningDesks',
            '',
        ),
        contentId: getString(data, 'config.page.contentId', ''),
        authorIds: getString(data, 'config.page.authorIds', ''),
        keywordIds: getString(data, 'config.page.keywordIds', ''),
        toneIds: getString(data, 'config.page.toneIds', ''),
        seriesId: getString(data, 'config.page.seriesId', ''),
        isHosted: getBoolean(data, 'config.page.isHosted', false).toString(),
        edition: edition === 'int' ? 'international' : edition,
        beaconUrl: getString(data, 'config.page.beaconUrl', ''),
    };
};
