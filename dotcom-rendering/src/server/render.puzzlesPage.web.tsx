import { PuzzlesPage } from '../components/PuzzlesPage';
import { ConfigProvider } from '../components/ConfigContext';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import { extractNAV } from '../model/extract-nav';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';
import type { FEPuzzlesPageType } from '../types/puzzlesPage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	puzzlesPage: FEPuzzlesPageType;
}

export const renderPuzzlesPage = ({
	puzzlesPage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = puzzlesPage.webTitle;
	const NAV = extractNAV(puzzlesPage.nav);

	const darkModeAvailable =
		puzzlesPage.config.serverSideABTests?.['webx-dark-mode-web'] ===
		'enable';

	const config = {
		renderingTarget: 'Web',
		darkModeAvailable,
		assetOrigin: ASSET_ORIGIN,
		editionId: puzzlesPage.editionId,
	} satisfies Config;

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<PuzzlesPage puzzlesPage={puzzlesPage} NAV={NAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: puzzlesPage.config.switches,
		tests: puzzlesPage.config.abTests,
	});

	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ??
			puzzlesPage.config.commercialBundleUrl,
	];

	const scriptTags = generateScriptTags(prefetchScripts);

	const guardian = createGuardian({
		editionId: puzzlesPage.editionId,
		stage: puzzlesPage.config.stage,
		frontendAssetsFullURL: puzzlesPage.config.frontendAssetsFullURL,
		revisionNumber: puzzlesPage.config.revisionNumber,
		sentryPublicApiKey: puzzlesPage.config.sentryPublicApiKey,
		sentryHost: puzzlesPage.config.sentryHost,
		dfpAccountId: puzzlesPage.config.dfpAccountId,
		adUnit: puzzlesPage.config.adUnit,
		ajaxUrl: puzzlesPage.config.ajaxUrl,
		googletagUrl: puzzlesPage.config.googletagUrl,
		switches: puzzlesPage.config.switches,
		abTests: puzzlesPage.config.abTests,
		serverSideABTests: puzzlesPage.config.serverSideABTests,
		brazeApiKey: puzzlesPage.config.brazeApiKey,
		contentType: puzzlesPage.config.contentType,
		googleRecaptchaSiteKey: puzzlesPage.config.googleRecaptchaSiteKey,
		googleRecaptchaSiteKeyVisible:
			puzzlesPage.config.googleRecaptchaSiteKeyVisible,
		unknownConfig: puzzlesPage.config,
	});

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: puzzlesPage.description ?? '',
		guardian,
		section: puzzlesPage.config.section,
		renderingTarget: 'Web',
		weAreHiring: !!puzzlesPage.config.switches.weAreHiring,
		config,
		canonicalUrl: puzzlesPage.canonicalUrl,
	});

	return {
		html: pageHtml,
		prefetchScripts,
	};
};
