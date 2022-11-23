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
	if (campaigns.length === 0) {
		return Optional.none();
	}

	const campaign = campaigns.find((campaign) => campaign.id === id);

	if (campaign?.fields.kind === 'callout') {
		return Optional.some(campaign.fields.callout);
	}

	return Optional.none();
};

const getReport = (
	campaigns: Campaign[],
): Optional<ArticleSpecial.SpecialReport | ArticleSpecial.SpecialReportAlt> => {
	const [campaign, ...tail] = campaigns;

	// If the array is empty, `campaign` will be `undefined`. The linter doesn't
	// know this without `noUncheckedIndexedAccess` turned on.
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- See above.
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
