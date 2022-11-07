// ----- Imports ----- //

import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ParticipationFields } from '@guardian/apps-rendering-api-models/participationFields';
import { ArticleSpecial } from '@guardian/libs';
import { Optional } from 'optional';

// ----- Functions ----- //

const getCallout = (
	id: string,
	campaigns: Campaign[],
): Optional<ParticipationFields> => {
	const [campaign, ...tail] = campaigns;

	if (campaign === undefined) {
		return Optional.none();
	}

	if (
		campaign.fields.kind === 'callout' &&
		campaign.fields.callout.tagName === id
	) {
		return Optional.some(campaign.fields.callout);
	}

	return getCallout(id, tail);
};

const getReport = (
	campaigns: Campaign[],
): Optional<ArticleSpecial.SpecialReport | ArticleSpecial.SpecialReportAlt> => {
	const [campaign, ...tail] = campaigns;

	if (campaign === undefined) {
		return Optional.none();
	}

	if (campaign.fields.kind === 'report') {
		return Optional.some(
			campaign.fields.report.campaignId === 'SpecialReportAlt'
				? ArticleSpecial.SpecialReportAlt
				: ArticleSpecial.SpecialReport,
		);
	}

	return getReport(tail);
};

// ----- Exports ----- //

export { getCallout, getReport };
