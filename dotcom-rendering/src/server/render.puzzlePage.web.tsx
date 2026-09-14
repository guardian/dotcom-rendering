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
import type { PuzzleConfig } from '../model/puzzles/puzzleConfigs';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';

type Props = { puzzlePage: ResolvedPuzzlePage };

/**
 * Builds the SEO metadata for a Puzzle Page from its resolved
 * `PuzzleConfig` and `webTitle`: the `<meta name="description">` value,
 * plus `openGraphData`/`twitterData` for `htmlPageTemplate`'s
 * `generateMetaTags()`. Pulled out as a small, pure function (rather than
 * inlined in `renderPuzzlePage`) specifically so it's directly unit
 * testable without needing to invoke the full render pipeline (which
 * requires a webpack build manifest not present in the test environment -
 * there is no existing render.*.web.tsx unit test convention in this repo
 * to extend).
 *
 * `og:image`/`twitter:image` are only included when `puzzleConfig.image`
 * is set - DCR has no site-wide default/fallback share image for pages
 * without one (confirmed by investigation - see docs/puzzle-page.md), so
 * when `image` is unset these keys are omitted entirely rather than sent
 * empty or with a placeholder, matching `generateMetaTags()`'s behaviour
 * of only emitting a `<meta>` tag for keys actually present in the object.
 */
export const buildPuzzlePageMetaData = (
	webTitle: string,
	puzzleConfig: PuzzleConfig,
): {
	description: string;
	openGraphData: Record<string, string>;
	twitterData: Record<string, string>;
} => {
	const { description, image } = puzzleConfig;

	return {
		description,
		openGraphData: {
			'og:title': webTitle,
			'og:description': description,
			...(image ? { 'og:image': image } : {}),
		},
		twitterData: {
			'twitter:title': webTitle,
			'twitter:description': description,
			...(image ? { 'twitter:image': image } : {}),
		},
	};
};

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

	const { description, openGraphData, twitterData } = buildPuzzlePageMetaData(
		puzzlePage.webTitle,
		puzzlePage.puzzleConfig,
	);

	return {
		html: htmlPageTemplate({
			scriptTags,
			css: extractedCss,
			html,
			title: puzzlePage.webTitle,
			description,
			openGraphData,
			twitterData,
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
