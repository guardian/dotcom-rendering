import { isString } from '@guardian/libs';
import { EditionsCrosswordPage } from '../components/EditionsCrosswordPage';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { createGuardian as createWindowGuardian } from '../model/guardian';
import type { Article } from '../types/article';
import type { Config } from '../types/configContext';
import { htmlCrosswordPageTemplate } from './htmlCrosswordPageTemplate';

interface Props {
	article: Article;
}

export const renderCrosswordHtml = ({
	article,
}: Props): { html: string; prefetchScripts: string[] } => {
	const { frontendData } = article;

	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
		darkModeAvailable:
			frontendData.config.abTests.darkModeWebVariant === 'variant',
		assetOrigin: ASSET_ORIGIN,
		editionId: frontendData.editionId,
	};

	const { html } = renderToStringWithEmotion(
		<EditionsCrosswordPage article={article} />,
	);

	const prefetchScripts = [
		getPathFromManifest('client.editionsCrossword', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags([...prefetchScripts]);

	/**
	 * We escape windowGuardian here to prevent errors when the data
	 * is placed in a script tag on the page
	 */
	const guardian = createWindowGuardian({
		editionId: frontendData.editionId,
		stage: frontendData.config.stage,
		frontendAssetsFullURL: frontendData.config.frontendAssetsFullURL,
		revisionNumber: frontendData.config.revisionNumber,
		sentryPublicApiKey: frontendData.config.sentryPublicApiKey,
		sentryHost: frontendData.config.sentryHost,
		keywordIds: frontendData.config.keywordIds,
		dfpAccountId: frontendData.config.dfpAccountId,
		adUnit: frontendData.config.adUnit,
		ajaxUrl: frontendData.config.ajaxUrl,
		googletagUrl: frontendData.config.googletagUrl,
		switches: frontendData.config.switches,
		abTests: frontendData.config.abTests,
		brazeApiKey: frontendData.config.brazeApiKey,
		isPaidContent: frontendData.pageType.isPaidContent,
		contentType: frontendData.contentType,
		shouldHideReaderRevenue: frontendData.shouldHideReaderRevenue,
		googleRecaptchaSiteKey: frontendData.config.googleRecaptchaSiteKey,
		// Until we understand exactly what config we need to make available client-side,
		// add everything we haven't explicitly typed as unknown config
		unknownConfig: frontendData.config,
	});

	const pageHtml = htmlCrosswordPageTemplate({
		scriptTags,
		html,
		guardian,
		config,
	});

	return { html: pageHtml, prefetchScripts };
};
