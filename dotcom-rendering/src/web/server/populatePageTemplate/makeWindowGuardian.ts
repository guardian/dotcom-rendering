import { escapeData } from '../../../lib/escapeData';
import { extractGA } from '../../../model/extract-ga';
import { makeWindowGuardian } from '../../../model/window-guardian';
import type { NewslettersPageModel } from '../../../types/NewslettersPageModel';

export const buildWindowGuardian = (model: NewslettersPageModel): string => {
	const { config, editionId } = model;

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const windowGuardian = escapeData(
		JSON.stringify(
			makeWindowGuardian({
				editionId,
				stage: config.stage,
				frontendAssetsFullURL: config.frontendAssetsFullURL,
				revisionNumber: config.revisionNumber,
				sentryPublicApiKey: config.sentryPublicApiKey,
				sentryHost: config.sentryHost,
				keywordIds: config.keywordIds,
				dfpAccountId: config.dfpAccountId,
				adUnit: config.adUnit,
				ajaxUrl: config.ajaxUrl,
				googletagUrl: config.googletagUrl,
				switches: config.switches,
				abTests: config.abTests,
				brazeApiKey: config.brazeApiKey,
				isPaidContent: config.isPaidContent,
				contentType: config.contentType,
				shouldHideReaderRevenue: config.shouldHideReaderRevenue,
				GAData: extractGA({
					webTitle: model.webTitle,
					format: model.format ?? {
						design: 'ArticleDesign',
						theme: 'NewsPillar',
						display: 'StandardDisplay',
					},
					sectionName: model.sectionName,
					contentType: config.contentType,
					tags: model.tags ?? [],
					pageId: config.pageId,
					editionId,
					beaconURL: model.beaconURL,
				}),
				unknownConfig: config,
			}),
		),
	);

	return windowGuardian;
};
