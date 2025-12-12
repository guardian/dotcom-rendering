import { HostedArticleLayout } from '../layouts/HostedArticleLayout';
import { HostedGalleryLayout } from '../layouts/HostedGalleryLayout';
import { renderToStringWithEmotion } from '../lib/emotion';
import { HostedContent } from '../types/hostedContent';
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

	return { html: pageHtml, prefetchScripts: [] };
};
