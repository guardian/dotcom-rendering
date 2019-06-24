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

import { findPillar } from './find-pillar';

// we should not bring down the website if a trackable field is missing!
export const extract = (data: any): GADataType => {
    const edition = data.page.edition.toLowerCase();

    return {
        webTitle: data.page.webTitle,
        pillar: findPillar(data.page.pillar) || 'news',
        section: data.page.section,
        contentType: data.page.contentType
            .toLowerCase()
            .split(' ')
            .join(''),
        commissioningDesks: data.page.tags.commissioningDesks,
        contentId: data.page.contentId,
        authorIds: data.page.tags.authorIds,
        keywordIds: data.page.tags.keywordIds,
        toneIds: data.page.tags.toneIds,
        seriesId: data.page.seriesId,
        isHosted: data.page.meta.isHosted.toString(),
        edition: edition === 'int' ? 'international' : edition,
        beaconUrl: data.site.beaconUrl,
    };
};
