// ----- Imports ----- //

import { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import { CampaignFields } from '@guardian/apps-rendering-api-models/campaignFields';
import { ParticipationFields } from '@guardian/apps-rendering-api-models/participationFields';
import { ArticleSpecial } from '@guardian/libs';
import { getCallout, getReport } from 'campaign';

// ----- Functions ----- //

const campaignFromFields = (fields: CampaignFields): Campaign => ({
    id: 'mockId',
    name: 'mockName',
    priority: 1,
    displayOnSensitive: true,
    fields,
});

const mockCalloutFields: ParticipationFields = {
    callout: 'mockCallout',
    formId: 1,
    tagName: 'mockTagName',
    formFields: [],
};

const mockCallout = campaignFromFields({
    kind: 'callout',
    callout: mockCalloutFields,
});

const mockEpic = campaignFromFields({
    kind: 'epic',
    epic: { campaignId: 'mockId' },
});

const mockReport = (campaignId: string) => campaignFromFields({
    kind: 'report',
    report: { campaignId },
});

// ----- Tests ----- //

describe('getCallout', () => {
    it('retrieves a callout if present', () => {
        const campaigns: Campaign[] = [mockCallout];

        const callout =
            getCallout(mockCalloutFields.tagName, campaigns).withDefault('none');
        expect(callout).toBe(mockCalloutFields);
    });

    it('does not retrieve a callout if not present', () => {
        const emptyCampaigns: Campaign[] = [];
        const campaigns: Campaign[] = [mockCallout, mockEpic];

        const resultOne =
            getCallout('mockTagName', emptyCampaigns).withDefault('none');
        const resultTwo =
            getCallout('differentTagName', campaigns).withDefault('none');

        expect(resultOne).toBe('none');
        expect(resultTwo).toBe('none');
    });
});

describe('getReport', () => {
    it('retrieves a special report if present', () => {
        const campaigns: Campaign[] = [mockReport('mockId')];
        const report = getReport(campaigns).withDefault('none');

        expect(report).toBe(ArticleSpecial.SpecialReport);
    });

    it('retrieves a special report alt if present', () => {
        const campaigns: Campaign[] = [mockReport('SpecialReportAlt')];
        const report = getReport(campaigns).withDefault('none');

        expect(report).toBe(ArticleSpecial.SpecialReportAlt);
    });

    it('does not retrieve a special report if not present', () => {
        const emptyCampaigns: Campaign[] = [];
        const campaigns: Campaign[] = [mockEpic];

        const resultOne = getReport(emptyCampaigns).withDefault('none');
        const resultTwo = getReport(campaigns).withDefault('none');

        expect(resultOne).toBe('none');
        expect(resultTwo).toBe('none');
    });
});
