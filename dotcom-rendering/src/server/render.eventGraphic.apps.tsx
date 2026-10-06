import { Global } from '@emotion/react';
import { isString } from '@guardian/libs';
import { resets } from '@guardian/source/foundations';
import CleanCSS from 'clean-css';
import { ConfigProvider } from '../components/ConfigContext';
import { EventGraphic, type Graphic } from '../components/EventGraphic';
import type { FEAppsComponentConfig } from '../frontend/feAppsComponentEventGraphic';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { type EditionId } from '../lib/edition';
import { renderToStringWithEmotion } from '../lib/emotion';
import { escapeData } from '../lib/escapeData';
import { rawFontsCss } from '../lib/fonts-css';
import { rootStyles } from '../lib/rootStyles';
import type { Guardian } from '../model/guardian';
import { createGuardian } from '../model/guardian';
import type { Config } from '../types/configContext';

// Minimal html page for the event graphic component.
// The `padding-inline: 8px` Compensates for the native web view's 8pt
// negative horizontal padding, keeping content within the visible bounds.
const eventGraphicTemplate = ({
	html,
	css,
	config,
	scriptTags,
	guardian,
}: {
	html: string;
	css: string;
	config: Config;
	scriptTags: string[];
	guardian: Guardian;
}): string => {
	const minifiedFontsCss = new CleanCSS().minify(rawFontsCss).styles;
	const serialisedGuardian = escapeData(JSON.stringify(guardian));
	// TODO: do we need source resetCSS?
	// TODO: do we need overflow hidden & margin-top 0? Check in iOS
	return `<!doctype html>
		<html lang="en">
            <head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
				<meta name="robots" content="noindex">
                <style class="webfont">${minifiedFontsCss}</style>
				<style>${resets.resetCSS}</style>
				<style>body { padding-inline: 8px; }</style>
				${css}

				<script>
					window.guardian = ${serialisedGuardian};
					window.guardian.queue = [];
				</script>

				<script type="module">
                    window.guardian.mustardCut = true;
                </script>

                <script nomodule>
                    // Browser fails mustard check
                    window.guardian.mustardCut = false;
                </script>

				<script id="config" type="application/json">
					${escapeData(JSON.stringify(config))}
				</script>

				${scriptTags.join('\n')}

			</head>
			<body>
                ${html}
            </body>
        </html>`;
};

export const renderEventGraphic = (
	graphic: Graphic,
	editionId: EditionId,
	frontendConfig: FEAppsComponentConfig,
): { html: string; prefetchScripts: string[] } => {
	const config: Config = {
		renderingTarget: 'Apps',
		darkModeAvailable: true,
		assetOrigin: ASSET_ORIGIN,
		editionId,
	};

	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<Global styles={rootStyles(format, config.darkModeAvailable)} />
			<EventGraphic graphic={graphic} />
		</ConfigProvider>,
	);

	const clientScripts = [
		getPathFromManifest('client.apps', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags(clientScripts);

	const guardian = createGuardian({
		editionId,
		stage: frontendConfig.stage,
		frontendAssetsFullURL: frontendConfig.frontendAssetsFullURL,
		revisionNumber: frontendConfig.revisionNumber,
		sentryPublicApiKey: frontendConfig.sentryPublicApiKey,
		sentryHost: frontendConfig.sentryHost,
		dfpAccountId: frontendConfig.dfpAccountId,
		adUnit: frontendConfig.adUnit,
		ajaxUrl: frontendConfig.ajaxUrl,
		googletagUrl: frontendConfig.googletagUrl,
		switches: frontendConfig.switches,
		serverSideABTests: frontendConfig.serverSideABTests,
		isPaidContent: frontendConfig.isPaidContent,
		contentType: frontendConfig.contentType,
		googleRecaptchaSiteKey: frontendConfig.googleRecaptchaSiteKey,
		unknownConfig: frontendConfig,
	});

	const pageHtml = eventGraphicTemplate({
		html,
		css: extractedCss,
		config,
		scriptTags,
		guardian,
	});

	return {
		prefetchScripts: clientScripts,
		html: pageHtml,
	};
};
