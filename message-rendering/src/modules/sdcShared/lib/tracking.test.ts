import {
    buildCampaignCode,
    addTrackingParams,
    addRegionIdAndTrackingParamsToSupportUrl,
} from './tracking';
import { factories } from '../factories/';

describe('addTrackingParams', () => {
    it('should return a correctly formatted URL', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            targetingAbTest: {
                testName: 'my-tracking-test',
                variantName: 'control',
            },
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl = 'https://support.theguardian.com/contribute/climate-pledge-2019';

        const numArticles = 88;

        const got = addTrackingParams(buttonBaseUrl, trackingData, numArticles);

        const want =
            'https://support.theguardian.com/contribute/climate-pledge-2019?REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%2C%7B%22name%22%3A%22my-tracking-test%22%2C%22variant%22%3A%22control%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%7D&numArticles=88';

        expect(got).toEqual(want);
    });
    it('should return a correctly formatted URL when the base URL already has a query string', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl =
            'https://support.theguardian.com/contribute/climate-pledge-2019?foo=bar';

        const numArticles = 88;

        const got = addTrackingParams(buttonBaseUrl, trackingData, numArticles);

        const want =
            'https://support.theguardian.com/contribute/climate-pledge-2019?foo=bar&REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%7D&numArticles=88';
        expect(got).toEqual(want);
    });
});

describe('addRegionIdAndTrackingParamsToSupportUrl', () => {
    it('should return the base URL for non support URLs', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl = 'https://theguardian.com/contribute/climate-pledge-2019';

        const got = addRegionIdAndTrackingParamsToSupportUrl(buttonBaseUrl, trackingData);

        const want = 'https://theguardian.com/contribute/climate-pledge-2019';
        expect(got).toEqual(want);
    });
    it('should return a correctly formatted URL for a support URL', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl = 'https://support.theguardian.com/contribute/climate-pledge-2019';
        const numArticles = 88;
        const countryCode = 'GB';

        const got = addRegionIdAndTrackingParamsToSupportUrl(
            buttonBaseUrl,
            trackingData,
            numArticles,
            countryCode,
        );

        const want =
            'https://support.theguardian.com/uk/contribute/climate-pledge-2019?REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%7D&numArticles=88';
        expect(got).toEqual(want);
    });
});

describe('buildCampaignCode', () => {
    it('returns the correct campaign code for the test and variant', () => {
        const test = factories.test.build({
            name: 'enviro_fossil_fuel_r2_Epic__no_article_count',
        });
        const variant = factories.variant.build({ name: 'Control' });

        const campaignCode = buildCampaignCode(test, variant);

        expect(campaignCode).toEqual(
            'gdnwb_copts_memco_enviro_fossil_fuel_r2_Epic__no_article_count_Control',
        );
    });
});
