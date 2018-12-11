import cloneDeep from 'lodash.clonedeep';
import { findPillar as findPillar_ } from './find-pillar';
import { extract } from './extract-ga';
import { data } from '@root/fixtures/article';

const findPillar: any = findPillar_;

jest.mock('./find-pillar', () => ({
    findPillar: jest.fn(),
}));

describe('extract-capi', () => {
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(data);
        findPillar.mockImplementation((_: string) => _);
    });

    afterEach(() => {
        findPillar.mockReset();
    });
    describe('extract', () => {
        it('returns webTitle if available', () => {
            const testWebTitle = 'Waldo Jeffers had reached his limit';

            testData.config.page.webTitle = testWebTitle;

            const { webTitle } = extract(testData);

            expect(webTitle).toBe(testWebTitle);
        });

        it('returns webTitle as empty string if missing', () => {
            testData.config.page.webTitle = null;

            const { webTitle } = extract(testData);

            expect(webTitle).toBe('');
        });

        it('returns pillar if available', () => {
            const testPillar = 'sport';

            testData.config.page.pillar = testPillar;

            findPillar.mockReturnValueOnce(testPillar);

            const { pillar } = extract(testData);

            expect(pillar).toBe(testPillar);
            expect(findPillar).toHaveBeenCalledWith(testPillar);
        });

        it('defaults pillar to "news" if not valid', () => {
            const testPillar = 'foo';

            testData.config.page.pillar = testPillar;

            findPillar.mockReturnValueOnce(undefined);

            const { pillar } = extract(testData);

            expect(pillar).toBe('news');
            expect(findPillar).toHaveBeenCalledWith(testPillar);
        });

        it('returns section if section available', () => {
            const testSection = 'money';

            testData.config.page.section = testSection;

            const { section } = extract(testData);

            expect(section).toBe(testSection);
        });

        it('returns section as empty string if missing', () => {
            testData.config.page.section = null;

            const { section } = extract(testData);

            expect(section).toBe('');
        });

        it('returns contentType if contentType available', () => {
            testData.config.page.contentType = 'Video Article';

            const { contentType } = extract(testData);

            expect(contentType).toBe('videoarticle');
        });

        it('returns contentType as empty string if missing', () => {
            testData.config.page.contentType = null;

            const { contentType } = extract(testData);

            expect(contentType).toBe('');
        });

        it('returns commissioningDesks if commissioningDesks available', () => {
            const testCommissioningDesks = 'Observer New Review';

            testData.config.page.commissioningDesks = testCommissioningDesks;

            const { commissioningDesks } = extract(testData);

            expect(commissioningDesks).toBe(testCommissioningDesks);
        });

        it('returns commissioningDesks as empty string if missing', () => {
            testData.config.page.commissioningDesks = null;

            const { commissioningDesks } = extract(testData);

            expect(commissioningDesks).toBe('');
        });

        it('returns contentId if contentId available', () => {
            const testContentId = 'waldo-jeffers/has-reached-his-limit';

            testData.config.page.contentId = testContentId;

            const { contentId } = extract(testData);

            expect(contentId).toBe(testContentId);
        });

        it('returns contentId as empty string if missing', () => {
            testData.config.page.contentId = null;

            const { contentId } = extract(testData);

            expect(contentId).toBe('');
        });

        it('returns authorIds if authorIds available', () => {
            const testAuthorIds = 'profile/waldo-jeffers';

            testData.config.page.authorIds = testAuthorIds;

            const { authorIds } = extract(testData);

            expect(authorIds).toBe(testAuthorIds);
        });

        it('returns authorIds as empty string if missing', () => {
            testData.config.page.authorIds = null;

            const { authorIds } = extract(testData);

            expect(authorIds).toBe('');
        });

        it('returns keywordIds if keywordIds available', () => {
            const testKeywordIds = 'waldo-jeffers,marsha-bronson';

            testData.config.page.keywordIds = testKeywordIds;

            const { keywordIds } = extract(testData);

            expect(keywordIds).toBe(testKeywordIds);
        });

        it('returns keywordIds as empty string if missing', () => {
            testData.config.page.keywordIds = null;

            const { keywordIds } = extract(testData);

            expect(keywordIds).toBe('');
        });

        it('returns toneIds if toneIds available', () => {
            const testToneIds = 'waldo-jeffers,marsha-bronson';

            testData.config.page.toneIds = testToneIds;

            const { toneIds } = extract(testData);

            expect(toneIds).toBe(testToneIds);
        });

        it('returns toneIds as empty string if missing', () => {
            testData.config.page.toneIds = null;

            const { toneIds } = extract(testData);

            expect(toneIds).toBe('');
        });

        it('returns seriesId if seriesId available', () => {
            const testSeriesId = 'waldo-jeffers';

            testData.config.page.seriesId = testSeriesId;

            const { seriesId } = extract(testData);

            expect(seriesId).toBe(testSeriesId);
        });

        it('returns seriesId as empty string if missing', () => {
            testData.config.page.seriesId = null;

            const { seriesId } = extract(testData);

            expect(seriesId).toBe('');
        });

        it('returns isHosted if isHosted available', () => {
            testData.config.page.isHosted = true;

            const { isHosted } = extract(testData);

            expect(isHosted).toBe('true');
        });

        it('returns isHosted as "false" if missing', () => {
            testData.config.page.isHosted = null;

            const { isHosted } = extract(testData);

            expect(isHosted).toBe('false');
        });

        it('returns edition if edition available', () => {
            testData.config.page.edition = 'UK';

            const { edition } = extract(testData);

            expect(edition).toBe('uk');
        });

        it('returns edition as "international" if edition is "int"', () => {
            testData.config.page.edition = 'int';

            const { edition } = extract(testData);

            expect(edition).toBe('international');
        });

        it('returns edition as empty string if edition is missing', () => {
            testData.config.page.edition = null;

            const { edition } = extract(testData);

            expect(edition).toBe('');
        });

        it('returns beaconUrl if beaconUrl available', () => {
            const testBeaconUrl = 'waldo-jeffers';

            testData.config.page.beaconUrl = testBeaconUrl;

            const { beaconUrl } = extract(testData);

            expect(beaconUrl).toBe(testBeaconUrl);
        });

        it('returns beaconUrl as empty string if missing', () => {
            testData.config.page.beaconUrl = null;

            const { beaconUrl } = extract(testData);

            expect(beaconUrl).toBe('');
        });
    });
});
