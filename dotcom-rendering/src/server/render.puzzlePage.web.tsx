import { ConfigProvider } from '../components/ConfigContext';
import { PuzzlePage } from '../components/PuzzlePage';
import type { ResolvedPuzzlePage } from '../layouts/PuzzlePageLayout';
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
import { htmlPageTemplate } from './htmlPageTemplate';

type Props = { puzzlePage: ResolvedPuzzlePage };

export const renderPuzzlePage = ({
	puzzlePage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const NAV = extractNAV(puzzlePage.nav);
	const darkModeAvailable =
		puzzlePage.config.serverSideABTests['webx-dark-mode-web'] === 'enable';
	const config = {
		renderingTarget: 'Web',
		darkModeAvailable,
		assetOrigin: ASSET_ORIGIN,
		editionId: puzzlePage.editionId,
	} satisfies Config;

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<PuzzlePage puzzlePage={puzzlePage} NAV={NAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild();
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
		keywordIds: puzzlePage.config.keywordIds,
		dfpAccountId: puzzlePage.config.dfpAccountId,
		adUnit: puzzlePage.config.adUnit,
		ajaxUrl: puzzlePage.config.ajaxUrl,
		shouldHideReaderRevenue: puzzlePage.config.shouldHideReaderRevenue,
		isPaidContent: puzzlePage.config.isPaidContent,
		googletagUrl: puzzlePage.config.googletagUrl,
		switches: puzzlePage.config.switches,
		serverSideABTests: puzzlePage.config.serverSideABTests,
		contentType: puzzlePage.config.contentType,
		brazeApiKey: puzzlePage.config.brazeApiKey,
		googleRecaptchaSiteKey: puzzlePage.config.googleRecaptchaSiteKey,
		googleRecaptchaSiteKeyVisible:
			puzzlePage.config.googleRecaptchaSiteKeyVisible,
		unknownConfig: puzzlePage.config,
	});

	return {
		html: htmlPageTemplate({
			scriptTags,
			css: extractedCss,
			html,
			title: puzzlePage.webTitle,
			description: '',
			guardian,
			section: puzzlePage.config.section,
			renderingTarget: 'Web',
			weAreHiring: !!puzzlePage.config.switches.weAreHiring,
			config,
			canonicalUrl: puzzlePage.canonicalUrl,
		}),
		prefetchScripts,
	};
};
