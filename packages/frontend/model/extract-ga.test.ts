import { extract } from './extract-ga';
import { CAPI } from '@root/fixtures/CAPI';

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

    test('GA extractn returns and formats Commissioning Desk from data', () => {
        const testCAPI = { ...CAPI, ...{} };
        testCAPI.tags.find(
            o => o.title === 'UK Business' && (o.title = 'We ARE the Commish'),
        );

        expect(extract(testCAPI)).toEqual({
            ...base,
            ...{ commissioningDesks: 'wearethecommish' },
        });
    });

    // TODO (implement)
    // test('GA extract isHosted from data', () => {
    //     const testCAPI = { ...CAPI, ...{ isHosted: true } };

    //     expect(extract(testCAPI)).toEqual({ ...base, ...{ isHosted: 'true' } });
    // });
});
