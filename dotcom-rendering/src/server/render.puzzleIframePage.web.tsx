import { PuzzleIframePage } from '../components/PuzzleIframePage';
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
import type { FEPuzzleIframePageType } from '../types/puzzleIframePage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	puzzlePage: FEPuzzleIframePageType;
}

export const renderPuzzleIframePage = ({
	puzzlePage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = puzzlePage.webTitle;
	const NAV = extractNAV(puzzlePage.nav);

	const darkModeAvailable =
		puzzlePage.config.serverSideABTests?.['webx-dark-mode-web'] ===
		'enable';

	const config = {
		renderingTarget: 'Web',
		darkModeAvailable,
		assetOrigin: ASSET_ORIGIN,
		editionId: puzzlePage.editionId,
	} satisfies Config;

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<PuzzleIframePage puzzlePage={puzzlePage} NAV={NAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: puzzlePage.config.switches,
		tests: puzzlePage.config.abTests,
	});

	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ??
			puzzlePage.config.commercialBundleUrl,
	];

	const scriptTags = generateScriptTags(prefetchScripts);

	const guardian = createGuardian({
		editionId: puzzlePage.editionId,
		stage: puzzlePage.config.stage,
		frontendAssetsFullURL: puzzlePage.config.frontendAssetsFullURL,
		revisionNumber: puzzlePage.config.revisionNumber,
		sentryPublicApiKey: puzzlePage.config.sentryPublicApiKey,
		sentryHost: puzzlePage.config.sentryHost,
		dfpAccountId: puzzlePage.config.dfpAccountId,
		adUnit: puzzlePage.config.adUnit,
		ajaxUrl: puzzlePage.config.ajaxUrl,
		googletagUrl: puzzlePage.config.googletagUrl,
		switches: puzzlePage.config.switches,
		abTests: puzzlePage.config.abTests,
		serverSideABTests: puzzlePage.config.serverSideABTests,
		brazeApiKey: puzzlePage.config.brazeApiKey,
		contentType: puzzlePage.config.contentType,
		googleRecaptchaSiteKey: puzzlePage.config.googleRecaptchaSiteKey,
		googleRecaptchaSiteKeyVisible:
			puzzlePage.config.googleRecaptchaSiteKeyVisible,
		unknownConfig: puzzlePage.config,
	});

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: puzzlePage.description ?? '',
		guardian,
		section: puzzlePage.config.section,
		renderingTarget: 'Web',
		weAreHiring: !!puzzlePage.config.switches.weAreHiring,
		config,
		canonicalUrl: puzzlePage.canonicalUrl,
	});

	return {
		html: pageHtml,
		prefetchScripts,
	};
};
