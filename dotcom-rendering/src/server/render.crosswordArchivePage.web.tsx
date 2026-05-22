import { CrosswordArchivePage } from '../components/CrosswordArchivePage';
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
import type { FECrosswordArchivePageType } from '../types/crosswordArchivePage';
import { htmlPageTemplate } from './htmlPageTemplate';

interface Props {
	archivePage: FECrosswordArchivePageType;
}

export const renderCrosswordArchivePage = ({
	archivePage,
}: Props): { html: string; prefetchScripts: string[] } => {
	const title = archivePage.webTitle;
	const NAV = extractNAV(archivePage.nav);

	const darkModeAvailable =
		archivePage.config.serverSideABTests?.['webx-dark-mode-web'] ===
		'enable';

	const config = {
		renderingTarget: 'Web',
		darkModeAvailable,
		assetOrigin: ASSET_ORIGIN,
		editionId: archivePage.editionId,
	} satisfies Config;

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<CrosswordArchivePage archivePage={archivePage} NAV={NAV} />
		</ConfigProvider>,
	);

	const build = getModulesBuild({
		switches: archivePage.config.switches,
		tests: archivePage.config.abTests,
	});

	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
		process.env.COMMERCIAL_BUNDLE_URL ??
			archivePage.config.commercialBundleUrl,
	];

	const scriptTags = generateScriptTags(prefetchScripts);

	const guardian = createGuardian({
		editionId: archivePage.editionId,
		stage: archivePage.config.stage,
		frontendAssetsFullURL: archivePage.config.frontendAssetsFullURL,
		revisionNumber: archivePage.config.revisionNumber,
		sentryPublicApiKey: archivePage.config.sentryPublicApiKey,
		sentryHost: archivePage.config.sentryHost,
		dfpAccountId: archivePage.config.dfpAccountId,
		adUnit: archivePage.config.adUnit,
		ajaxUrl: archivePage.config.ajaxUrl,
		googletagUrl: archivePage.config.googletagUrl,
		switches: archivePage.config.switches,
		abTests: archivePage.config.abTests,
		serverSideABTests: archivePage.config.serverSideABTests,
		brazeApiKey: archivePage.config.brazeApiKey,
		contentType: archivePage.config.contentType,
		googleRecaptchaSiteKey: archivePage.config.googleRecaptchaSiteKey,
		googleRecaptchaSiteKeyVisible:
			archivePage.config.googleRecaptchaSiteKeyVisible,
		unknownConfig: archivePage.config,
	});

	const pageHtml = htmlPageTemplate({
		scriptTags,
		css: extractedCss,
		html,
		title,
		description: archivePage.description ?? '',
		guardian,
		section: archivePage.config.section,
		renderingTarget: 'Web',
		weAreHiring: !!archivePage.config.switches.weAreHiring,
		config,
		canonicalUrl: archivePage.canonicalUrl,
	});

	return {
		html: pageHtml,
		prefetchScripts,
	};
};
