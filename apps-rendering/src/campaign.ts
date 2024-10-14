// ----- Imports ----- //

import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { ParticipationFields } from '@guardian/apps-rendering-api-models/participationFields';
import { ArticleSpecial } from 'articleFormat';
import { Optional } from 'optional';

export type CalloutFields = {
	callout: ParticipationFields;
	name: string;
	activeUntil?: number;
};

// ----- Functions ----- //
const getCallout = (
	id: string,
	campaigns: Campaign[],
): Optional<CalloutFields> => {
	if (campaigns.length === 0) {
		return Optional.none();
	}

	const campaign = campaigns.find((campaign) => campaign.id === id);

	if (campaign?.fields.kind === 'callout') {
		return Optional.some({
			callout: campaign.fields.callout,
			name: campaign.name,
			...(campaign.activeUntil && {
				activeUntil: campaign.activeUntil.toNumber(),
			}),
		});
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
