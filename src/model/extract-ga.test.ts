import { CAPI } from '@root/fixtures/CAPI';
import { extract } from './extract-ga';

const base = {
    authorIds: 'profile/rob-davies',
    beaconUrl: '//fake.url',
    commissioningDesks: 'ukbusiness',
    contentId:
        'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
    contentType: 'article',
    edition: 'uk',
    isHosted: 'false',
    keywordIds:
        'money/ticket-prices,money/consumer-affairs,money/money,technology/internet,money/viagogo',
    pillar: 'lifestyle',
    section: 'money',
    seriesId: 'testseries',
    toneIds: 'tone/news',
    webTitle: 'Foobar',
};

describe('Google Analytics extracts and formats CAPI response correctly', () => {
    test('GA Extract returns correctly formatted GA response', () => {
        expect(extract(CAPI)).toEqual(base);
    });
});
