import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { SportDataPageComponent } from '../components/SportDataPageComponent';
import {
	ASSET_ORIGIN_APPS,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { createGuardian } from '../model/guardian';
import type { FootballMatchInfoPage } from '../sportDataPage';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';
import { decideDescription, decideTitle } from './render.sportDataPage.web';

export const renderAppsSportPage = (sportData: FootballMatchInfoPage) => {
	const renderingTarget = 'Apps';

	const config: Config = {
		renderingTarget,
		darkModeAvailable: true,
		assetOrigin: ASSET_ORIGIN_APPS,
		editionId: sportData.editionId,
	};

	const title = decideTitle(sportData);
	const description = decideDescription(sportData.kind);

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<SportDataPageComponent
				sportData={sportData}
				renderingTarget={renderingTarget}
			/>
		</ConfigProvider>,
	);

	const clientScripts = [
		getPathFromManifest('client.apps', 'index.js', ASSET_ORIGIN_APPS),
	].filter(isString);
	const scriptTags = generateScriptTags([...clientScripts]);

	const guardian = createGuardian({
		editionId: sportData.editionId,
		stage: sportData.config.stage,
		frontendAssetsFullURL: sportData.config.frontendAssetsFullURL,
		revisionNumber: sportData.config.revisionNumber,
		sentryPublicApiKey: sportData.config.sentryPublicApiKey,
		sentryHost: sportData.config.sentryHost,
		dfpAccountId: sportData.config.dfpAccountId,
		adUnit: sportData.config.adUnit,
		ajaxUrl: sportData.config.ajaxUrl,
		googletagUrl: sportData.config.googletagUrl,
		switches: sportData.config.switches,
		abTests: sportData.config.abTests,
		serverSideABTests: sportData.config.serverSideABTests,
		isPaidContent: sportData.config.isPaidContent,
		contentType: sportData.config.contentType,
		googleRecaptchaSiteKey: sportData.config.googleRecaptchaSiteKey,
		unknownConfig: sportData.config,
	});

	const renderedPage = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description,
		canonicalUrl: sportData.canonicalUrl,
		guardian,
		renderingTarget,
		weAreHiring: !!sportData.config.switches.weAreHiring,
		config,
	});

	return { html: renderedPage, prefetchScripts: clientScripts };
};
