import { ConfigProvider } from '../components/ConfigContext';
import { PuzzlesPage } from '../components/PuzzlesPage';
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

type Props = { puzzlesPage: FEPuzzlesPageType };

export const renderPuzzlesPage = ({
	puzzlesPage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const NAV = extractNAV(puzzlesPage.nav);
	const darkModeAvailable =
		puzzlesPage.config.serverSideABTests['webx-dark-mode-web'] === 'enable';
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

	const build = getModulesBuild();
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
		keywordIds: puzzlesPage.config.keywordIds,
		dfpAccountId: puzzlesPage.config.dfpAccountId,
		adUnit: puzzlesPage.config.adUnit,
		ajaxUrl: puzzlesPage.config.ajaxUrl,
		shouldHideReaderRevenue: puzzlesPage.config.shouldHideReaderRevenue,
		isPaidContent: puzzlesPage.config.isPaidContent,
		googletagUrl: puzzlesPage.config.googletagUrl,
		switches: puzzlesPage.config.switches,
		serverSideABTests: puzzlesPage.config.serverSideABTests,
		contentType: puzzlesPage.config.contentType,
		brazeApiKey: puzzlesPage.config.brazeApiKey,
		googleRecaptchaSiteKey: puzzlesPage.config.googleRecaptchaSiteKey,
		googleRecaptchaSiteKeyVisible:
			puzzlesPage.config.googleRecaptchaSiteKeyVisible,
		unknownConfig: puzzlesPage.config,
	});

	return {
		html: htmlPageTemplate({
			scriptTags,
			css: extractedCss,
			html,
			title: puzzlesPage.webTitle,
			description: puzzlesPage.description ?? '',
			guardian,
			section: puzzlesPage.config.section,
			renderingTarget: 'Web',
			weAreHiring: !!puzzlesPage.config.switches.weAreHiring,
			config,
			canonicalUrl: puzzlesPage.canonicalUrl,
		}),
		prefetchScripts,
	};
};
