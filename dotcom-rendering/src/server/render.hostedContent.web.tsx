import { isString } from '@guardian/libs';
import { HostedArticleLayout } from '../layouts/HostedArticleLayout';
import { HostedGalleryLayout } from '../layouts/HostedGalleryLayout';
import { getModulesBuild, getPathFromManifest } from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import { polyfillIO } from '../lib/polyfill.io';
import type { HostedContent } from '../types/hostedContent';
import { htmlPageTemplate } from './htmlPageTemplate';

type Props = {
	hostedContent: HostedContent;
};

export const renderHtml = ({ hostedContent }: Props) => {
	const { type, frontendData } = hostedContent;

	const title = `Advertiser content hosted by the Guardian: ${frontendData.title} | The Guardian`;

	const HostedLayout =
		type === 'gallery' ? HostedGalleryLayout : HostedArticleLayout;
	const renderingTarget = 'Web';

	const { html, extractedCss } = renderToStringWithEmotion(
		<HostedLayout renderingTarget={renderingTarget} />,
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
