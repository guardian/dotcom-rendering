import { ConfigProvider } from '../components/ConfigContext';
import { GamePage } from '../components/GamePage';
import type { ResolvedGamePage } from '../layouts/GameLayout';
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

type Props = { gamePage: ResolvedGamePage };

export const renderGamePage = ({
	gamePage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const NAV = extractNAV(gamePage.nav);
	const darkModeAvailable =
		gamePage.config.serverSideABTests['webx-dark-mode-web'] === 'enable';
	const config = {
		renderingTarget: 'Web',
		darkModeAvailable,
		assetOrigin: ASSET_ORIGIN,
		editionId: gamePage.editionId,
	} satisfies Config;

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<GamePage gamePage={gamePage} NAV={NAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild();
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ??
			gamePage.config.commercialBundleUrl,
	];
	const scriptTags = generateScriptTags(prefetchScripts);
	const guardian = createGuardian({
		editionId: gamePage.editionId,
		stage: gamePage.config.stage,
		frontendAssetsFullURL: gamePage.config.frontendAssetsFullURL,
		revisionNumber: gamePage.config.revisionNumber,
		sentryPublicApiKey: gamePage.config.sentryPublicApiKey,
		sentryHost: gamePage.config.sentryHost,
		keywordIds: gamePage.config.keywordIds,
		dfpAccountId: gamePage.config.dfpAccountId,
		adUnit: gamePage.config.adUnit,
		ajaxUrl: gamePage.config.ajaxUrl,
		shouldHideReaderRevenue: gamePage.config.shouldHideReaderRevenue,
		isPaidContent: gamePage.config.isPaidContent,
		googletagUrl: gamePage.config.googletagUrl,
		switches: gamePage.config.switches,
		serverSideABTests: gamePage.config.serverSideABTests,
		contentType: gamePage.config.contentType,
		brazeApiKey: gamePage.config.brazeApiKey,
		googleRecaptchaSiteKey: gamePage.config.googleRecaptchaSiteKey,
		googleRecaptchaSiteKeyVisible:
			gamePage.config.googleRecaptchaSiteKeyVisible,
		unknownConfig: gamePage.config,
	});

	return {
		html: htmlPageTemplate({
			scriptTags,
			css: extractedCss,
			html,
			title: gamePage.webTitle,
			description: '',
			guardian,
			section: gamePage.config.section,
			renderingTarget: 'Web',
			weAreHiring: !!gamePage.config.switches.weAreHiring,
			config,
			canonicalUrl: gamePage.canonicalUrl,
		}),
		prefetchScripts,
	};
};
