// ----- Imports ----- //

import { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import { ParticipationFields } from '@guardian/apps-rendering-api-models/participationFields';
import { ArticleSpecial } from '@guardian/libs';
import { Optional } from 'optional';
import { Result } from 'result';

// ----- Functions ----- //

const getCallout = (id: string, campaigns: Campaign[]): Result<string, ParticipationFields> => {
	const [campaign, ...tail] = campaigns;

	if (campaign === undefined) {
		return Result.err('This callout has no matching campaign');
	}

	if (campaign.fields.kind === 'callout' && campaign.fields.callout.tagName === id) {
		return Result.ok(campaign.fields.callout);
	}

	return getCallout(id, tail);
}

const getReport = (campaigns: Campaign[]): Optional<ArticleSpecial.SpecialReport | ArticleSpecial.SpecialReportAlt> => {
	const [campaign, ...tail] = campaigns;

	if (campaign === undefined) {
		return Optional.none();
	}

	if (campaign.fields.kind === 'report') {
		return Optional.some(campaign.fields.report.campaignId === 'SpecialReportAlt' ? ArticleSpecial.SpecialReportAlt : ArticleSpecial.SpecialReport);
	}

	return getReport(tail);
}

// ----- Exports ----- //

export {
	getCallout,
	getReport,
};
