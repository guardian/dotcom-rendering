import { escapeData } from '../../../lib/escapeData';
import { extractGA } from '../../../model/extract-ga';
import type { BasePageModel } from '../../../model/pageModel';
import { makeWindowGuardian } from '../../../model/window-guardian';

export const buildWindowGuardian = (model: BasePageModel): string => {
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
				isPaidContent: model.isPaidContent,
				contentType: model.contentType,
				shouldHideReaderRevenue: model.shouldHideReaderRevenue,
				GAData: extractGA({
					webTitle: model.webTitle,
					format: model.format ?? {
						design: 'ArticleDesign',
						theme: 'NewsPillar',
						display: 'StandardDisplay',
					},
					sectionName: model.sectionName,
					contentType: model.contentType,
					tags: model.tags ?? [],
					pageId: model.pageId,
					editionId,
					beaconURL: model.beaconURL,
				}),
				unknownConfig: config,
			}),
		),
	);

	return windowGuardian;
};
