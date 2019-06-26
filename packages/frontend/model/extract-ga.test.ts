import cloneDeep from 'lodash.clonedeep';
import { findPillar as findPillar_ } from './find-pillar';
import { extract } from './extract-ga';
import { data } from '@root/fixtures/article';
import { validateRequestData } from '@root/packages/frontend/model/validate';

const findPillar: any = findPillar_;

jest.mock('./find-pillar', () => ({
    findPillar: jest.fn(),
}));

describe('extract-capi', () => {
    const validatedData = validateRequestData(data, '');
    let testData: any;

    beforeEach(() => {
        testData = cloneDeep(validatedData);
        findPillar.mockImplementation((_: string) => _);
    });

    afterEach(() => {
        findPillar.mockReset();
    });

    it('returns webTitle if available', () => {
        const testWebTitle = 'Waldo Jeffers had reached his limit';

        testData.page.webTitle = testWebTitle;

        const { webTitle } = extract(testData);

        expect(webTitle).toBe(testWebTitle);
    });

    it('returns pillar if available', () => {
        const testPillar = 'sport';

        testData.page.pillar = testPillar;

        findPillar.mockReturnValueOnce(testPillar);

        const { pillar } = extract(testData);

        expect(pillar).toBe(testPillar);
        expect(findPillar).toHaveBeenCalledWith(testPillar);
    });

    it('defaults pillar to "news" if not valid', () => {
        const testPillar = 'foo';

        testData.page.pillar = testPillar;

        findPillar.mockReturnValueOnce(undefined);

        const { pillar } = extract(testData);

        expect(pillar).toBe('news');
        expect(findPillar).toHaveBeenCalledWith(testPillar);
    });

    it('returns section if section available', () => {
        const testSection = 'money';

        testData.page.section = testSection;

        const { section } = extract(testData);

        expect(section).toBe(testSection);
    });

    it('returns formatted contentType if contentType available', () => {
        testData.page.contentType = 'Video Article';

        const { contentType } = extract(testData);

        expect(contentType).toBe('videoarticle');
    });

    it('returns commissioningDesks if commissioningDesks available', () => {
        const testCommissioningDesks = 'Observer New Review';

        testData.page.tags.commissioningDesks = testCommissioningDesks;

        const { commissioningDesks } = extract(testData);

        expect(commissioningDesks).toBe(testCommissioningDesks);
    });

    it('returns contentId if contentId available', () => {
        const testContentId = 'waldo-jeffers/has-reached-his-limit';

        testData.page.contentId = testContentId;

        const { contentId } = extract(testData);

        expect(contentId).toBe(testContentId);
    });

    it('returns authorIds if authorIds available', () => {
        const testAuthorIds = 'profile/waldo-jeffers';

        testData.page.tags.authorIds = testAuthorIds;

        const { authorIds } = extract(testData);

        expect(authorIds).toBe(testAuthorIds);
    });

    it('returns keywordIds if keywordIds available', () => {
        const testKeywordIds = 'waldo-jeffers,marsha-bronson';

        testData.page.tags.keywordIds = testKeywordIds;

        const { keywordIds } = extract(testData);

        expect(keywordIds).toBe(testKeywordIds);
    });

    it('returns toneIds if toneIds available', () => {
        const testToneIds = 'waldo-jeffers,marsha-bronson';

        testData.page.tags.toneIds = testToneIds;

        const { toneIds } = extract(testData);

        expect(toneIds).toBe(testToneIds);
    });

    it('returns seriesId if seriesId available', () => {
        const testSeriesId = 'waldo-jeffers';

        testData.page.seriesId = testSeriesId;

        const { seriesId } = extract(testData);

        expect(seriesId).toBe(testSeriesId);
    });

    it('returns isHosted as string if isHosted available', () => {
        testData.page.meta.isHosted = true;

        const { isHosted } = extract(testData);

        expect(isHosted).toBe('true');
    });

    it('returns edition if edition available', () => {
        testData.page.edition = 'UK';

        const { edition } = extract(testData);

        expect(edition).toBe('uk');
    });

    it('returns edition as "international" if edition is "int"', () => {
        testData.page.edition = 'int';

        const { edition } = extract(testData);

        expect(edition).toBe('international');
    });

    it('returns beaconUrl if beaconUrl available', () => {
        const testBeaconUrl = 'waldo-jeffers';

        testData.site.beaconUrl = testBeaconUrl;

        const { beaconUrl } = extract(testData);

        expect(beaconUrl).toBe(testBeaconUrl);
    });
});
