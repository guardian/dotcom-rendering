import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
import { HostedContentPage } from '../components/HostedContentPage';
import {
	ASSET_ORIGIN,
	getModulesBuild,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import type { Article } from '../types/article';
import type { Config } from '../types/configContext';
import { htmlPageTemplate } from './htmlPageTemplate';

type Props = {
	hostedContent: Article;
};

export const renderHtml = ({ hostedContent }: Props) => {
	const { frontendData } = hostedContent;

	const title = `Advertiser content hosted by the Guardian: ${frontendData.webTitle} | The Guardian`;

	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
		darkModeAvailable:
			frontendData.config.abTests.darkModeWebVariant === 'variant',
		assetOrigin: ASSET_ORIGIN,
		editionId: frontendData.editionId,
	};

	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<HostedContentPage
				hostedContent={hostedContent}
				renderingTarget={renderingTarget}
			/>
		</ConfigProvider>,
	);

	// We don't send A/B tests or switches from frontend yet- do we need to?
	const build = getModulesBuild({
		tests: {},
		switches: {},
	});

	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest(build, 'frameworks.js'),
		getPathFromManifest(build, 'index.js'),
	].filter(isString);

	// We currently don't send any of the data required for page config or window.guardian setup from frontend
	const pageHtml = htmlPageTemplate({
		scriptTags: [],
		css: extractedCss,
		html,
		title,
		description: frontendData.standfirst,
		// @ts-expect-error no config data
		guardian: {},
		canonicalUrl: '',
		renderingTarget: 'Web',
		// @ts-expect-error no config data
		config: {},
		weAreHiring: false,
	});

	return { html: pageHtml, prefetchScripts };
};
