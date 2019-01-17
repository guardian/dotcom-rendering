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
    const edition = getString(data, 'content.edition', '').toLowerCase();

    return {
        webTitle: getString(data, 'content.webTitle', ''),
        pillar: findPillar(getString(data, 'content.pillar', '')) || 'news',
        section: getString(data, 'content.section', ''),
        contentType: getString(data, 'content.contentType', '')
            .toLowerCase()
            .split(' ')
            .join(''),
        commissioningDesks: getString(
            data,
            'content.commissioningDesks',
            '',
        ),
        contentId: getString(data, 'content.contentId', ''),
        authorIds: getString(data, 'content.authorIds', ''),
        keywordIds: getString(data, 'content.keywordIds', ''),
        toneIds: getString(data, 'content.toneIds', ''),
        seriesId: getString(data, 'content.seriesId', ''),
        isHosted: getBoolean(data, 'content.meta.isHosted', false).toString(),
        edition: edition === 'int' ? 'international' : edition,
        beaconUrl: getString(data, 'config.beaconUrl', ''),
    };
};
