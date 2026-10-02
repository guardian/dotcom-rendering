import { Global } from '@emotion/react';
import { isString } from '@guardian/libs';
import { resets } from '@guardian/source/foundations';
import CleanCSS from 'clean-css';
import { ConfigProvider } from '../components/ConfigContext';
import { GraphicSchema, type Graphic } from '../components/DecideContainer';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { getEditionFromPageId, type EditionId } from '../lib/edition';
import { renderToStringWithEmotion } from '../lib/emotion';
import { escapeData } from '../lib/escapeData';
import { rawFontsCss } from '../lib/fonts-css';
import { rootStyles } from '../lib/rootStyles';
import type { Config } from '../types/configContext';
import { EventGraphic } from '../components/EventGraphic';
import { FEAppComponentEventGraphic } from '../frontend/feAppComponentEventGraphic';
import * as v from 'valibot';

type EventGraphicName = 'electionTracker';
export const isEventGraphic = (name?: string): name is EventGraphicName =>
	name === 'election-tracker/us-general-2024/congress';

interface LightGuardian {
	config: {
		frontendAssetsFullURL: string;
		isDev: boolean;
		switches: {
			enableSentryReporting: boolean;
		};
	};
	modules: {
		sentry: Record<string, never>;
	};
}

// Minimal html page for the event graphic component.
// The `overflow: hidden` on the body fixes an issue on the iOS app where it scrolls within the webview.
// The `margin-top: 0` on the body fixes an issue on iOS where the border is clipped.
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
	guardian: LightGuardian;
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
                <style>body { overflow: hidden; margin-top: 0; }</style>
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

const extractGraphic = (
	data: FEAppComponentEventGraphic,
): Graphic | undefined => {
	const result = v.safeParse(GraphicSchema, {
		electionDataUrl: data.dataUrl,
		kind: data.graphicKind,
		electionComponents: data.eventData,
		liveEffects: true,
	});

	return result.success ? result.output : undefined;
};

export const renderEventGraphic = (
	data: FEAppComponentEventGraphic,
	editionId: EditionId,
): { html: string; prefetchScripts: string[] } => {
	const config: Config = {
		renderingTarget: 'Apps',
		darkModeAvailable: true,
		assetOrigin: ASSET_ORIGIN,
		editionId: editionId,
	};

	console.log('marjan');

	/* We use this as our "base" or default format */
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<Global styles={rootStyles(format, config.darkModeAvailable)} />
			<EventGraphic graphic={extractGraphic(data)} />
		</ConfigProvider>,
	);

	const clientScripts = [
		getPathFromManifest('client.apps', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags(clientScripts);

	const guardian: LightGuardian = {
		config: {
			frontendAssetsFullURL: ASSET_ORIGIN,
			isDev: process.env.NODE_ENV !== 'production',
			switches: {
				enableSentryReporting: false,
			},
		},
		modules: {
			sentry: {},
		},
	};

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

type EventGraphicProps = {
	graphic: Graphic | undefined;
};

const testData: EventGraphicProps = {
	graphic: {
		kind: 'electionTracker',
		electionDataUrl: new URL(
			'https://zug.code.dev-guardianapis.com/views/elections/us-general-2024/congress-fronts-tracker/all/v1',
		),
		electionComponents: { components: [] },
		liveEffects: true,
	},
};
